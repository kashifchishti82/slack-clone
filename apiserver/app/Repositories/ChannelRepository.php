<?php

namespace App\Repositories;

use App\Interfaces\IChannelRepository;
use App\Models\Channel;
use App\Models\Workspace;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ChannelRepository implements IChannelRepository
{
    public function getAllChannels() {}

    public function createChannel(array $args)
    {
        $name = Arr::get($args, "name");
        $description = Arr::get($args, "description");
        $is_private = Arr::get($args, "is_private");
        $workspace_id = Arr::get($args, "workspaceId");
        $workspace = Workspace::find($workspace_id);
        $channel = $workspace->channels()->create([
            'name' => $name,
            'description' => $description,
            'is_private' => $is_private
        ]);
        return $channel;
    }

    public function getChannelsOfWorkspace($workspace_id)
    {
        $workspace = Workspace::find($workspace_id);
        $channels = $workspace->channels;
        return $channels;
    }

    public function getChannelMessages($channel_id)
    {
        $channel = Channel::find($channel_id);
        return $channel;
    }
}
