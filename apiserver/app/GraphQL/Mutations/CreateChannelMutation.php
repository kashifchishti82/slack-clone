<?php

namespace App\GraphQL\Mutations;

use App\Interfaces\IChannelRepository;
use App\Models\Channel;

class CreateChannelMutation
{
    public function __construct(IChannelRepository $channelRepository){
        $this->repository = $channelRepository;
    }
    public function __invoke($_, array $args){
        $this->repository->createChannel($args);
    }
}
