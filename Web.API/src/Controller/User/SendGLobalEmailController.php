<?php

namespace App\Controller\User;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityManagerInterface;
use Error;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Validator\Constraints\Type;

#[AsController]
class SendGLobalEmailController extends AbstractController
{
    private $ur;
    private $mailer;

    public function __construct(UserRepository $ur, MailerInterface $mailer)
    {
        $this->ur = $ur;
        $this->mailer = $mailer;
    }

    public function __invoke(Request $request)
    {
        /**
         * @var User
         */
        $userFrom = $this->getUser();

        $payload = json_decode($request->getContent(), false);

        if(!isset($payload->subject))
            throw new Error('Subject missing');
        if(!isset($payload->body))
            throw new Error('Body missing');

        $usersTo = array_map(function($u){return $u->getEmail();}, $this->ur->matching(Criteria::create()->where(Criteria::expr()->neq('email', $userFrom->getEmail())))->getValues());

        $email = (new TemplatedEmail())
            ->subject($payload->subject)
            ->html($payload->body)
            ->from($userFrom->getEmail())
            ->to(...$usersTo);

        $this->mailer->send($email);
    }
}