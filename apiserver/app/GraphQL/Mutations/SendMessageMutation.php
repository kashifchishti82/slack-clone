<?php

namespace App\GraphQL\Mutations;

use App\Interfaces\IChatRepository;

final readonly class SendMessageMutation
{
    public function __construct(protected IChatRepository $chatRepository){}

    public function __invoke($_, array $args)
    {

    }
}
