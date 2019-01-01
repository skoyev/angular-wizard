import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { AuthGuardService } from 'src/app/core/authentication/auth-guard';
import { HttpService } from 'src/app/core/services/http.service';
import { WizardComponent } from '../wizard/wizard.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { StepFormSelectorComponent } from 'src/app/shared/components/features/step-form-selector/step-form-selector.component';
import { WizardMakerComponent } from 'src/app/shared/components/features/shipping-label-maker/wizard-maker.component';
import { Routes } from '@angular/router';
import { DebugElement } from '@angular/core';

describe('LoginComponent', () => {
  let login: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: HTMLElement;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule        
      ],
      declarations: [
        LoginComponent,
        WizardComponent,
        HeaderComponent,
        WizardMakerComponent,
        StepFormSelectorComponent
      ],      
      providers: [
        AuthService, 
        AuthGuardService,
        HttpService
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LoginComponent);
      login = fixture.debugElement.componentInstance;
    });
  }));

  it('should create the login component', () => {    
    expect(login).toBeTruthy();
  });

  it(`login label title should have as title 'Shipping Label Maker Login'`, () => {
    fixture.detectChanges();
    const login = fixture.debugElement.nativeElement;
    expect(login.querySelector('h3').textContent).toEqual('Shipping Label Maker Login');
  });

  it(`form should be invalid`, () => {
    login.form.controls['username'].setValue('');
    login.form.controls['password'].setValue('');

    expect(login.form.valid).toBeFalsy();

    login.form.controls['username'].setValue('T2');
    login.form.controls['password'].setValue('T2');

    expect(login.form.valid).toBeFalsy();
  });

  it(`form should valid`, () => {
    login.form.controls['username'].setValue('T1235');
    login.form.controls['password'].setValue('qwert');

    expect(login.form.valid).toBeTruthy();
  });

  it(`should not call login method`, () => {
    fixture.detectChanges();
    spyOn(login, 'login');

    login.form.controls['username'].setValue('Us');
    login.form.controls['password'].setValue('Us');

    let el = fixture.debugElement.query(By.css('input[value="Login"]')).nativeElement;
    el.click();

    expect(login.login).toHaveBeenCalledTimes(0);
  });

  it(`should call login method and have user logged in data available.`, () => {
    expect(login.form.valid).toBeFalsy();

    login.form.controls['username'].setValue('Usr123');
    login.form.controls['password'].setValue('Usr123');

    let el = fixture.debugElement.query(By.css('input[name="username"]')).nativeElement;

    login.login();

    setTimeout(() => {
      let userName = localStorage.getItem('userName');
      expect(el.value).toBe(userName);  
    }, 4000);
  });
});
