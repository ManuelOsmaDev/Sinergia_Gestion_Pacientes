<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipoDocumentoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tipos_documento')->insert([
            ['nombre' => 'Cédula de Ciudadanía'],
            ['nombre' => 'Tarjeta de Identidad'],
        ]);
    }
}
