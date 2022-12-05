import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public res = [] as any;

  constructor(private router: Router, private userService: UserService, public appComponent: AppComponent) {}

  goToRegister() {
    this.router.navigate(['/register']);
  }

  onSubmit(userForm: object) {
    
    this.userService.login(userForm).subscribe((data) => {
      this.res = data;
      
      if (!this.res.message) {
        localStorage.setItem('sessionStorage', this.res);
        this.appComponent.sessionStorage = this.userService.getToken()
        this.appComponent.userFromToken = this.userService.jwtDecode(localStorage.getItem('sessionStorage') as string)

        this.router.navigate(['/catalog']);
      }
    });
  }
}
