<?php

namespace App\Controller\User;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class PostAvatarController extends AbstractController
{
    private const VALID_MIME_TYPES = ["image/jpeg", "image/png"];

    public function __invoke(Request $request)
    {
        $user = $request->attributes->get('data');
        $avatar = $request->files->get('avatar');

        if(!($user instanceof User))
            throw new \RuntimeException('Expected user.');
        if(!$avatar)
            throw new \ErrorException('Avatar file is missing');
        if(!in_array($avatar->getMimeType(), self::VALID_MIME_TYPES))
            throw new \ErrorException('Avatar mimeType must be ' . implode(', ', self::VALID_MIME_TYPES));

        $user->setAvatar($avatar);
        $user->setUpdatedAt(new \DateTimeImmutable('now'));

        return $user;
    }
}