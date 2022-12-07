import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CatalogService } from 'src/app/services/catalog/catalog.service';
import { DetailsProductService } from 'src/app/services/catalog/details/detailsProduct.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  public product = [] as any;
  public imageCount: number = 0;
  public isAuthor: boolean = false;
  public isLiked: boolean = false;
  public isVisible: boolean = false;
  public deleteBtn: boolean = false;

  constructor(
    private detailsProduct: DetailsProductService,
    private router: Router,
    private route: ActivatedRoute,
    public appComponent: AppComponent,
    private catalogService: CatalogService
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.params['id'];

    this.detailsProduct.getProducts(id).subscribe((data: any) => {
      this.product = data;

      this.isAuthor = data?.author == this.appComponent.userFromToken._id;
      this.isLiked = data?.likes.includes(this.appComponent.userFromToken._id);

      if (this.isAuthor) {
        this.isVisible = data?.visible;
      }
    });
  }

  changeStatusHandler(productId: string) {
    this.isVisible = !this.isVisible;

    let data = {
      productId,
      cookie: {
        token: this.appComponent.sessionStorage,
      },
    };

    this.catalogService.changeProductStatus(data);
  }

  onLikeHandler(productId: string) {
    this.catalogService
      .likeProduct({
        productId,
        token: this.appComponent.sessionStorage,
        userId: this.appComponent.userFromToken._id,
      })
      .subscribe((res: any) => {
        if (!res?.message) {
          this.isLiked = true;

          this.product.likes.push(this.appComponent.userFromToken._id);
        }
      });
  }

  onUnLikeHandler(productId: string) {
    this.catalogService
      .unlikeProduct({
        productId,
        token: this.appComponent.sessionStorage,
        userId: this.appComponent.userFromToken._id,
      })
      .subscribe((res: any) => {
        if (!res?.message) {
          this.isLiked = false;

          this.product.likes = this.product.likes.filter(
            (x: string) => x != this.appComponent.userFromToken._id
          );
        }
      });
  }

  onEditHandler(id: string) {
    this.router.navigate(['catalog/edit/' + id]);
  }

  onDeleteHandler() {
    let id = this.route.snapshot.params['id'];
    let cookie = this.appComponent.userFromToken;
    cookie.token = this.appComponent.sessionStorage;

    this.catalogService
      .deleteProduct({ productId: id, cookie })
      .subscribe((res: any) => {
        if (!res?.message) {
          this.router.navigate(['/ownProducts']);
        }
      });
  }

  nextImage = () => {
    if (this.imageCount > this.product?.images.length - 2) {
      this.imageCount = 0;
    } else {
      this.imageCount++;
    }
  };

  previousImage = () => {
    if (this.imageCount < 1) {
      this.imageCount = this.product?.images.length - 1;
    } else {
      this.imageCount--;
    }
  };
}
