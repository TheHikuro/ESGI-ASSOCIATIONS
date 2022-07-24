<?php

namespace App\Controller\User;

use App\Entity\User;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Mailer\MailerInterface;

#[AsController]
class BanController extends AbstractController
{
    private $mailer;

    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }

    public function __invoke(Request $request)
    {
        $user = $request->attributes->get('data');
        $payload = json_decode($request->getContent(), false);

        if(!($user instanceof User))
            throw new \RuntimeException('Expected user.');
        if($user->getIsBanned())
            throw new \RuntimeException('User is already banned.');

        $user->setIsBanned(true);

        if(isset($payload->reason))
            $user->setBanReason($payload->reason);

        if(isset($payload->notify) && $payload->notify){
            $email = (new TemplatedEmail())
                ->subject('bannissement de ESGI gaming')
                ->htmlTemplate('users/ban.html.twig')
                ->context([
                    'reason' => $user->getBanReason()
                ])
                ->from($this->getParameter('sender_address'))
                ->to($user->getEmail());

            $this->mailer->send($email);
        }

        return $user;
    }
}