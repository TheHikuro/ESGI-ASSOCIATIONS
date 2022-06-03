<?php

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Section;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

final class SectionSlugUpdater implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['editSlug', EventPriorities::PRE_WRITE],
        ];
    }

    public function editSlug(ViewEvent $event): void
    {
        $section = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if(!$section instanceof Section || Request::METHOD_PUT !== $method)
            return;

        $payload = json_decode($event->getRequest()->getContent(), false);

        if(!isset($payload->name))
            return;

        $section->setSlug(strtolower(str_replace(' ', '-', $payload->name)));
    }
}