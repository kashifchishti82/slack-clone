<?php

namespace App\Providers;

use App\GraphQL\Resolvers\UserResolver;
use App\Interfaces\IUserRepository;
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
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Response::macro('graphql', function ($message, $data = null, $errors = []) {
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
            $response = array_merge([
                'response' => [
                    'success' => empty($errors) ? true : false,
                    'message' => $message,
                    'errors' => $errors ?: null,
                ],

            ], $data ?: []);
            return $response;
        });
    }
}
