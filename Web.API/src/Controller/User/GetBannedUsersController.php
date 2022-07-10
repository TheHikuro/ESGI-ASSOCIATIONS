<?php

namespace App\Controller\User;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Error;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Validator\Constraints\Type;

#[AsController]
class GetBannedUsersController extends AbstractController
{
    private $ur;

    public function __construct(UserRepository $ur)
    {
        $this->ur = $ur;
    }

    public function __invoke(Request $request)
    {
        $bannedUsers = $this->ur->findBy(['isBanned' => true]);

        return $bannedUsers;
    }
}