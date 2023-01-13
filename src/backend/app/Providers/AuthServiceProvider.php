<?php

namespace App\Providers;

use Laravel\Passport\Passport;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        if (! $this->app->routesAreCached()) {
            // set passport route to be inside API routes.
            Passport::routes(null, [
                'prefix' => config('app.api_version') . '/oauth',
            ]);
        }

        // add token expiry
        Passport::tokensExpireIn(now()->addDays(env('PASSPORT_ACCESS_TOKEN_EXPIRY_DAYS', 15)));
        Passport::refreshTokensExpireIn(now()->addDays(env('PASSPORT_ACCESS_TOKEN_EXPIRY_DAYS', 30)));
        Passport::personalAccessTokensExpireIn(now()->addMonths(env('PASSPORT_PERSONAL_TOKEN_EXPIRY_MONTHS', 6)));
    }
}
