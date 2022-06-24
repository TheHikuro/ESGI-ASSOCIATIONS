<?php

namespace App\Controller\Association;

use App\Entity\Association;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Vich\UploaderBundle\Handler\UploadHandler;

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
         * @var Association
         */
        $association = $request->attributes->get('data');

        if(!($association instanceof Association))
            throw new \RuntimeException('Expected user.');

        $this->uploadHandler->remove($association, 'avatar');
        $association->setUpdatedAt(new \DateTimeImmutable('now'));

        return $association;
    }
}