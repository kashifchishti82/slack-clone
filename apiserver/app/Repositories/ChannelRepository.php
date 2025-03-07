<?php

namespace App\Repositories;

use App\Interfaces\IChannelRepository;
use App\Models\Workspace;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ChannelRepository implements IChannelRepository
{
    public function getAllChannels()
    {
    }

    public function createChannel(array $args)
    {
        $validator = Validator::make(
            $args,
            [
                'name' => ['required', 'string', 'max:255'],
                'description' => ['required', 'string', 'max:255'],
                'is_private' => ['required', 'boolean'],
                'workspaceId' => ['required']
            ]
        );

        if ($validator->fails()) {
            return response()->graphql("Validation Error", [], $validator->errors());
        }
        $name = Arr::get($args, "name");
        $description = Arr::get($args, "description");
        $is_private = Arr::get($args, "is_private");
        $workspace_id = Arr::get($args, "workspaceId");
        $workspace = Workspace::find($workspace_id);
        if (!$workspace) {
            return response()->graphql("Workspace not found", [], []);
        }
        $channel = $workspace->channels()->create([
            'name' => $name,
            'description' => $description,
            'is_private' => $is_private
        ]);
        return response()->graphql("Channel created successfully", $channel, []);
    }

    public function getChannelsOfWorkspace($workspace_id)
    {
        $workspace = Workspace::find($workspace_id);
        if (!$workspace) {
            return response()->graphql("Workspace not found", [], []);
        }
        $channels = $workspace->channels;
        return response()->graphql("Channels of workspace", $channels, []);
    }
}
