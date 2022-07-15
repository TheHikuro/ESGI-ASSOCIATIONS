<?php

namespace App\Controller\Event;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class ArchiveEventsController extends AbstractController
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function __invoke(Request $request)
    {
        $events = $request->attributes->get('data')->getIterator();
        $payload = json_decode($request->getContent(), false);

        if(!isset($payload->archive))
            throw new \ErrorException('missing archive parameter');
        if(!is_bool($payload->archive))
            throw new \ErrorException('archive parameter must be a boolean');
        if(count($events) == 0)
            return new Response(null, Response::HTTP_NOT_MODIFIED);
        
        foreach($events as $event)
            $event->setArchived($payload->archive);

        $this->em->flush();

        return $events;
    }
}
