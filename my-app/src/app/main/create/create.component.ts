import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogService } from 'src/app/services/catalog/catalog.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  public errors: string = ''
  public imageTypes: string[] = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/raw',
  ];
  public allImages = [] as any;

  public res = [] as any;

  constructor(private router: Router, private catalogService: CatalogService) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit(createForm: any) {
    console.log(createForm);

    // createForm.image = this.allImages[0]?.dataString || ''
    
    // this.catalogService.createProduct(createForm).subscribe((data) => {
    //   // this.res = data
    //   console.log(data);

    //   // if(!this.res.message) {
    //   //   this.router.navigate(['/login']);
    //   // }
    // });
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
