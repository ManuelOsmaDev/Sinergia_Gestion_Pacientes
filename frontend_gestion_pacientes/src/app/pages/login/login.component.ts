import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  error: string | null = null;
   showSuccessToast = false;
  showErrorToast = false;
isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.registerForm = this.fb.group(
  {
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password_confirmation: ['', Validators.required]
  },
  {
    validators: this.passwordMatchValidator
  }
);

  }

 onSubmit(): void {
  if (this.loginForm.invalid) return;

  this.isLoading = true;

  this.authService.login(this.loginForm.value).subscribe({
    next: () => {
      this.isLoading = false;

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });

      this.router.navigate(['/pacientes']);
    },
    error: (err) => {
      this.isLoading = false;

      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: err.error?.message || 'Credenciales inválidas o error del servidor'
      });
    }
  });
}



  closeSuccessToast() {
    this.showSuccessToast = false;
  }

  closeErrorToast() {
    this.showErrorToast = false;
  }

  passwordMatchValidator(group: FormGroup) {
  const password = group.get('password')?.value;
  const confirm = group.get('password_confirmation')?.value;
  return password === confirm ? null : { passwordsMismatch: true };
}

onRegister(): void {
  if (this.registerForm.invalid) return;

  this.isLoading = true;

  this.authService.register(this.registerForm.value).subscribe({
    next: () => {
      this.isLoading = false;

      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Ya puedes iniciar sesión'
      });

      this.registerForm.reset();
      this.loginForm.reset();
      this.isRegistering = false;
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
          title: 'Error al registrarse',
          text: err.error?.message || 'Hubo un error al crear la cuenta.'
        });
      }
    }
  });
}



  isRegistering = false;
toggleMode(event: Event): void {
  event.preventDefault();
  this.isRegistering = !this.isRegistering;
  this.error = null;
}

}
