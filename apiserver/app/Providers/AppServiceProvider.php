<?php

namespace App\Providers;

use App\GraphQL\Resolvers\UserResolver;
use App\Interfaces\IChannelRepository;
use App\Interfaces\IChatRepository;
use App\Interfaces\IUserRepository;
use App\Interfaces\IWorkSpaceRepository;
use App\Repositories\ChannelRepository;
use App\Repositories\ChatRepository;
use App\Repositories\WorkSpaceRepository;
use App\Services\RabbitMQService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(IUserRepository::class, UserResolver::class);
        $this->app->bind(IWorkSpaceRepository::class, WorkSpaceRepository::class);
        $this->app->bind(IChannelRepository::class, ChannelRepository::class);
        $this->app->bind(IChatRepository::class, ChatRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->app->singleton(RabbitMQService::class, function () {
            return RabbitMQService::getInstance();
        });
    }
}
