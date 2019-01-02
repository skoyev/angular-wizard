import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { DebugElement } from '@angular/core';
import { LandingComponent } from './landing.component';
import { LogInComponent } from '../log-in/log-in.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { WizardMakerComponent } from '../features/shipping-label-maker/wizard-maker.component';
import { AuthService } from '../../services/auth.service';
import { AuthGuardService } from '../../services/auth-guard.service';
import { Address, ShippingInfo } from '../../models/shipping-info';

describe('WizardComponent', () => {
  let wizard: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  let el: HTMLElement;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule        
      ],
      declarations: [
        LogInComponent,
        LandingComponent,
        HeaderComponent,
        WizardMakerComponent,
      ],      
      providers: [
        AuthService, 
        AuthGuardService,        
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LandingComponent);
      wizard = fixture.debugElement.componentInstance;
    });
  }));

  it('should create the login component', () => {    
    expect(wizard).toBeTruthy();
  });

  it(`should set all steps data successfully'`, () => {
    // step 1 (Sender Address)
    let step1 = {dataFrom: 'from',  name: 'from-name', street: 'from-street', city: 'from-city', state: 'from-state', zip: 'from-zip'};
    wizard.setFormData(step1);

    // step 2 (Receive Address)
    let step2 = {dataFrom: 'to',  name: 'to-name', street: 'to-street', city: 'to-city', state: 'to-state', zip: 'to-zip'};
    wizard.setFormData(step2);

    // step 3 (Weight)
    let step3 = {weight: 100};
    wizard.setFormData(step3);

    // step 4 (Shipping option)
    let step4 = {shippingOption: 1};
    wizard.setFormData(step4);

    let fromAddress = new Address()
    fromAddress.name = 'from-name'
    fromAddress.street = 'from-street'
    fromAddress.city = 'from-city'
    fromAddress.state = 'from-state'
    fromAddress.zip = 'from-zip';

    let toAddress  = new Address();
    toAddress.name = 'to-name'
    toAddress.street = 'to-street'
    toAddress.city = 'to-city'
    toAddress.state = 'to-state'
    toAddress.zip = 'to-zip';

    let expectedWizardData  = new ShippingInfo();
    expectedWizardData.from = fromAddress;
    expectedWizardData.to   = toAddress;
    expectedWizardData.weight = 100;
    expectedWizardData.shippingOption = 1

    expect(JSON.stringify(wizard.wizardData)).toBe(JSON.stringify(expectedWizardData))
  });

  it(`should calculate shipping cost'`, () => {
    // step 1 (Sender Address)
    let step1 = {dataFrom: 'from',  name: 'from-name', street: 'from-street', city: 'from-city', state: 'from-state', zip: 'from-zip'};
    wizard.setFormData(step1);

    // step 2 (Receive Address)
    let step2 = {dataFrom: 'to',  name: 'to-name', street: 'to-street', city: 'to-city', state: 'to-state', zip: 'to-zip'};
    wizard.setFormData(step2);

    // step 3 (Weight)
    let step3 = {weight: 100};
    wizard.setFormData(step3);

    // step 4 (Shipping option)
    let step4 = {shippingOption: 1};
    wizard.setFormData(step4);

    wizard.calculateShippingCost();

    expect(wizard.step_form[4]['shippingCost']).toBe(40)
  });

  it(`should logout'`, () => {
    fixture.detectChanges();
    let h = fixture.debugElement.query(By.css('app-header'));
    spyOn(wizard, 'logOut');

    let el = h.query(By.css('input[type="button"]')).nativeElement;
    el.click();

    expect(wizard.logOut).toHaveBeenCalled();
  });
});
