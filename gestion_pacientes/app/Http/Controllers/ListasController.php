<?php

namespace App\Http\Controllers;

use App\Models\Departamento;
use App\Models\Genero;
use App\Models\Municipio;
use App\Models\TipoDocumento;
use Illuminate\Http\JsonResponse;

class ListasController extends Controller
{
    public function departamentos(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => Departamento::all()
        ]);
    }

    public function generos(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => Genero::all()
        ]);
    }

    public function municipios(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => Municipio::all()
        ]);
    }

    public function tiposDocumento(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => TipoDocumento::all()
        ]);
    }
}
