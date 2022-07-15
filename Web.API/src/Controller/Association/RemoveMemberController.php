<?php

namespace App\Controller\Association;

use App\Entity\Association;
use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class RemoveMemberController extends AbstractController
{
    private $ur;

    public function __construct(UserRepository $ur)
    {
        $this->ur = $ur;
    }

    public function __invoke($idMember, Request $request)
    {
        $association = $request->attributes->get('data');
        $user = $this->ur->findOneBy(['id' => $idMember]);

        if(!($association instanceof Association))
            throw new \RuntimeException('Expected association.');
        if(!($user instanceof User))
            throw new \RuntimeException('Expected user.');
        if(!$association->getMembers()->contains($user))
            throw new \Error('Member not in association.');
        if($association->getOwner() == $user)
            throw new \Error('Owner cannot leave association.');

        $association->removeMember($user);
        $user->removeAssociation($association);

        return $association;
    }
}