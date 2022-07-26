<?php

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Event;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

final class EventResolver implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['updateOnChange', EventPriorities::POST_VALIDATE],
        ];
    }

    public function updateOnChange(ViewEvent $event): void
    {
        $curEvent = $event->getControllerResult();
        $request = $event->getRequest();
        $method = $request->getMethod();

        if(!($curEvent instanceof Event))
            return;
        if(!($method == Request::METHOD_POST || $method == Request::METHOD_PUT || $method == Request::METHOD_PATCH))
            return;
        
        $curEvent->setUpdatedAt(new \DateTimeImmutable('now'));
    }
}