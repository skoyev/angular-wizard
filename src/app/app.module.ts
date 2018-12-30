import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { WizardComponent } from './pages/wizard/wizard.component';
import { WizardMakerComponent } from './shared/components/features/shipping-label-maker/wizard-maker.component';
import { AuthService } from './core/authentication/auth.service';
import { AuthGuardService } from './core/authentication/auth-guard';
import { HttpService } from './core/services/http.service';
import { HeaderComponent } from './shared/components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WizardComponent,
    WizardMakerComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService, 
    AuthGuardService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
