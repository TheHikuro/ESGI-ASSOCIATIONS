<?php

namespace App\EventListener;


use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\Security\Core\User\UserInterface;

class AuthenticationSuccessListener
{
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        /**
         * @var User
         */
        $user = $event->getUser();
    
        if (!$user instanceof UserInterface)
            return;

        $event->setData([
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'roles' => $user->getRoles(),
            'associationsCount' => $user->getAssociations()->count(),
            'activated' => $user->isActivated(),
            'token' => $event->getData()['token'],
        ]);
    }
}