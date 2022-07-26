<?php

namespace App\Security\RequestMatcher;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestMatcher;

class ApiLoginRequestMatcher extends RequestMatcher
{
    public function matches(Request $request)
    {
        if($request->headers->get('Authorization'))
            return true;
    }
}