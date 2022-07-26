<?php

namespace App\Controller\User;

use App\Entity\User;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Mailer\MailerInterface;

#[AsController]
class UnBanController extends AbstractController
{
    private $mailer;

    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }

    public function __invoke(Request $request)
    {
        $user = $request->attributes->get('data');
        $payload = json_decode($request->getContent(), false);

        if(!($user instanceof User))
            throw new \RuntimeException('Expected user.');
        if(!$user->getIsBanned())
            throw new \RuntimeException('User is not banned.');

        $user->setIsBanned(false);
        $user->setBanReason(null);

        if(isset($payload->notify) && $payload->notify){
            $email = (new TemplatedEmail())
                ->subject('débannissement de ESGI gaming')
                ->html('<p>Vous n\'êtes plus banni de ESGI gaming</p>')
                ->from($this->getParameter('sender_address'))
                ->to($user->getEmail());

            $this->mailer->send($email);
        }

        return $user;
    }
}