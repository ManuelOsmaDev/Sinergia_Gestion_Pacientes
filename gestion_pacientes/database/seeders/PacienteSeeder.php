<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PacienteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('pacientes')->insert([
            [
                'tipo_documento_id' => 1,
                'numero_documento' => '10000001',
                'nombre1' => 'Juan',
                'nombre2' => 'Carlos',
                'apellido1' => 'Pérez',
                'apellido2' => 'López',
                'genero_id' => 1,
                'departamento_id' => 1,
                'municipio_id' => 1,
                'correo' => 'juan@example.com',
            ],
            [
                'tipo_documento_id' => 2,
                'numero_documento' => '10000002',
                'nombre1' => 'Ana',
                'nombre2' => null,
                'apellido1' => 'Martínez',
                'apellido2' => 'Gómez',
                'genero_id' => 2,
                'departamento_id' => 2,
                'municipio_id' => 4,
                'correo' => 'ana@example.com',
            ],
            [
                'tipo_documento_id' => 1,
                'numero_documento' => '10000003',
                'nombre1' => 'Luis',
                'nombre2' => 'Miguel',
                'apellido1' => 'Ramírez',
                'apellido2' => null,
                'genero_id' => 1,
                'departamento_id' => 3,
                'municipio_id' => 5,
                'correo' => 'luis@example.com',
            ],
            [
                'tipo_documento_id' => 1,
                'numero_documento' => '10000004',
                'nombre1' => 'Sofía',
                'nombre2' => null,
                'apellido1' => 'Rodríguez',
                'apellido2' => 'Díaz',
                'genero_id' => 2,
                'departamento_id' => 4,
                'municipio_id' => 7,
                'correo' => 'sofia@example.com',
            ],
            [
                'tipo_documento_id' => 2,
                'numero_documento' => '10000005',
                'nombre1' => 'Carlos',
                'nombre2' => 'Andrés',
                'apellido1' => 'Moreno',
                'apellido2' => 'Vargas',
                'genero_id' => 1,
                'departamento_id' => 5,
                'municipio_id' => 9,
                'correo' => 'carlos@example.com',
            ],
        ]);
    }
}
