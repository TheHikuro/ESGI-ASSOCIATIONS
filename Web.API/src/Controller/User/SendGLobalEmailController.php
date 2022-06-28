<?php

namespace App\Controller\User;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Error;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Validator\Constraints\Type;

#[AsController]
class SendGLobalEmailController extends AbstractController
{
    private $ur;
    private $mailer;

    public function __construct(UserRepository $ur, \Swift_Mailer $mailer)
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

        $usersTo = array_map(function($u){return $u->getEmail();},$this->ur->findAll());

        $message = (new \Swift_Message())
            ->setSubject($payload->subject)
            ->setBody($payload->body, 'text/html')
            ->setFrom($userFrom->getEmail())
            ->setTo($usersTo);
        
        $this->mailer->send($message);
    }
}