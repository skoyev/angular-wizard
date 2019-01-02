import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState, selectAuthState } from '../../store/app.states';
import { User } from '../../models/user';
import { ShippingInfo } from '../../models/shipping-info';
import { LogOut } from '../../store/actions/auth.actions';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  title = "Shipping Label Maker"
  getState: Observable<any>;
  user:User;
  wizardData: ShippingInfo = new ShippingInfo();
  step_form = [
    {shippingCost: 0, dataFrom: 'from',title: 'Enter the sender address (Step 1)'},
    {shippingCost: 0, dataFrom: 'to',title: 'Enter the receiver address (Step 2)'},
    {shippingCost: 0, title: 'Enter weight (Step 3)'},
    {shippingCost: 0, title: 'Enter shipping options (Step 4)'},
    {shippingCost: 0, title: 'Confirm(Calculate Shipping Cost) (Step 5)'}
  ];
  orig_step_form = Object.assign({}, this.step_form);

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.user = state.user;
    });
  }

  logOut(): void {
    this.store.dispatch(new LogOut);
  }

  get footerTitle() {
    return 'Developed By Sergiy Koyev';
  }  

  setFormData(formData?:object) {
    if(!formData){
      return;
    }

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
    
   this.step_form[step] = Object.assign(this.step_form[step], formData);
  }

  calculateShippingCost() {
    let step = (this.step_form.length - 1)
    const shippingRate = 0.40
    let shippingCost = this.wizardData.weight * shippingRate *
      (this.wizardData.shippingOption === this.wizardData.shippingOption ? 1 : 1.5)      

    this.step_form[step] = {
      ...this.step_form[step],
      ...{shippingCost:Math.round(shippingCost)}
    }      
  }

  complete() {
    Object.assign(this.step_form, this.orig_step_form) //reset form data  
    console.log(`Shipping data: ${JSON.stringify(this.wizardData)} has been created succsessfully`)
  }
}
