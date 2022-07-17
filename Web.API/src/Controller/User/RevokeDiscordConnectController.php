<?php

namespace App\Controller\User;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class RevokeDiscordConnectController extends AbstractController
{
    public function __invoke(Request $request)
    {
        $user = $request->attributes->get('data');

        if(!($user instanceof User))
            throw new \RuntimeException('Expected user.');

        $user->setDiscordUserId(null);

        return $user;
    }
}
