import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/components/header/header.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { WizardMakerComponent } from './components/features/shipping-label-maker/wizard-maker.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule        
      ],
      declarations: [
        AppComponent,
        LogInComponent,
        WizardMakerComponent,
        WizardMakerComponent,
        HeaderComponent        
      ],
      providers: [
        AuthService, 
        AuthGuardService
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
