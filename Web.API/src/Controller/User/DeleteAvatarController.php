<?php

namespace App\Controller\User;

use App\Entity\User;
use App\Serializer\UserPostAvatarNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Vich\UploaderBundle\Handler\UploadHandler;
use Vich\UploaderBundle\Storage\StorageInterface;

#[AsController]
class DeleteAvatarController extends AbstractController
{
    private $uploadHandler;

    public function __construct(UploadHandler $uploadHandler)
    {
        $this->uploadHandler = $uploadHandler;
    }

    public function __invoke(Request $request)
    {
        /**
         * @var User
         */
        $user = $request->attributes->get('data');

        if(!($user instanceof User))
            throw new \RuntimeException('Expected user.');

        $this->uploadHandler->remove($user, 'avatar');
        $user->setUpdatedAt(new \DateTimeImmutable('now'));

        return $user;
    }
}