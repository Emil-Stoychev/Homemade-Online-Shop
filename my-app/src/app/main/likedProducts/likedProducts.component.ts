import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CatalogService } from 'src/app/services/catalog/catalog.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-likedProducts',
  templateUrl: './likedProducts.component.html',
  styleUrls: ['./likedProducts.component.css'],
})
export class LikedProductsComponent implements OnInit {
  public products: any = [];
  public emptyProducts: boolean = false;

  constructor(
    private userService: UserService,
    private appComponent: AppComponent,
    private catalogService: CatalogService,
    private router: Router,
    private vps: ViewportScroller
  ) {}

  ngOnInit() {
    this.vps.scrollToPosition([0, 0]);

    let token = localStorage.getItem('sessionStorage');

    this.userService.getProfile(token as string).subscribe((data: any) => {
      this.catalogService.getLikedProducts(data._id).subscribe((data: any) => {
        if (data?.length == 0 || data.message == 'Empty!') {
          this.emptyProducts = true;

          return;
        }

        this.products = data;
      });
    });
  }

  onSelect(id: string) {
    this.router.navigate(['/catalog/details/', id]);
  }
}
