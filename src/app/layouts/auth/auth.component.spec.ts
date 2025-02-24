import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AuthComponent } from "./auth.component";
import { SharedModule } from "../../core/shared/shared.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AuthService } from "../../core/service/auth.services";

describe('AuthComponent', () => {
    let component: AuthComponent;
    let fixture: ComponentFixture<AuthComponent>;
    let authService: AuthService

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AuthComponent],
            imports: [SharedModule, BrowserAnimationsModule],
        }).compileComponents();

        fixture = TestBed.createComponent(AuthComponent)
        component = fixture.componentInstance;
        authService = TestBed.inject(AuthService);

        fixture.detectChanges();
    });

    it('El campo email debe ser requerido', () => {
        const control = component.loginForm.get('email');
        control?.setValue('');
        expect(control?.hasError('required')).toBeTrue();
    });

    it('El campo password debe ser requerido', () => {
        const control = component.loginForm.get('password');
        control?.setValue('');
        expect(control?.hasError('required')).toBeTrue();
    })

    it('Debe llamar markAllAsTouched de loginForm al llamar login() si el formulario es válido', () => {
        component.loginForm.setValue({
            email: '',
            password: ''
        });
        expect(component.loginForm.invalid).toBeTrue();

        const spyOnMarkAllAsTouched = spyOn(component.loginForm, 'markAllAsTouched');
        component.login();
        expect(spyOnMarkAllAsTouched).toHaveBeenCalled();
    });

    it('Debe llamar al authService.login si el formulario es válido al llamar a login ()', () => {
        component.loginForm.setValue({
            email: 'nahuelfons@gmail.com',
        });
        expect(component.loginForm.valid).toBeTrue();

        const spyOnLogin = spyOn(authService, 'login')
        component.login();
        expect(spyOnLogin).toHaveBeenCalled();
    })
});