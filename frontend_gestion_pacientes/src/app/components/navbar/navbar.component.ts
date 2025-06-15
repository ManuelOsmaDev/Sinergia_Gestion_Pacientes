import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  usuario!:string | null;
 constructor(private router: Router) {}
  ngOnInit(): void {
    this.usuario = localStorage.getItem('nombre_usuario');
  }



  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  navigate(){
    this.router.navigate(['/pacientes/crear']);

  }
}
