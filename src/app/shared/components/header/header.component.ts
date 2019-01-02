import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.states';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() user: User;
  @Input() title: string;
  @Output() signOutAction = new EventEmitter<any>();
  
  constructor(private router: Router) {   
  }
            
  ngOnInit() {
  }
            
  signOut(){
    this.signOutAction.emit()   
  }
}