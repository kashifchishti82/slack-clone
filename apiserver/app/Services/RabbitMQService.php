<?php

namespace App\Services;


use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Channel\AMQPChannel;
use PhpAmqpLib\Message\AMQPMessage;

class RabbitMQService
{
    private static ?self $instance = null;
    private AMQPStreamConnection $connection;
    private AMQPChannel $channel;

    private function __construct()
    {
        $this->connection = new AMQPStreamConnection(
            env('RABBITMQ_HOST', 'localhost'),
            env('RABBITMQ_PORT', 5672),
            env('RABBITMQ_USER', 'guest'),
            env('RABBITMQ_PASSWORD', 'guest'),
            env('RABBITMQ_VHOST', '/') // Default vhost
        );

        $this->channel = $this->connection->channel();
    }

    public static function getInstance(): self
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function createQueue(string $queueName, bool $durable = true, bool $autoDelete = false)
    {
        $this->channel->queue_declare(
            $queueName,
            false, // Passive
            $durable, // Durable queue (survives broker restart)
            false, // Exclusive
            $autoDelete // Auto-delete
        );
    }

    public function createExchange(string $exchangeName, string $type = 'direct', bool $durable = true)
    {
        $this->channel->exchange_declare(
            $exchangeName,
            $type,
            false, // Passive
            $durable, // Durable exchange
            false // Auto-delete
        );
    }

    public function bindQueueToExchange(string $queueName, string $exchangeName, string $routingKey = '')
    {
        $this->channel->queue_bind($queueName, $exchangeName, $routingKey);
    }

    public function publishMessage(string $exchangeName, string $routingKey, string $messageBody)
    {
        $message = new AMQPMessage($messageBody,  ['delivery_mode' => AMQPMessage::DELIVERY_MODE_PERSISTENT] );
        $this->channel->basic_publish($message, $exchangeName, $routingKey);
    }

    public function consumeMessage(string $queueName, callable $callback)
    {
        $this->channel->basic_consume($queueName, '', false, true, false, false, $callback);

        while ($this->channel->is_consuming()) {
            $this->channel->wait();
        }
    }

    public function closeConnection()
    {
        $this->channel->close();
        $this->connection->close();
    }

    public function getChannel(): AMQPChannel
    {
        return $this->channel;
    }
}
