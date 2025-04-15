<?php

namespace App\Console\Commands;

use App\Models\Channel;
use App\Models\Chat;
use App\Services\RabbitMQService;
use Illuminate\Console\Command;

class ConsumeRabitMQMessages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:consume-rabit-m-q-messages';

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
        $rabitmqService = app(RabbitMQService::class);

        $channels = Channel::all();
        foreach ($channels as $channel) {
            $queue = sprintf('laravel.channel.%s.%s', $channel->id, 'messages');
            $rabitmqService->consumeMessage($queue, function ($message) {
                $data = json_decode($message->body, true);
                $receiver_type = $data['receiver_type'];
                if ($receiver_type == 'Channel') {
                    $receiver = Channel::find($data['receiver']);
                }
                $chat = new Chat();

                $chat->user_id = $data['sender'];
                $chat->message = json_encode($data);
                $receiver->messages()->save($chat);
            });
        }
        if (!$rabitmqService->isConsuming()) {
            $rabitmqService->closeConnection();
        }
    }
}
