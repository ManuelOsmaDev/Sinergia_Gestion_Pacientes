import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { ListarComponent } from './pages/pacientes/listar/listar.component';
import { CrearComponent } from './pages/pacientes/crear/crear.component';
import { VerComponent } from './pages/pacientes/ver/ver.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'pacientes',
    canActivate: [AuthGuard],
    component: PacientesComponent,
    children: [
      { path: 'crear', component: CrearComponent },
      { path: 'listar', component: ListarComponent },
      { path: 'editar/:id', component: CrearComponent },
      { path: 'ver/:id', component: VerComponent },
      { path: '', redirectTo: 'listar', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];