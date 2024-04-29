import { Component, OnInit } from '@angular/core';
import { IUsers } from './models';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import Swal from 'sweetalert2';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'englishLevel', 'email', 'createdAt', 'actions'];
  loading = false;
  users: IUsers[] = []

  constructor(
    private matDialog: MatDialog, 
    private usersService: UsersService) {}

  ngOnInit(): void {
    this.loading = true;    
    this.usersService.getUsers().subscribe({
      next: (users) => {
        console.log('next: ', users); 
        this.users = users;
      },
      error: (err) => {
        console.log('error: ', err);
      },
      complete: () => {
        console.log('complete!');
        this.loading = false;
      }
    })
  }
  
  openDialog(editingUser?: IUsers): void {
    this.matDialog
      .open(UserDialogComponent, {
        data: editingUser,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            if (editingUser) {
              this.users = this.users.map((u) => u.id === editingUser.id ? {...u, ...result} : u)
            } else {
              result.id = new Date().getTime();
              //result.id = new Date().getTime.toString().substring(0,3);
              result.createdAt = new Date();
              this.users = [... this.users, result];
            }
          } 
        }
      })
      
  }

  onDeleteUser(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
      confirmButtonColor: "#d33",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.users = this.users.filter((u) => u.id !== id);
      }
    })
  }


}
