<?php

namespace App\Providers;

use App\GraphQL\Resolvers\UserResolver;
use App\Interfaces\IChannelRepository;
use App\Interfaces\IUserRepository;
use App\Interfaces\IWorkSpaceRepository;
use App\Repositories\ChannelRepository;
use App\Repositories\WorkSpaceRepository;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Response;

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
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Response::macro('graphql', function (String $message, $data = null, $errors = []) {
            if (!empty($errors) && is_a($errors, 'Illuminate\Support\MessageBag')) {
                $errors = (function ($errors) {
                    $typeFix = [];

                    foreach ($errors->toArray() as $key => $errorMessages) {
                        foreach ($errorMessages as $errorMessage) {
                            $typeFix[] = [
                                'field' => $key,
                                'message' => $errorMessage
                            ];
                        }
                    }
                    return $typeFix;
                })(
                    $errors
                );
            }
            if(!empty($data) && is_object($data)) {
                $response = $data;
            }else{
                $response = array_merge([
                    'response' => [
                        'success' => empty($errors) ? true : false,
                        'message' => $message,
                        'errors' => $errors ?: null,
                    ],

                ], $data ?: []);
            }

            return $response;
        });
    }
}
