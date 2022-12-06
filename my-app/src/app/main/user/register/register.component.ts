import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public userRegisterGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
  });
  
  public errors: string = ''
  public imageTypes: string[] = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/raw',
  ];
  public allImages = [] as any;

  public res = [] as any;

  constructor(private router: Router, private userService: UserService) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit(userRegisterGroup: any) {
    userRegisterGroup.image = this.allImages[0]?.dataString || ''

    this.userService.register(userRegisterGroup).subscribe((data) => {
      this.res = data

      if(!this.res.message) {
        this.router.navigate(['/login']);
      }
    });
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
      
        if (this.allImages.some((x: any) => x.dataString == imageData.dataString)) {
            if (this.errors !== 'This image already exist!') {
                this.errors = 'This image already exist!'

                setTimeout(() => {
                  this.errors = ''
                }, 2000);
            }
        } else {
            if(this.allImages.length > 0) {
                if (this.errors !== 'You cannot upload more than 1 image!') {
                  this.errors = 'You cannot upload more than 1 image!'

                    setTimeout(() => {
                      this.errors = ''
                    }, 2000);
                }
            } else {
              this.allImages.push(imageData)
            }
        }
    } else {
        if (this.errors !== 'File must be a image!') {
          this.errors = 'File must be a image!'

            setTimeout(() => {
              this.errors = ''
            }, 2000);
        }
    }

    e.value = null
  }

  removeImage = (e: any) => {
    let currImage = e.parentElement.childNodes[0].src

    this.allImages = this.allImages.filter((x: any) => x.dataString != currImage)
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
