import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content?: string;
  users = [
    { name: 'Michael Holz', dateCreated: '04/10/2013', role: 'Admin', status: 'Active', photo: 'assets/default.png' },
    { name: 'Paula Wilson', dateCreated: '05/08/2014', role: 'Publisher', status: 'Active', photo: 'assets/default.png' },
    { name: 'Antonio Moreno', dateCreated: '11/05/2015', role: 'Publisher', status: 'Suspended', photo: 'assets/default.png'},
    { name: 'Mary Saveley', dateCreated: '06/09/2016', role: 'Reviewer', status: 'Active', photo: 'assets/default.png' },
    { name: 'Martin Sommer', dateCreated: '12/08/2017', role: 'Moderator', status: 'Inactive', photo: 'assets/default.png' }
  ];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    });
  }
}
