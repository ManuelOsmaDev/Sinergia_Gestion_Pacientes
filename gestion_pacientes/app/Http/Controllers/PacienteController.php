<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

use App\Models\Paciente;
use App\Models\Departamento;
use App\Models\Municipio;
use App\Models\Genero;
use App\Models\TipoDocumento;


class PacienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
{
    try {
        $query = Paciente::with(['departamento', 'municipio', 'genero', 'tipoDocumento']);

        if ($request->filled('search')) {
    $search = $request->search;
    $query->where(function ($q) use ($search) {
        $q->where('nombre1', 'like', "%{$search}%")
          ->orWhere('nombre2', 'like', "%{$search}%")
          ->orWhere('apellido1', 'like', "%{$search}%")
          ->orWhere('apellido2', 'like', "%{$search}%")
          ->orWhere('numero_documento', 'like', "%{$search}%")
          ->orWhere('correo', 'like', "%{$search}%");
    });
}


        $perPage = $request->get('per_page', 10); 
        $pacientes = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $pacientes
        ], 200);
    } catch (\Throwable $e) {
        \Log::error('Error al listar pacientes', ['error' => $e->getMessage()]);

        return response()->json([
            'success' => false,
            'message' => 'No se pudieron obtener los pacientes.',
            'error' => $e->getMessage()
        ], 500);
    }
}


    /**
     * Show the form for creating a new resource.
      */
    public function show(Paciente $paciente): JsonResponse
{
    try {
        $paciente->load(['tipoDocumento', 'genero', 'departamento', 'municipio']);

        return response()->json([
            'success' => true,
            'data' => $paciente
        ], 200);

    } catch (\Throwable $e) {
        Log::error('Error al obtener paciente por ID', [
            'paciente_id' => $paciente->id ?? null,
            'error' => $e->getMessage()
        ]);

        return response()->json([
            'success' => false,
            'message' => 'No se pudo obtener el paciente.',
            'error' => $e->getMessage()
        ], 500);
    }
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
{
    try {
        $validator = Validator::make($request->all(), [
            'tipo_documento_id' => 'required|exists:tipos_documento,id',
            'numero_documento'  => 'required|unique:pacientes,numero_documento',
            'nombre1'           => 'required|string|max:255',
            'apellido1'         => 'required|string|max:255',
            'nombre2'           => 'nullable|string|max:255',
            'apellido2'         => 'nullable|string|max:255',
            'genero_id'         => 'required|exists:generos,id',
            'departamento_id'   => 'required|exists:departamentos,id',
            'municipio_id'      => 'required|exists:municipios,id',
            'correo'            => 'required|email|unique:pacientes,correo',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Crear el paciente
        $paciente = Paciente::create($validator->validated());

        return response()->json([
            'message' => 'Paciente creado correctamente',
            'data' => $paciente
        ], 201);

    } catch (\Throwable $e) {
        Log::error('Error al crear paciente', [
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);

        return response()->json([
            'message' => 'Ocurrió un error inesperado al registrar el paciente.',
            'error' => $e->getMessage()
        ], 500);
    }
}

   

    /**
     * Show the form for editing the specified resource.
     */
    // public function edit(Paciente $paciente)
    // {
    //     $departamentos = Departamento::all();
    //     $municipios = Municipio::all();
    //     $genero = Genero::all();
    //     $tiposDocumento = TipoDocumento::all();

    //     return view('pacientes.edit', compact('paciente', 'departamentos', 'municipios', 'genero', 'tiposDocumento'));
    // }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Paciente $paciente): JsonResponse
{
    try {
        $validator = Validator::make($request->all(), [
            'tipo_documento_id' => 'required|exists:tipos_documento,id',
            'numero_documento'  => 'required|unique:pacientes,numero_documento,' . $paciente->id,
            'nombre1'           => 'required|string|max:255',
            'apellido1'         => 'required|string|max:255',
            'nombre2'           => 'nullable|string|max:255',
            'apellido2'         => 'nullable|string|max:255',
            'genero_id'         => 'required|exists:generos,id',
            'departamento_id'   => 'required|exists:departamentos,id',
            'municipio_id'      => 'required|exists:municipios,id',
            'correo'            => 'required|email|unique:pacientes,correo,' . $paciente->id,
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $validator->errors(),
            ], 422);
        }

        $paciente->update($validator->validated());

        return response()->json([
            'success' => true,
            'message' => 'Paciente actualizado correctamente',
            'data' => $paciente
        ], 200);

    } catch (\Throwable $e) {
        Log::error('Error al actualizar paciente', [
            'paciente_id' => $paciente->id,
            'error' => $e->getMessage(),
        ]);

        return response()->json([
            'success' => false,
            'message' => 'Ocurrió un error inesperado al actualizar el paciente.',
            'error' => $e->getMessage()
        ], 500);
    }
}


    public function destroy(Paciente $paciente): JsonResponse
{
    try {
        $paciente->delete();

        return response()->json([
            'success' => true,
            'message' => 'Paciente eliminado correctamente',
        ], 200);

    } catch (\Throwable $e) {
        Log::error('Error al eliminar paciente', [
            'paciente_id' => $paciente->id,
            'error' => $e->getMessage()
        ]);

        return response()->json([
            'success' => false,
            'message' => 'No se pudo eliminar el paciente.',
            'error' => $e->getMessage()
        ], 500);
    }
}
}
