<?php

namespace App\Controller\User;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class ConfirmationEmailController extends AbstractController
{
    private $em;
    private $mailer;

    public function __construct(EntityManagerInterface $em, \Swift_Mailer $mailer)
    {
        $this->em = $em;
        $this->mailer = $mailer;
    }

    public function __invoke($id)
    {
        $user = $this->getUser();

        if($user->getId() !== (int)$id)
            throw new \Exception('You are not allowed to send a confirmation email.');
        if($user->isActivated())
            throw new \Exception('Your account is already activated.');

        $user->setConfirmationCode(substr(str_shuffle(str_repeat('0123456789', 6)), 0, 6));
        $this->em->flush();

        $message = (new \Swift_Message())
            ->setSubject('Email de confirmation ESGI gaming')
            ->setBody("<p>votre code de confirmation est <strong>{$user->getConfirmationCode()}</strong></p>", 'text/html')
            ->setFrom($this->getParameter('swiftmailer.sender_address'))
            ->setTo($user->getEmail());
        
        $this->mailer->send($message);
    }
}