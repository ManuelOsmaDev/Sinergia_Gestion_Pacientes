<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ListasController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('login', [UserController::class, 'login']);
Route::post('register', [UserController::class, 'register']);


Route::middleware('auth:api')->group(function () {

    // Pacientes
    Route::get('/pacientes', [PacienteController::class, 'index']);
    Route::post('/pacientes', [PacienteController::class, 'store']);
    Route::get('/pacientes/{paciente}', [PacienteController::class, 'show']);
    Route::put('/pacientes/{paciente}', [PacienteController::class, 'update']);
    Route::delete('/pacientes/{paciente}', [PacienteController::class, 'destroy']);

    //Listados
    Route::get('/listas/departamentos', [ListasController::class, 'departamentos']);
    Route::get('/listas/generos', [ListasController::class, 'generos']);
    Route::get('/listas/municipios', [ListasController::class, 'municipios']);
    Route::get('/listas/tipos-documento', [ListasController::class, 'tiposDocumento']);

    // Logout
    Route::post('logout', [UserController::class, 'logout']);

    // Obtener usuario autenticado
    Route::get('/me', function () {
        return response()->json([
            'user' => auth('api')->user()
        ]);
    });
});

