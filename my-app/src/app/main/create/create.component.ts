import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { AppComponent } from 'src/app/app.component';
import { CatalogService } from 'src/app/services/catalog/catalog.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  public createFormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    price: new FormControl(''),
  });

  public errors: any = [];
  public imageTypes: string[] = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/raw',
  ];
  public allImages = [] as any;

  public res = [] as any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private catalogService: CatalogService,
    private appComponent: AppComponent,
    private vps: ViewportScroller
  ) {}

  ngOnInit() {
    this.vps.scrollToPosition([0, 0]);
  }

  onSubmit(createFormGroup: any) {
    let id = this.route.snapshot.params['id'];

    createFormGroup.images = this.allImages;
    createFormGroup._id = id;
    createFormGroup.author = this.appComponent.userFromToken._id;

    let dataForm: any = createFormGroup;

    dataForm.cookie = {
      _id: this.appComponent.userFromToken._id,
      email: this.appComponent.userFromToken.email,
      token: this.appComponent.sessionStorage,
    };

    dataForm.productId = id;

    this.catalogService
      .createProduct(createFormGroup)
      .subscribe((data: any) => {
        this.res = data;

        if (!this.res.message) {
          this.errors = [];
          this.router.navigate(['/catalog/details/' + data?._id]);
        } else {
          this.errors = data;
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

      if (
        this.allImages.some((x: any) => x.dataString == imageData.dataString)
      ) {
        if (this.errors.message !== 'This image already exist!') {
          this.errors.message = 'This image already exist!';

          setTimeout(() => {
            this.errors = [];
          }, 2000);
        }
      } else {
        if (this.allImages.length > 5) {
          if (this.errors.message !== 'You cannot upload more than 6 images!') {
            this.errors.message = 'You cannot upload more than 6 images!';

            setTimeout(() => {
              this.errors = [];
            }, 2000);
          }
        } else {
          this.allImages.push(imageData);
        }
      }
    } else {
      if (this.errors.message !== 'File must be a image!') {
        this.errors.message = 'File must be a image!';

        setTimeout(() => {
          this.errors = [];
        }, 2000);
      }
    }

    e.value = null;
  }

  removeImage = (e: any) => {
    let currImage = e.parentElement.childNodes[0].src;

    this.allImages = this.allImages.filter(
      (x: any) => x.dataString != currImage
    );
  };

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
