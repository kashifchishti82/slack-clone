<?php

namespace App\Repositories;

use App\Interfaces\IChannelRepository;

class ChannelRepository implements IChannelRepository
{
    public function getAllChannels(){

    }

    public function createChannel(array $args) {
        [$name, $description, $workspace_id] = $args;
        
    }
}
