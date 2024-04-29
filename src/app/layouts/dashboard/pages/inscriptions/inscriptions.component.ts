import { Component, OnInit } from '@angular/core';
import { InscriptionsService } from './inscriptions.service';
import { ICreateInscriptionData, IInscription, IInscriptionForm } from './models';
import { FormControl, FormGroup } from '@angular/forms';
import { CoursesService } from '../courses/courses.service';
import { ICourse } from '../courses/models';
import { UsersService } from '../users/users.service';
import { IUsers } from '../users/models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss'
})
export class InscriptionsComponent implements OnInit{
  displayedColumns: string[] = ['name', 'englishLevel', 'email', 'enrolled', 'actions'];
  inscriptions: IInscription[] = [];
  courses: ICourse[] = [];
  users: IUsers[] = [];

  inscriptionForm = new FormGroup<IInscriptionForm>({
    enrolled: new FormControl(null),
    course: new FormControl(null),
  })

  constructor(
    private inscriptionService: InscriptionsService, 
    private coursesService: CoursesService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.loadInscriptions();
    this.loadCourses();
    this.loadUsers();
  }

  createInscription() {
    this.inscriptionService.createInscriptions(this.inscriptionForm.getRawValue()).subscribe({
      next: (inscriptions) => {
        this.inscriptions = inscriptions;
        this.inscriptionForm.reset();
      }
    })
  }

  loadUsers() {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      }
    })
  }

  loadCourses() {
    this.courses = this.coursesService.getCourses()
  }

  loadInscriptions() {
    this.inscriptionService.getInscriptions().subscribe ({
      next: (inscriptions) => {
        this.inscriptions = inscriptions;
      },
      error: () => {},
      complete: () => {},
    });
  }

  onDeleteInscription(id: number): void {
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
        this.inscriptionService.deleteInscription(id).subscribe({
          next: (inscriptions) => {
            this.inscriptions = inscriptions;
          },
          error: (error) => {
          }
        });
      }
    })
  }

}
