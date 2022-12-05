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
  public errors: any = [];

  constructor(
    private userService: UserService,
    private appComponent: AppComponent,
    private catalogService: CatalogService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService
      .getProfile(this.appComponent.sessionStorage)
      .subscribe((data: any) => {
        this.catalogService
          .getLikedProducts(data._id)
          .subscribe((data: any) => {
            if (data?.message) {
              this.errors = data
            } else {
              this.products = data;
            }
          });
      });
  }

  onSelect(id: string) {
    this.router.navigate(['/catalog/details/', id]);
  }
}
