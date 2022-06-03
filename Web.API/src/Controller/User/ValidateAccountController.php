<?php

namespace App\Controller\User;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class ValidateAccountController extends AbstractController
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function __invoke($id, Request $request)
    {
        $user = $this->getUser();
        $payload = json_decode($request->getContent(), false);

        if((int)$id !== $user->getId() || $user->getConfirmationCode() === null)
            throw new \Exception('Your are not allowed to activate your account.');
        if($user->isActivated())
            throw new \Exception('Your account is already activated.');
        if(!isset($payload->confirmationCode))
            throw new \Exception('No confirsssssmation code specified.');
        if($payload->confirmationCode !== $user->getConfirmationCode())
            throw new \Exception('Invalid confirmation code.');

        $user->activate();
        $this->em->flush();
    }
}