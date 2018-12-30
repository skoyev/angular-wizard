import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { WizardComponent } from './pages/wizard/wizard.component';
import { AuthGuardService } from './core/authentication/auth-guard';

const routes: Routes = [  
  {path: 'login',       component: LoginComponent},
  {path: 'wizard', component: WizardComponent, canActivate:[AuthGuardService]},
  {path: '**',     redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
