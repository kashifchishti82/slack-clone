<?php

namespace App\GraphQL\Query;

use App\Interfaces\IChannelRepository;

class GetChannelsOfWorkspaceQuery{
    public function __construct(IChannelRepository $channelRepository)
    {
        $this->repository = $channelRepository;
    }

    public function __invoke($_, array $args)
    {
        return $this->repository->getChannelsOfWorkspace($args['workspace_id']);
    }
}
