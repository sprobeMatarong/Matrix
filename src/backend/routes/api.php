<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\HomeController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\ProfileController;
use App\Http\Controllers\API\Auth\TokenController;
use App\Http\Controllers\API\Auth\PasswordController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// Default API Homepage
Route::get('/', [HomeController::class, '__invoke']);

// Profile
Route::get('/profile', [ProfileController::class, 'index']);
Route::put('/profile', [ProfileController::class, 'update']);

// user logout
Route::delete('oauth/token', [TokenController::class, 'delete'])->middleware('auth:api');

Route::post('register', [UserController::class, 'register']);

Route::post('activate', [UserController::class, 'activate']);

// Routes for Forget and Reset Password
Route::post('password/forgot', [PasswordController::class, 'forgot']);
Route::post('password/reset', [PasswordController::class, 'reset']);

// users route
Route::prefix('users')
    ->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::post('/', [UserController::class, 'create']);
        Route::get('{id}', [UserController::class, 'read']);
        Route::put('{id}', [UserController::class, 'update']);
        Route::delete('{id}', [UserController::class, 'delete']);
    });
