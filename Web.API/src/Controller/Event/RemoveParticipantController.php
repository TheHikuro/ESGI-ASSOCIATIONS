<?php

namespace App\Controller\Event;

use App\Entity\Event;
use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class RemoveParticipantController extends AbstractController
{
    private $ur;

    public function __construct(UserRepository $ur)
    {
        $this->ur = $ur;
    }

    public function __invoke($idParticipant, Request $request)
    {
        $event = $request->attributes->get('data');
        $user = $this->ur->findOneBy(['id' => $idParticipant]);

        if(!($event instanceof Event))
            throw new \RuntimeException('Expected event.');
        if(!($user instanceof User))
            throw new \RuntimeException('Expected user.');
        if(!$event->getParticipants()->contains($user))
            throw new \Error('The user not participating in the event.');
        if($event->getDateEnd() < new \DateTime())
            throw new \Error('The event has already ended.');

        $event->removeParticipant($user);

        return $event;
    }
}