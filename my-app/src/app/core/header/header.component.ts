import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  
  constructor(private router: Router, public appComponent: AppComponent) {}
  
  ngOnInit() {
    this.appComponent.sessionStorage = localStorage.getItem('sessionStorage');
  }

  logoutHandler = () => {
    this.appComponent.sessionStorage = ''
    localStorage.removeItem('sessionStorage')

    this.router.navigate(['/login'])
  }
}
