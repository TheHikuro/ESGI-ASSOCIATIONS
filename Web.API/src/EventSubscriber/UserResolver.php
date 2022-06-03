<?php

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

final class UserResolver implements EventSubscriberInterface
{
    private $tokenStorage;

    public function __construct(TokenStorageInterface $tokenStorage)
    {
        $this->tokenStorage = $tokenStorage;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::REQUEST => ['userResolve', EventPriorities::PRE_READ],
        ];
    }

    public function userResolve(RequestEvent $event): void
    {
        $request = $event->getRequest();

        if(!preg_match('/^api_users/', $request->get('_route')))
            return;
        if('me' !== $request->attributes->get('id'))
            return;

        $user = $this->tokenStorage->getToken()->getUser();

        if (!$user instanceof User)
            return;

        $request->attributes->set('id', $user->getId());
    }
}