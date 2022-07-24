<?php

namespace App\Controller\User;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Mailer\MailerInterface;

#[AsController]
class ConfirmationEmailController extends AbstractController
{
    private $em;
    private $mailer;

    public function __construct(EntityManagerInterface $em, MailerInterface $mailer)
    {
        $this->em = $em;
        $this->mailer = $mailer;
    }

    public function __invoke($id)
    {
        /**
         * @var User
         */
        $user = $this->getUser();

        if($user->getId() !== (int)$id)
            throw new \Exception('You are not allowed to send a confirmation email.');
        if($user->isActivated())
            throw new \Exception('Your account is already activated.');

        $user->setConfirmationCode(substr(str_shuffle(str_repeat('0123456789', 6)), 0, 6));
        $this->em->flush();

        $email = (new TemplatedEmail())
            ->subject('Email de confirmation ESGI gaming')
            ->html("<p>votre code de confirmation est <strong>{$user->getConfirmationCode()}</strong></p>")
            ->from($this->getParameter('sender_address'))
            ->to($user->getEmail());
        
        $this->mailer->send($email);
    }
}