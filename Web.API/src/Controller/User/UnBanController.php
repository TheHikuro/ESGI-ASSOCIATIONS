<?php

namespace App\Controller\User;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class UnBanController extends AbstractController
{
    private $mailer;

    public function __construct(\Swift_Mailer $mailer)
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
            $message = (new \Swift_Message())
                ->setSubject('débannissement de ESGI gaming')
                ->setBody( '<p>Vous n\'êtes plus banni de ESGI gaming</p>', 'text/html')
                ->setFrom($this->getParameter('swiftmailer.sender_address'))
                ->setTo($user->getEmail());
    
            $this->mailer->send($message);
        }

        return $user;
    }
}