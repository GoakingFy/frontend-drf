import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  public resultsUsers: Array<any> = []
  public editingUsuario: any = null;
  public loc: string = location.pathname
  public nuevoUsuario: any = {
    email: "",
    groups: [],
    username: "",
   
    
  };

  constructor(public apiService : ApiService) {}

  ngOnInit(): void {
    this.obtenerUsuario()
  }

  obtenerUsuario(){
    this.apiService.getUsers().subscribe(data => {
      console.log(data)
      this.resultsUsers = data.results
    })

  }

  borrarUsuario(usuario: any):void{
    if (confirm('¿Estás seguro de que deseas borrar este usuario?')) {
      this.apiService.deleteResource(usuario.url).subscribe(
        response => {
          alert('Usuario borrado correctamente')
          console.log('Usuario borrado correctamente');
        },
        error => {
          console.error('Error al borrar el usuario:', error);
          alert('Error al borrar el usuario:')
        }
      );
    }
  }

  

  anadirUsuario() {
  
    this.apiService.createResource('users', this.nuevoUsuario).subscribe(
      (response) => {
        alert('Usuario añadido correctamente');
        location.reload();
      },
      (error) => {
        console.error('Error al añadir el Usuario:', error);
        alert('Error al añadir el Usuario:')
      }
    );
  }

}
