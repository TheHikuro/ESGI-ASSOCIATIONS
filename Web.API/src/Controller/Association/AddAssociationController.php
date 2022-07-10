<?php

namespace App\Controller\Association;

use App\Entity\Association;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class AddAssociationController extends AbstractController
{
    public function __invoke(Request $request)
    {
        $association = $request->attributes->get('data');

        if(!($association instanceof Association))
            throw new \RuntimeException('Expected association.');

        $association->addMember($association->getOwner());

        return $association;
    }
}