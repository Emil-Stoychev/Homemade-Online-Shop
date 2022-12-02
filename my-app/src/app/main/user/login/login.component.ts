import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  public res = [] as any;

  constructor(private router: Router, private userService: UserService) {}

  goToRegister() {
    this.router.navigate(['/register']);
  }

  onSubmit(userForm: object) {
    this.userService.login(userForm).subscribe((data) => {
      this.res = data

      if(!this.res.message) {
        this.router.navigate(['/catalog']);
      }
    });
  }
}
