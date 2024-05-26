import { Component, OnDestroy, OnInit } from '@angular/core';
import { InscriptionsService } from './inscriptions.service';
import { ICreateInscriptionPayload, IInscription, IInscriptionForm } from './models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../courses/courses.service';
import { ICourse } from '../courses/models';
import { UsersService } from '../users/users.service';
import { IUsers } from '../users/models';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { selectInscriptionList, selectInscriptionsError, selectLoadingInscriptions } from './store/inscription.selectors';
import { InscriptionActions } from './store/inscription.actions';
import { Observable, Subscription, catchError, finalize } from 'rxjs';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss'
})
export class InscriptionsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'englishLevel', 'email', 'course', 'actions'];
  courses: ICourse[] = [];
  users: IUsers[] = [];

  inscriptionForm = new FormGroup<IInscriptionForm>({
    user: new FormControl(null),
    course: new FormControl(null),
  })

  inscriptionesSubscriptions?: Subscription;
  loadingInscriptions$: Observable<boolean>;
  error$: Observable<unknown>;
  inscriptions$: Observable<IInscription[]>

  constructor(
    private inscriptionService: InscriptionsService, 
    private coursesService: CoursesService,
    private usersService: UsersService,
    private store: Store) {
      this.loadingInscriptions$ = this.store.select(selectLoadingInscriptions);
      this.error$ = this.store.select(selectInscriptionsError);
      this.inscriptions$ = this.store.select(selectInscriptionList)
  }

  ngOnInit(): void {
    this.loadInscriptions();
    this.loadCourses();
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      }
    })
  }

  loadCourses() {
    this.coursesService.getCourses().subscribe({
      next: (v) => (this.courses = v),
    })
  }

  loadInscriptions() {
    this.store.dispatch(InscriptionActions.loadInscriptions())
  }

  createInscription(): void {
    const { user, course } = this.inscriptionForm.value;
    if (!user || !course) {
      return;
    }
    this.store.dispatch(InscriptionActions.createInscriptions({ payload: { user, course } }));
  }

  deleteInsciptionById(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#d33',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(InscriptionActions.deleteInscriptionsById({ id }));
      }
    });
  }


}
