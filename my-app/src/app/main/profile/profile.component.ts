import { ViewportScroller } from '@angular/common';
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
  public isEdit: boolean = false;
  public errors: any = [];
  public backupImage =
    'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png';

  public imageTypes: string[] = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/raw',
  ];
  public allImages = [] as any;

  constructor(
    private router: Router,
    public appComponent: AppComponent,
    private userService: UserService,
    private vps: ViewportScroller
  ) {}

  ngOnInit() {
    this.vps.scrollToPosition([0, 0]);

    this.userService
      .getProfile(
        this.appComponent.sessionStorage ||
          localStorage.getItem('sessionStorage')
      )
      .subscribe((data) => (this.profile = data));
  }

  clickOnwProductHandler() {
    this.router.navigate(['/ownProducts']);
  }

  clickLikedProductsHandler() {
    this.router.navigate(['/likedProducts']);
  }

  onPictureCancelHandler() {
    this.isEdit = false;
    this.allImages = [];
  }

  onPictureSaveHandler() {
    this.isEdit = false;

    if (this.allImages.length > 0) {
      if (this.allImages[0]?.dataString == this.profile.image) {
        return;
      }

      this.appComponent.userFromToken.token = this.appComponent.sessionStorage;

      let data = {
        image: this.allImages[0]?.dataString,
        cookie: this.appComponent.userFromToken,
      };

      this.userService.changePicture(data).subscribe();
    }
  }

  onDeleteHandler($event: any) {
    let inputText =
      $event.target.parentElement.parentElement.childNodes[1].value;

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
            localStorage.removeItem('sessionStorage');

            this.router.navigate(['/register']);
          }
        });
    } else {
      console.log('Wrong email');
    }
  }

  async addImageChangeHandler(e: any) {
    let file = e.files[0];

    if (file && this.imageTypes.includes(file.type)) {
      let base64 = await this.convertBase64(file);

      let newDate = new Date();

      let date = newDate.toLocaleString();

      let imageData = {
        name: file.name,
        type: file.type,
        date,
        dataString: base64,
      };

      this.allImages = [imageData];
    } else {
      if (this.errors !== 'File must be a image!') {
        this.errors = 'File must be a image!';

        setTimeout(() => {
          this.errors = '';
        }, 2000);
      }
    }

    e.value = null;
  }

  convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
}
