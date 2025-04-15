<?php

namespace App\GraphQL\Query;

use App\Interfaces\IChannelRepository;

final class GetChannelsMessagesQuery
{
    public function __construct(private  IChannelRepository $repository) {}

    public function __invoke($_, array $args)
    {
        return $this->repository->getChannelMessages($args['channel_id']);
    }
}
