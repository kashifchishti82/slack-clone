<?php

namespace App\GraphQL\Query;

use App\Interfaces\IChannelRepository;

class GetChannelsOfWorkspaceQuery
{
    public function __construct(private  IChannelRepository $repository) {}

    public function __invoke($_, array $args)
    {
        return $this->repository->getChannelsOfWorkspace($args['workspace_id']);
    }
}
