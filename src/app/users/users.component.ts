import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  public resultsUsers: Array<any> = []

  constructor(public usersService : UsersService) {}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(data => {
      this.resultsUsers = data.results
    })
  }
}
