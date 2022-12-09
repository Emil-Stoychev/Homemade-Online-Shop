import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  public errors: any = {};
  public isAuthor: boolean = false;
  public isLiked: boolean = false;
  public isVisible: boolean = false;
  public deleteBtn: boolean = false;
  public isCommentEdit: boolean = false;
  public buyBtn: boolean = false;

  public commentForm = new FormGroup({
    comment: new FormControl(''),
  });

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

      console.log(data);

      this.isAuthor = data?.author == this.appComponent.userFromToken._id;
      this.isLiked = data?.likes.includes(this.appComponent.userFromToken._id);

      if (this.isAuthor) {
        this.isVisible = data?.visible;
      }
    });
  }

  onCommentSubmit(commentForm: any) {
    if (commentForm.comment != '') {
      let commentData = {
        token: this.appComponent?.sessionStorage,
        email: this.appComponent?.userFromToken?.email,
        title: commentForm.comment,
        authorId: this.appComponent?.userFromToken?._id,
        productId: this.product?._id,
      };

      this.catalogService.addCommentToProduct(commentData).subscribe((res) => {
        this.product.comments.push(res);

        this.commentForm.setValue({ comment: '' });
      });
    }
  }

  likeComment(commentId: string) {
    this.appComponent.userFromToken.token = this.appComponent.sessionStorage;

    let data = {
      commentId,
      cookie: this.appComponent.userFromToken,
    };

    this.catalogService.likeComment(data).subscribe((res: any) => {
      if (!res.message) {
        this.product.comments = this.product.comments.map((x: any) => {
          if (x._id == commentId) {
            if (res == 'like') {
              x.likes.push(this.appComponent.userFromToken._id);

              return x;
            } else if (res == 'unlike') {
              x.likes = x.likes.filter(
                (x: any) => x != this.appComponent.userFromToken._id
              );

              return x;
            }
          } else {
            return x;
          }
        });
      }
    });
  }

  likeNestedComment(commentData: any) {
    this.appComponent.userFromToken.token = this.appComponent.sessionStorage;

    let data = {
      commentId: commentData.nestedComment?._id,
      cookie: this.appComponent.userFromToken,
    };

    this.catalogService.likeComment(data).subscribe((res: any) => {
      if (!res.message) {
        this.product.comments = this.product.comments.map((x: any) => {
          if (x._id == commentData?.comments?._id) {
            if (res === 'like') {
              x.nestedComments = x.nestedComments.map((x: any) => {
                if (x._id == commentData?.nestedComment?._id) {
                  x.likes.push(this.appComponent.userFromToken._id);
                }

                return x;
              });

              return x;
            } else {
              x.nestedComments = x.nestedComments.map((x: any) => {
                if (x._id == commentData?.nestedComment?._id) {
                  x.likes = x.likes.filter((x: any) => x != this.appComponent.userFromToken._id);
                }

                return x;
              });

              return x;
            }
          } else {
            return x;
          }
        });
      }
    });
  }

  editComment(e: any) {
    console.log(e.currentTarget.parentElement.parentElement.childNodes[2]);

    this.isCommentEdit = true
  }

  changeStatusHandler(productId: string) {
    this.isVisible = !this.isVisible;

    let data = {
      productId,
      cookie: {
        token: this.appComponent.sessionStorage,
      },
    };

    this.catalogService.changeProductStatus(data).subscribe(console.log);
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

  onBuyHandler() {
    let id = this.route.snapshot.params['id'];
    let cookie = this.appComponent.userFromToken;
    cookie.token = this.appComponent.sessionStorage;

    this.catalogService
      .buyProduct({ productId: id, cookie })
      .subscribe((res: any) => {
        if (!res?.message) {
          this.buyBtn = false;

          this.product = res;

          this.isAuthor = res?.author == this.appComponent.userFromToken._id;
          this.isLiked = res?.likes.includes(
            this.appComponent.userFromToken._id
          );

          if (this.isAuthor) {
            this.isVisible = res?.visible;
          }
        } else {
          if (!this.errors.message) {
            this.errors = res;

            setTimeout(() => {
              this.errors = {};
            }, 3000);
          }
        }
      });
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
