<?php

namespace App\Controller\Event;

use App\Entity\Event;
use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class AddParticipantController extends AbstractController
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
        if($event->getParticipants()->contains($user))
            throw new \Error('The user is already participating in the event.');
        if($event->getDateEnd() < new \DateTime())
            throw new \Error('The event has already ended.');
        if($event->isCloseJoin())
            throw new \Error('The event is closed for participation.');
        if($event->getAssociation())
            if(!$event->getAssociation()->getMembers()->contains($user))
                throw new \Error('The user cannot join the event because he is not a member of the association.');

        $event->addParticipant($user);

        return $event;
    }
}