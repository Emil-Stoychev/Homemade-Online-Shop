import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    public appComponent: AppComponent,
    private userService: UserService
  ) {}

  ngOnInit() {
    let token = localStorage.getItem('sessionStorage');

    this.userService.checkUserToken(token).subscribe((res: any) => {
      if (res.message) {
        this.appComponent.sessionStorage = '';
        this.appComponent.userFromToken = '';

        localStorage.removeItem('sessionStorage');
      } else {
        this.appComponent.sessionStorage = localStorage.getItem('sessionStorage');
        this.appComponent.userFromToken = this.userService.jwtDecode(localStorage.getItem('sessionStorage') as string);
      }
    });
  }

  logoutHandler = () => {
    this.appComponent.sessionStorage = '';
    this.appComponent.userFromToken = '';
    localStorage.removeItem('sessionStorage');

    this.router.navigate(['/login']);
  };
}
