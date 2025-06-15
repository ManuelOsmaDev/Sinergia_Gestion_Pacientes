import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../../../services/pacientes.service';
import { ListaMaestraService } from '../../../services/lista-maestra.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css'
})
export class CrearComponent {
 pacienteForm!: FormGroup;
  isLoading = false;
  showSuccessToast = false;
  showErrorToast = false;
  error: string | null = null;

  editMode = false;
  pacienteId: number | null = null;

  tiposDocumento: any[] = [];
  generos: any[] = [];
  departamentos: any[] = [];
  municipios: any[] = [];

  constructor(
  private fb: FormBuilder,
  private pacienteService: PacienteService,
  private route: ActivatedRoute,
  private router: Router,
  private listaMaestraService: ListaMaestraService
) {}

  ngOnInit(): void {
    this.pacienteForm = this.fb.group({
      tipo_documento_id: [null, Validators.required],
      numero_documento: ['', Validators.required],
      nombre1: ['', Validators.required],
      nombre2: [''],
      apellido1: ['', Validators.required],
      apellido2: [''],
      genero_id: [null, Validators.required],
      departamento_id: [null, Validators.required],
      municipio_id: [null, Validators.required],
      correo: ['', [Validators.required, Validators.email]]
    });

 
    this.loadCatalogos();

  
    this.pacienteId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.pacienteId) {
      this.editMode = true;
      this.cargarPaciente(this.pacienteId);
    }
  }

  loadCatalogos(): void {
  this.listaMaestraService.getTiposDocumento().subscribe({
    next: (res) => this.tiposDocumento = res.data || res,
    error: () => this.tiposDocumento = []
  });

  this.listaMaestraService.getGeneros().subscribe({
    next: (res) => this.generos = res.data || res,
    error: () => this.generos = []
  });

  this.listaMaestraService.getDepartamentos().subscribe({
    next: (res) => this.departamentos = res.data || res,
    error: () => this.departamentos = []
  });

  this.listaMaestraService.getMunicipios().subscribe({
    next: (res) => this.municipios = res.data || res,
    error: () => this.municipios = []
  });

  }

  cargarPaciente(id: number): void {
    this.isLoading = true;
    this.pacienteService.obtenerPaciente(id).subscribe({
      next: (res) => {
    this.isLoading = false;
        this.pacienteForm.patchValue(res.data);
      },
      error: () => {
    this.isLoading = false;
        this.router.navigate(['/pacientes/listar']);
      }
    });
  }

 onSubmit(): void {
  if (this.pacienteForm.invalid) return;

  this.isLoading = true;
  this.error = null;

  const data = this.pacienteForm.value;

  const peticion = this.editMode
    ? this.pacienteService.actualizarPaciente(this.pacienteId!, data)
    : this.pacienteService.crearPaciente(data);

  peticion.subscribe({
    next: () => {
      this.isLoading = false;

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: this.editMode
          ? 'Paciente actualizado correctamente'
          : 'Paciente creado correctamente',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });

      setTimeout(() => this.router.navigate(['/pacientes/listar']), 1000);
    },
    error: (err) => {
      this.isLoading = false;

      if (err.status === 422 && err.error?.errors) {
        const errores = err.error.errors;
        const mensajeError = Object.values(errores)
          .map((mensajes: any) => mensajes.join(' '))
          .join('\n');

        Swal.fire({
          icon: 'error',
          title: 'Errores de validación',
          html: `<pre style="text-align: left;">${mensajeError}</pre>`,
          customClass: {
            popup: 'text-start'
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error?.message || 'Error al guardar el paciente.'
        });
      }
    }
  });
}


  isInvalid(controlName: string): boolean {
    const control = this.pacienteForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  closeSuccessToast(): void {
    this.showSuccessToast = false;
  }

  closeErrorToast(): void {
    this.showErrorToast = false;
  }
  navigate(){
     this.router.navigate(['/pacientes']);
  }
}
