import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShippingInfo } from 'src/app/shared/models/shipping-info';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {

  title = "Shipping Label Maker"
  
  wizardData: ShippingInfo = new ShippingInfo();

  step_form = [
    {
      title: 'Enter the sender address (Step 1)',
      dataFrom: 'from'     
    },
    {
      title: 'Enter the receiver address (Step 2)',
      dataFrom: 'to'
    },
    {
      title: 'Enter weight (Step 3)',
    },
    
    {
      title: 'Enter shipping options (Step 4)',
    },
    {
      title: 'Confirm(Calculate Shipping Cost) (Step 5)'      
    }    
  ]

  start_step = 1  

  orig_step_form = Object.assign({}, this.step_form)

  constructor(private router: Router,
              private auth: AuthService,
              private http: HttpService) {}

  ngOnInit() {}   
  
  get user() {
    return this.auth.getUserName();
  }

  setFormData(formData:object) {
    let from = formData['dataFrom']
    let step = formData['step']

    delete formData['dataFrom']
    delete formData['step']

    if(from == 'from'){
      this.wizardData.from = {
        ...this.wizardData.from,
        ...formData
      }
    } else if(from == 'to') {
      this.wizardData.to = {
        ...this.wizardData.to,
        ...formData
      }
    } else {
      this.wizardData = {
        ...this.wizardData,
        ...formData
      }
    }

    this.step_form[step] = {
      ...this.step_form[step],
      ...formData
    }
  }

  signOut(){
    this.auth.logout()        
        .subscribe((res) => res ? this.router.navigate(['/login']) : '')
  }

  calculateShippingCost() {
    let step = (this.step_form.length - 1)
    const shippingRate = 0.40
    let shippingCost = this.wizardData.weight * shippingRate *
      (this.wizardData.shippingOption === this.wizardData.shippingOption ? 1 : 1.5)      

    this.step_form[step] = {
      ...this.step_form[step],
      ...{shippingCost:shippingCost}
    }      
  }

  complete() {
    Object.assign(this.step_form, this.orig_step_form) //reset form data    
    this.http
        .sendData(this.wizardData)
        .subscribe(() => console.log('Shipping data has been submitted succsessfully'))
  }
}