<?php

namespace App\GraphQL\Mutations;

use App\Models\User;
use App\Repositories\UserRepository;


class LoginMutation
{
    public function __construct(UserRepository $userRepository){
        $this->userRepository = $userRepository;
    }
    public function __invoke($_, array $args)
    {
        return  $this->userRepository->login($args['email'], $args['password']);

    }
}
