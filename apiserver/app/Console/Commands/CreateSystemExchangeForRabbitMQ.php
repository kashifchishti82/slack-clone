<?php

namespace App\Console\Commands;

use App\Services\RabbitMQService;
use Illuminate\Console\Command;

class CreateSystemExchangeForRabbitMQ extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:create-system-exchange-for-rabbit-m-q';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $rabbitmqService = app(RabbitMQService::class);
        $exchange = sprintf('workspace.%s.direct', "System");
        $rabbitmqService->createExchange($exchange, 'direct', true);

        $queues =[
            'messages' => 'chat.message'
        ];
        foreach ($queues as $queue => $routingkey) {
            $queue = sprintf('workspace.%s.%s', "System", $queue);
            $rabbitmqService->createQueue($queue, true, false);
            $rabbitmqService->bindQueueToExchange($queue, $exchange, $routingkey);
        }
    }
}
