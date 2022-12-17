import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public userLoginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  public res = [] as any;

  constructor(
    private router: Router,
    private userService: UserService,
    public appComponent: AppComponent,
    private vps: ViewportScroller
  ) {}

  ngOnInit() {
    this.vps.scrollToPosition([0, 0]);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  onSubmit(userForm: object) {
    this.userService.login(userForm).subscribe((data) => {
      this.res = data;

      if (!this.res.message) {
        localStorage.setItem('sessionStorage', this.res);
        this.appComponent.sessionStorage = this.userService.getToken();
        this.appComponent.userFromToken = this.userService.jwtDecode(
          localStorage.getItem('sessionStorage') as string
        );

        this.router.navigate(['/catalog']);
      }
    });
  }
}
