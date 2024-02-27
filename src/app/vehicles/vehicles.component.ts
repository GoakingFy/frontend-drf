import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { subscribe } from 'diagnostics_channel';



@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css',
})
export class VehiclesComponent implements OnInit {
  public resultVehicles: Array<any> = [];
  public brands: Array<any> = [];
  public editingVehicle: any = null;
  public loc: string = location.pathname
  public filters : any = {}
  public nuevoVehiculo: any = {
    tipo: "",
    chasis: "",
    modelo: "",
    matricula: "",
    color: "",
    fecha_fabricacion: "",
    fecha_matriculacion: "",
    fecha_baja: "",
    suspendido: null,
    
  };
  constructor(
    public apiService: ApiService
  ) {}
  ngOnInit(): void {
    
    this.apiService.getVehicles(this.filters).subscribe((data) => {
      this.resultVehicles = data.results;
      this.fetchBrandName();
    });

    this.apiService.getAllBrands().subscribe((data)=>{
      this.brands = data.results
    })
  }


  filtrar(){
    this.apiService.getVehicles(this.filters).subscribe((data) => {
      this.resultVehicles = data.results;
      this.fetchBrandName();
    });
  }


  fetchBrandName() {
    this.resultVehicles.forEach((vehicle) => {
      this.apiService.getBrandById(vehicle.marca).subscribe((brand: any) => {
        vehicle.nombreMarca = brand.nombre;
      });
    });
  }

  borrarVehiculo(vehicle: any): void {
    if (confirm('¿Estás seguro de que deseas borrar este vehículo?')) {
      this.apiService.deleteResource(vehicle.url).subscribe(
        response => {
         
          console.log('Vehículo borrado correctamente');
        },
        error => {
          console.error('Error al borrar el vehículo:', error);
        }
      );
    }
  }

  editarVehiculo(vehicle: any) {
    this.editingVehicle = { ...vehicle }; 
  }
  cancelarEdicion() {
    this.editingVehicle = null;
  }

  guardarCambios() {
   this.apiService.updateResource(this.editingVehicle.url , this.editingVehicle).subscribe(
    response => {
         
      alert('Vehículo Actualizado correctamente');
      location.reload()

    },
    error => {
      console.error('Error al actualizar el vehículo:', error);
    }
   )
    this.editingVehicle = null;
  }

  anadirVehiculo() {
    // Aquí puedes agregar lógica para enviar el nuevo vehículo al servidor
    this.apiService.createResource('vehiculos', this.nuevoVehiculo).subscribe(
      (response) => {
        alert('Vehículo añadido correctamente');
        location.reload();
      },
      (error) => {
        console.error('Error al añadir el vehículo:', error);
      }
    );
  }
}
