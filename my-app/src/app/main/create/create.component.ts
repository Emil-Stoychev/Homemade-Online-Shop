import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogService } from 'src/app/services/catalog/catalog.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  public errors: any;
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
    createForm.images = this.allImages
    createForm.cookie = {}
    createForm.cookie.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmVhOTI0NDc4MGMyZTQ0OWFiZTZmNGQiLCJlbWFpbCI6ImFzZEBhYnYuYmciLCJtb25leSI6OTEsImlhdCI6MTY3MDA2OTM3NSwiZXhwIjoxNjcwMjQyMTc1fQ.D6tqGANL-aH1w11trvjyA17C5C4wAenaqoChWLOqyn0'
    createForm.email = 'asd@abv.bg'
    createForm.author = '62ea9244780c2e449abe6f4d'
    createForm.cookie._id = '62ea9244780c2e449abe6f4d'
    console.log(createForm);

    this.catalogService.createProduct(createForm).subscribe((data) => {
      this.res = data
      console.log(data);

      if(!this.res.message) {
        this.errors = []
        this.router.navigate(['/catalog']);
      } else {
        this.errors = data
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
            if (this.errors.message !== 'This image already exist!') {
                this.errors.message = 'This image already exist!'

                setTimeout(() => {
                  this.errors = []
                }, 2000);
            }
        } else {
            if(this.allImages.length > 5) {
                if (this.errors.message !== 'You cannot upload more than 6 images!') {
                  this.errors.message = 'You cannot upload more than 6 images!'

                    setTimeout(() => {
                      this.errors = []
                    }, 2000);
                }
            } else {
              this.allImages.push(imageData)
            }
        }
    } else {
        if (this.errors.message !== 'File must be a image!') {
          this.errors.message = 'File must be a image!'

            setTimeout(() => {
              this.errors = []
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
