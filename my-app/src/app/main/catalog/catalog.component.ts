import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogService } from 'src/app/services/catalog/catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  public products = [] as any;
  public defaultProducts = [] as any;
  public searchProducts = [] as any;
  public toggleSort: boolean = false;

  constructor(
    private catalogService: CatalogService,
    private router: Router,
    private vps: ViewportScroller
  ) {}

  ngOnInit() {
    this.catalogService
      .getProducts()
      .subscribe(
        (data) => ((this.products = data), (this.defaultProducts = data))
      );

    this.vps.scrollToPosition([0, 0]);
  }

  onSelect(id: string) {
    this.router.navigate(['/catalog/details/', id]);
  }

  searchHandler(e: any) {
    let text = e.currentTarget.parentElement.childNodes[0];

    if (text.value.trim() != '' && text.value.length > 0 && text.value != '') {
      this.products = this.defaultProducts;

      let cnt = this.products.filter((x: any) => {
        return x.title.toLowerCase().startsWith(text.value.toLowerCase());
      });

      if (cnt?.length == 0 && text.style.color != 'red') {
        text.style.color = 'red';

        setTimeout(() => {
          text.style.color = 'black';
        }, 1500);
      }

      this.products = cnt;
    } else {
      text.style.color = 'black';
      this.products = this.defaultProducts;
    }
  }

  sortBy(word: string) {
    if (this.products?.length > 1) {
      this.toggleSort = !this.toggleSort;

      this.products = this.products.sort((a: any, b: any) => {
        if (this.toggleSort) {
          return word == 'likes'
            ? a?.[word]?.length - b?.[word]?.length
            : a?.[word] - b?.[word];
        } else {
          return word == 'likes'
            ? b?.[word]?.length - a?.[word]?.length
            : b?.[word] - a?.[word];
        }
      });
    }
  }
}
