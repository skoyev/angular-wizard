import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup
  hasErrors: boolean = false;

  constructor(private router: Router, 
              private auth:AuthService,
              private fb: FormBuilder) {

    this.form = this.fb.group({
      username:['', Validators.compose([Validators.required,  Validators.minLength(3)])],
      password:['', Validators.compose([Validators.required, Validators.minLength(3)])]
    })
  }

  ngOnInit() {
  }

  get f() { return this.form.controls; }

  login() {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    const {username, password} = this.form.value
    const authRes = this.auth.login(username, password);
    this.auth.login(username, password)
        .subscribe((authRes) => {
          if(authRes) {
            this.hasErrors = false
            this.router.navigate(['/wizard']);
          } else {
            this.hasErrors = true
            console.log('Login Error')
          }
      
        })
  }
}
