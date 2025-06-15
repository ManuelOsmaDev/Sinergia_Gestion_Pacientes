import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PacienteService } from '../../../services/pacientes.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent {
pacientes: any = { data: [] };
  paginaActual = 1;
  searchTerm = '';
  isLoading = false;
  toastMensaje: string = '';
  showToast: boolean = false;
  toastClase: string = 'bg-success';

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes(): void {
  this.isLoading = true;
  this.pacienteService.obtenerPacientes(this.paginaActual, this.searchTerm).subscribe({
    next: (data) => {
      this.pacientes = data;
      this.isLoading = false;
    },
    error: () => {
      this.pacientes = { data: [] };
      this.isLoading = false;
    }
  });
}



  cambiarPagina(nuevaPagina: number): void {
  this.paginaActual = nuevaPagina;
  this.cargarPacientes();
}


  buscar(): void {
    this.paginaActual = 1;
    this.cargarPacientes();
  }

 eliminarPaciente(id: number): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará el paciente.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.pacienteService.eliminarPaciente(id).subscribe({
        next: () => {
          this.cargarPacientes();

          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Paciente eliminado correctamente',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });
        },
        error: () => {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: 'Error al eliminar el paciente',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });
        }
      });
    }
  });
}



}
