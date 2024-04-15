import { Component } from '@angular/core';
import { IUsers } from './models';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  displayedColumns: string[] = ['name', 'englishLevel', 'email', 'createdAt', 'actions'];

  users: IUsers[] = [
    {
      id: 1,
      firstName: 'Nahuel',
      lastName: 'Fons',
      englishLevel: 'B1',
      email: 'nahuelfons@gmail.com',
      createdAt: new Date()
    }
  ]

  constructor(private matDialog: MatDialog) {}
  
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
