import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  public sessionStorage: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.sessionStorage = localStorage.getItem('sessionStorage')
  }

  logoutHandler = () => {
    this.sessionStorage = ''
    localStorage.removeItem('sessionStorage')

    this.router.navigate(['/login'])
  }

  
}
