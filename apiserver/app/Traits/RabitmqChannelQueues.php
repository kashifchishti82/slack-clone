<?php

namespace App\Traits;

use App\Services\RabbitMQService;

trait RabitmqChannelQueues
{
    protected static function bootRabitmqChannelQueues()
    {

        static::created(function ($model) {
            $model->workspaceQueues();
        });



        //        static::deleted(function ($model) use ($rabitmqService){
        //            $model->workspaceExchange($rabitmqService);
        //        });
    }

    public function workspaceQueues()
    {
        $rabitmqService = app(RabbitMQService::class);
        $exchange = sprintf('workspace.%s', $this->workspace->id);
        $queues = [
            'messages' => '%s.message',
            'typing' => '%s.typing',
            'status' => '%s.status',
        ];

        $queue = sprintf('laravel.channel.%s.%s', $this->id, 'messages');
        $rabitmqService->createQueue($queue);
        $rabitmqService->bindQueueToExchange($queue, $exchange, sprintf('%s.message', $this->id));
        foreach ($queues as $queue => $routingkey) {
            $queue = sprintf('node.channel.%s.%s', $this->id, $queue);
            $rabitmqService->createQueue($queue);
            $rabitmqService->bindQueueToExchange($queue, $exchange, sprintf($routingkey, $this->id));
        }
    }
}
