import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsProductService } from 'src/app/services/catalog/details/detailsProduct.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  public product = [] as any;
  public imageCount: number = 0;

  constructor(
    private detailsProduct: DetailsProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.params['id'];

    this.detailsProduct
      .getProducts(id)
      .subscribe((data) => this.product = data);
  }

  nextImage = () => {
    if (this.imageCount > this.product?.images.length - 2) {
      this.imageCount = 0;
    } else {
      this.imageCount++
    }
  };

  previousImage = () => {
    if (this.imageCount < 1) {
      this.imageCount = this.product?.images.length - 1
    } else {
      this.imageCount--
    }
  };
}
