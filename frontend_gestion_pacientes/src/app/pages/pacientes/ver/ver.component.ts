import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../../../services/pacientes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver',
  imports: [CommonModule],
  templateUrl: './ver.component.html',
  styleUrl: './ver.component.css'
})
export class VerComponent {
paciente: any = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pacienteService: PacienteService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.router.navigate(['/pacientes/listar']);
      return;
    }

    this.pacienteService.obtenerPaciente(id).subscribe({
      next: (res) => {
        this.paciente = res.data;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Paciente no encontrado o error al cargar.';
        this.isLoading = false;
        setTimeout(() => this.router.navigate(['/pacientes/listar']), 2000);
      }
    });
  }
  navigate(){
     this.router.navigate(['/pacientes']);
  }
}
