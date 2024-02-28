import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';



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
    fecha_baja: null,
    suspendido: false,
    
  };
  constructor(
    public apiService: ApiService
  ) {}
  ngOnInit(): void {
    
    this.obtenerVehiculos()

    this.apiService.getAllBrands().subscribe((data)=>{
      this.brands = data.results
    })
  }


  filtrar(){
    this.obtenerVehiculos()
  }

  obtenerVehiculos(){
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
         
          alert('Vehículo borrado correctamente');
          location.reload()
        },
        error => {
          console.error('Error al borrar el vehículo:', error);
          alert('Error al borrar el vehículo:')
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
      alert('Error al actualizar el vehículo:')
    }
   )
    this.editingVehicle = null;
  }

  anadirVehiculo() {
  console.log(this.nuevoVehiculo)
    this.apiService.createResource('vehiculos', this.nuevoVehiculo).subscribe(
      (response) => {
        alert('Vehículo añadido correctamente');
        location.reload();
      },
      (error) => {
        console.error('Error al añadir el vehículo:', error);
        alert('Error al añadir el vehículo:')
      }
    );
  }
}
