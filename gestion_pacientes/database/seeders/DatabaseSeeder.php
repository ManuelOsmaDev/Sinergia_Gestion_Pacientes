<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(
            [
                DepartamentoSeeder::class,
                MunicipioSeeder::class,
                TipoDocumentoSeeder::class,
                GeneroSeeder::class,
                UserSeeder::class,
                PacienteSeeder::class
            ]
        );
    }
}
