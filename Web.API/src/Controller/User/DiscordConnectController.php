<?php

namespace App\Controller\User;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class DiscordConnectController extends AbstractController
{
    private $ur;
    private $client;

    public function __construct(UserRepository $ur)
    {
        $this->ur = $ur;
        $this->client = new \GuzzleHttp\Client();
    }

    public function __invoke(Request $request)
    {
        $user = $request->attributes->get('data');
        $payload = json_decode($request->getContent(), false);

        if(!($user instanceof User))
            throw new \RuntimeException('Expected user.');
        if (!isset($payload->code))
            throw new \Exception('Missing code');
        if (!isset($payload->redirectURI))
            throw new \Exception('Missing redirectURI');

        // Exchange code for user access token
        try {
            $exchangeCodeResponse = $this->client->request('POST', "{$this->getParameter('discord_api_endpoint')}/oauth2/token", [
                'form_params' => [
                    'client_id' => $this->getParameter('discord_client_id'),
                    'client_secret' => $this->getParameter('discord_client_secret'),
                    'redirect_uri' => $payload->redirectURI,
                    'grant_type' => 'authorization_code',
                    'code' => $payload->code,
                ],
                "headers" => [
                    "Content-Type" => "application/x-www-form-urlencoded"
                ]
            ]);
        } catch (\Exception $e) {
            throw new \Exception('Invalid code or redirectURI provided');
        }

        $exchangeCodePayload = json_decode($exchangeCodeResponse->getBody()->getContents(), false);

        if(!isset($exchangeCodePayload->access_token))
            throw new \Exception('An error occurred while exchanging code for access token');

        // Get user info with access token
        try {
            $userResponse = $this->client->request('GET', "{$this->getParameter('discord_api_endpoint')}/users/@me", [
                "headers" => [
                    "Authorization" => "{$exchangeCodePayload->token_type} {$exchangeCodePayload->access_token}"
                ]
            ]);
        } catch (\Exception $e) {
            throw new \Exception('An error occurred while fetching user data');
        }

        $userResponsePayload = json_decode($userResponse->getBody()->getContents(), false);

        if(!isset($userResponsePayload->id))
            throw new \Exception('An error occurred while fetching user data');
        
        // Check if another user is already connected to this Discord account
        $alreadyConnectedUser = $this->ur->findOneBy(['discordUserId' => $userResponsePayload->id]);

        if($alreadyConnectedUser)
            throw new \Exception('This Discord account is already connected to another user');

        $user->setDiscordUserId($userResponsePayload->id);

        return $user;
    }
}
