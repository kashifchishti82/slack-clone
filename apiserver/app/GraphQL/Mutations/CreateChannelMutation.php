<?php

namespace App\GraphQL\Mutations;

use App\Interfaces\IChannelRepository;
use App\Models\Channel;

class CreateChannelMutation
{
    public function __construct(private IChannelRepository $repository) {}

    public function __invoke($_, array $args)
    {
        return $this->repository->createChannel($args);
    }
}
