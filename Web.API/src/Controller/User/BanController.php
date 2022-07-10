<?php

namespace App\Controller\User;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class BanController extends AbstractController
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
            throw new \RuntimeException('Expected association.');
        if($user->getIsBanned())
            throw new \RuntimeException('User is already banned.');

        $user->setIsBanned(true);

        if(isset($payload->reason))
            $user->setBanReason($payload->reason);

        if(isset($payload->notify) && $payload->notify){
            $message = (new \Swift_Message())
                ->setSubject('bannissement de ESGI gaming')
                ->setBody( $this->render('users/ban.html.twig', [
                    'reason' => $user->getBanReason(),
                ]), 'text/html')
                ->setFrom($this->getParameter('swiftmailer.sender_address'))
                ->setTo($user->getEmail());
        
            $this->mailer->send($message);
        }

        return $user;
    }
}