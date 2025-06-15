@extends('layouts.app')

@section('content')
    <h1>Lista de Pacientes</h1>

    <ul>
        @foreach ($pacientes as $paciente)
            <li>{{ $paciente->nombre1 }} {{ $paciente->apellido1 }}</li>
        @endforeach
    </ul>
@endsection
