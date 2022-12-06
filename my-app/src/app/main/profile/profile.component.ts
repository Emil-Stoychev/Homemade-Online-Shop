import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public profile: any;
  public isDelete: boolean = false;
  public backupImage =
    'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png';

  constructor(
    private router: Router,
    public appComponent: AppComponent,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService
      .getProfile(this.appComponent.sessionStorage)
      .subscribe((data) => (this.profile = data));
  }

  clickOnwProductHandler() {
    this.router.navigate(['/ownProducts']);
  }

  clickLikedProductsHandler() {
    this.router.navigate(['/likedProducts']);
  }

  onDeleteHandler($event: any) {
    let inputText = $event.target.parentElement.childNodes[1].value;

    if (inputText == this.appComponent.userFromToken.email) {
      this.userService
        .deleteProfile(this.profile?._id, {
          cookie: {
            token: this.appComponent.sessionStorage,
            _id: this.appComponent.userFromToken._id,
          },
        })
        .subscribe((res: any) => {
          if (!res.message) {
            this.appComponent.sessionStorage = '';
            this.appComponent.userFromToken = '';
            localStorage.removeItem('sessionStorage')

            this.router.navigate(['/register']);
          }
        });
    } else {
      console.log('Wrong email');
    }
  }
}
