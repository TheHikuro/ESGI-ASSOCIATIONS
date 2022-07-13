<?php

namespace App\Controller\Association;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class ExtractPresencesController extends AbstractController
{
    private const VALID_FORMATS_TYPES = ["pdf", "csv"];

    public function __invoke(Request $request)
    {
        $associations = $request->attributes->get('data');
        $payload = json_decode($request->getContent(), false);

        if(!isset($payload->format))
            throw new \Exception('Format not defined');
        if(!in_array($payload->format, self::VALID_FORMATS_TYPES))
            throw new \Exception('Format must be ' . implode(', ', self::VALID_FORMATS_TYPES));
        
        dd($associations, $payload);

        return $associations;
    }
}