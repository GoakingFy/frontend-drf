import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  public resultBrands: Array<any> = [];
  public editingMarca: any = null;
  public loc: string = location.pathname
  public nuevaMarca: any = {
    nombre: "",
   
    
  };
  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
   this.obtenerMarca()
  }

  obtenerMarca(){
    this.apiService.getAllBrands().subscribe((data =>{
     console.log(data)
      this.resultBrands = data.results
    }))
  }

  borrarMarca(marca: any):void{
    if (confirm('¿Estás seguro de que deseas borrar esta marca?')) {
      this.apiService.deleteResource(marca.url).subscribe(
        response => {
         alert('Marca borrado correctamente')
          console.log('Marca borrado correctamente');
          location.reload()
        },
        error => {
          console.error('Error al borrar la marca:', error);
          alert('Error al borrar la marca:')
        }
      );
    }
  }


  anadirMarca() {
  
    this.apiService.createResource('marcas', this.nuevaMarca).subscribe(
      (response) => {
        alert('Marca añadido correctamente');
        location.reload();
      },
      (error) => {
        console.error('Error al añadir la marca:', error);
        alert('Error al añadir la marca:')
      }
    );
  }


  editarMarca(marca: any) {
    this.editingMarca = { ...marca }; 
  }
  cancelarEdicion() {
    this.editingMarca = null;
  }

  guardarCambios() {
   this.apiService.updateResource(this.editingMarca.url , this.editingMarca).subscribe(
    response => {
         
      alert('Marca Actualizado correctamente');
      location.reload()

    },
    error => {
      console.error('Error al actualizar la marca:', error);
      alert('Error al actualizar la marca:')
    }
   )
    this.editingMarca = null;
  }


}
