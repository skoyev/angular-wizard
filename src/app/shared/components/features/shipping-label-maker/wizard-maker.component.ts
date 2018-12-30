import { 
  Component, 
  OnInit, 
  ContentChildren, 
  QueryList, 
  AfterContentInit, 
  TemplateRef, 
  Input, 
  Output,
  EventEmitter
} from '@angular/core';
import { Router } from '@angular/router';
import { FormStepDirective } from 'src/app/shared/directives/form-step.directive';

@Component({
  selector: 'app-wizard-maker',
  templateUrl: './wizard-maker.component.html',
  styleUrls: ['./wizard-maker.component.css']
})
export class WizardMakerComponent implements AfterContentInit {
  @Input() wizardContext: any;
  @Input() startStep: number;

  @Output() nextAction = new EventEmitter<any>();
  @Output() complete = new EventEmitter<any>();
  @Output() calculateAction = new EventEmitter<any>();

  @ContentChildren(TemplateRef) steps: QueryList<TemplateRef<FormStepDirective>>

  step = 0;
  currentView: TemplateRef<any>

  constructor() {
    this.nextStepHandle = this.nextStepHandle.bind(this)
    this.backStepHandle = this.backStepHandle.bind(this)
    this.finishStepHandle = this.finishStepHandle.bind(this)
    this.calculateNextStepHandle = this.calculateNextStepHandle.bind(this)
  }

  renderForm() {
    this.currentView = this.steps.toArray()[this.step]
  }

  ngAfterContentInit () {
    this.renderForm()
  }

  nextStepHandle(value){
    value.step = this.step;
    this.nextAction.emit(value)   
    this.step++; 
    this.renderForm()
  }

  backStepHandle() {
    this.step--;
    this.renderForm();
  }  

  finishStepHandle(){
    this.complete.emit()
    this.step = 0;
    this.renderForm();    
  }  

  calculateNextStepHandle(value){
    this.nextAction.emit(value)
    this.calculateAction.emit(value) 
    this.step++; 
    this.renderForm()
  }
}