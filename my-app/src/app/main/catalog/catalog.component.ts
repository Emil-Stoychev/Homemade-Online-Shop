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
  public togglePrice: boolean = false

  constructor(private catalogService: CatalogService, private router: Router) {}

  ngOnInit() {
    this.catalogService.getProducts().subscribe(data => this.products = data);
  }

  onSelect(id: string) {
    this.router.navigate(['/catalog/details/', id])
  }

  sortBy(word: string) {
    this.togglePrice = !this.togglePrice

    this.products = this.products.sort((a: any, b: any) => {
      if(this.togglePrice) {
        return word == 'likes'? a?.[word]?.length - b?.[word]?.length : a?.[word] - b?.[word]
      } else {
        return word == 'likes'? b?.[word]?.length - a?.[word]?.length : b?.[word] - a?.[word]
      }
    })
  }

}
