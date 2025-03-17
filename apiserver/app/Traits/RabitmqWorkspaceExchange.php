<?php

namespace App\Traits;

use App\Services\RabbitMQService;

trait RabitmqWorkspaceExchange
{
    protected static function bootRabitmqWorkspaceExchange()
    {

        static::created(function ($model)  {
            $model->workspaceExchange();
        });



//        static::deleted(function ($model) use ($rabitmqService){
//            $model->workspaceExchange($rabitmqService);
//        });
    }

    public function workspaceExchange()
    {
        $rabitmqService = app(RabbitMQService::class);
        $exchange = sprintf('workspace.%s', $this->id);
        $rabitmqService->createExchange($exchange, 'direct', true);

        $queues =[
            'messages' => 'chat.message',
            'typing' => 'chat.typing',
            'status' => 'chat.status',
        ];
        foreach ($queues as $queue => $routingkey) {
            $queue = sprintf('workspace.%s.%s', $this->id, $queue);
            $rabitmqService->createQueue($queue, false, true, false, false);
            $rabitmqService->bindQueueToExchange($queue, $exchange, $routingkey);
        }
    }
}
