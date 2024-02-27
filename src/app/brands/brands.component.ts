import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  public resultBrands: Array<any> = [];
  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAllBrands().subscribe((data =>{
      console.log(data)
      this.resultBrands = data.results
    }))
  }
}
