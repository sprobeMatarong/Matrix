<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Validation\ValidationException;
use Laravel\Passport\Exceptions\OAuthServerException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->renderable(function (Throwable $exception, $request) {
            // set default error code
            $code = method_exists($exception, 'getStatusCode') ? $exception->getStatusCode() : 500;
            $error = $exception->getMessage();

            // handle API exceptions
            if ($request->expectsJson()) {
                // expired / has no valid token
                if ($exception instanceof AuthenticationException) {
                    $code = 401;
                }

                // expired / has no valid token
                if ($exception instanceof ValidationException) {
                    $error = $exception->errors();
                    $code = 422;
                }

                // laravel passport error
                if ($exception instanceof OAuthServerException) {
                    $code = $exception->statusCode();
                }

                return response()->json(
                    [
                        'code' => $code,
                        'error' => $error,
                    ],
                    $code
                );
            }
        });
    }
}
