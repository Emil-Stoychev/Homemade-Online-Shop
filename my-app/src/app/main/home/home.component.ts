import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogService } from 'src/app/services/catalog/catalog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public products = [] as any;

  constructor(
    private catalogService: CatalogService,
    private router: Router,
    private vps: ViewportScroller
  ) {}

  ngOnInit() {
    this.catalogService
      .getProducts()
      .subscribe((data) => (this.products = data.slice(0, 3)));

    this.vps.scrollToPosition([0, 0]);
  }

  onSelect(id: string) {
    this.router.navigate(['/catalog/details/', id]);
  }
}
