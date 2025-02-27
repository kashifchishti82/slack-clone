<?php

namespace App\GraphQL\Mutations;

use App\Repositories\UserRepository;

class RegisterMutation
{
    public function __construct(UserRepository $userRepository){
        $this->userRepository = $userRepository;
    }
    public function __invoke($_, array $args)
    {
        return  $this->userRepository->register($args['name'], $args['email'], $args['password'], $args['password_confirmation']);

    }
}
