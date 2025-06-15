<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MunicipioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departamentos = DB::table('departamentos')->get();

        foreach ($departamentos as $dep) {
            DB::table('municipios')->insert([
                ['nombre' => $dep->nombre . ' Mpio 1', 'departamento_id' => $dep->id],
                ['nombre' => $dep->nombre . ' Mpio 2', 'departamento_id' => $dep->id],
            ]);
        }
    }
}
