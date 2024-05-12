import { TestBed } from "@angular/core/testing"
import { AuthService } from "./auth.services"
import { Router } from "@angular/router";
import { AuthComponent } from "../../layouts/auth/auth.component";

describe('AuthService', () =>   {
    let authService: AuthService;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthService],
        })

        authService = TestBed.inject(AuthService)
        router = TestBed.inject(Router)
    })

    it('Debe establecer un usuario autenticado al llamar login', () => {
        const spyOnSetItem = spyOn(localStorage, 'setItem')
        const spyOnNavigate = spyOn(router, 'navigate')

        authService.login({
            email: 'nahuelfons@gmail.com',
            password: '123123',
        })
        authService.authUser$.subscribe({
            next: (authUser) => {
                expect(authUser).toBeTruthy();
                expect(spyOnSetItem).toHaveBeenCalled();
                expect(spyOnNavigate).toHaveBeenCalled();
            }
        })
    })

    it('Debe mostrar un alert si los datos no coinciden en el login', () => {
        const spyOnAlert = spyOn(window, 'alert')

        authService.login({
            email: 'fff',
            password: 'fff',
        })
        expect(spyOnAlert).toHaveBeenCalledWith('Correo o password incorrectos');
    })

})