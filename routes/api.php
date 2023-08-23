<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\CalendarController;
use App\Http\Controllers\API\HomeworkListController;
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

Route::post('login', [RegisterController::class, 'login']);

Route::middleware('auth:sanctum')->group( function () {
    Route::post('register', [RegisterController::class, 'register']);
    Route::post('logout', [RegisterController::class, 'logout']);
    Route::get('/user/{user}', [UserController::class, 'user']);
    Route::put('/user/{user}', [UserController::class, 'updateUser']);
    Route::delete('/user/{user}', [UserController::class, 'deleteUser']);
    Route::get('/users', [UserController::class, 'users']);
    
    Route::get('/calendarEvents',[CalendarController::class,'events']);
    Route::post('/calendarEvent',[CalendarController::class,'create']);
    Route::put('/calendarEvent/{event}',[CalendarController::class,'update']);
    Route::delete('/calendarEvent/{event}',[CalendarController::class,'delete']);
    
    Route::get('/homework/list/{user}', [HomeworkListController::class, 'homeworklist']);
    Route::post('/homework/create/{user}', [HomeworkListController::class, 'create']);
    Route::delete('/homework/{homework}', [HomeworkListController::class, 'delete']);
    Route::put('/homework/{homework}',[HomeworkListController::class,'update']);
});
