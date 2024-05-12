import { TestBed } from "@angular/core/testing"
import { UsersService } from "./users.service"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { environment } from "../../../../../environments/environment"
import { CreateUserPayload, IUsers } from "./models"

describe('UserService', () => {
    let usersService: UsersService
    let httpTestingController: HttpTestingController

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UsersService],
            imports: [HttpClientTestingModule]
        })
        usersService = TestBed.inject(UsersService)
        httpTestingController = TestBed.inject(HttpTestingController)
    })

    it('getUsers debe realizar una petición GET a API/users', () => {
        usersService.getUsers().subscribe({
            next: (resp) => {
                expect(Array.isArray(resp)).toBeTrue
            }
        })
        httpTestingController.expectOne({
            method: 'GET',
            url: environment.baseAPIURL + '/users' 
        })
    })

    it('createUsers debe ejecutar POST a APU/users', () => {
        const payload: CreateUserPayload = {
            createdAt: new Date(),
            email: 'a@a.a',
            firstName: 'test',
            lastName: 'tester',
            englishLevel: 'A1',
            role: 'ADMIN'
        }
        const mockResp: IUsers = {
            id: 123,
            email: 'a@a.a',
            firstName: 'test',
            lastName: 'tester',
            englishLevel: 'A1',
            role: 'ADMIN',
            createdAt: new Date(),
        }
        usersService.createUsers(payload).subscribe((resp) => {
            expect(resp).toEqual(mockResp)
        })
        httpTestingController.expectOne({
            method: 'POST',
            url: environment.baseAPIURL + '/users' 
        }).flush(mockResp)

    })

})