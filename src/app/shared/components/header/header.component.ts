import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() user: string;
  @Output() signOutAction = new EventEmitter<any>();
  
  constructor(private router: Router) {}

  ngOnInit() {}   
  
  signOut(){
    this.signOutAction.emit()   
  }
}