import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { WizardComponent } from './pages/wizard/wizard.component';
import { WizardMakerComponent } from './shared/components/features/shipping-label-maker/wizard-maker.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { StepFormSelectorComponent } from './shared/components/features/step-form-selector/step-form-selector.component';
import { AuthService } from './core/authentication/auth.service';
import { AuthGuardService } from './core/authentication/auth-guard';
import { HttpService } from './core/services/http.service';

describe('AppComponent', () => {
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
        AppComponent,
        LoginComponent,
        WizardComponent,
        WizardMakerComponent,
        HeaderComponent,
        StepFormSelectorComponent        
      ],
      providers: [
        AuthService, 
        AuthGuardService,
        HttpService
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
