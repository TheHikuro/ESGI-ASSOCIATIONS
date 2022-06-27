<?php

namespace App\Controller\Association;

use App\Entity\Association;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class PostAvatarController extends AbstractController
{
    private const VALID_MIME_TYPES = ["image/jpeg", "image/png"];

    public function __invoke(Request $request)
    {
        $association = $request->attributes->get('data');
        $avatar = $request->files->get('avatar');

        if(!($association instanceof Association))
            throw new \RuntimeException('Expected association.');
        if(!$avatar)
            throw new \ErrorException('Avatar file is missing');
        if(!in_array($avatar->getMimeType(), self::VALID_MIME_TYPES))
            throw new \ErrorException('Avatar mimeType must be ' . implode(', ', self::VALID_MIME_TYPES));

        $association->setAvatar($avatar);
        $association->setUpdatedAt(new \DateTimeImmutable('now'));

        return $association;
    }
}