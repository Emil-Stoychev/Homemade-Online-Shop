import { Component } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog/catalog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public products = [] as any;

  constructor(private catalogService: CatalogService) {}

  ngOnInit() {
    this.catalogService.getProducts().subscribe(data => this.products = data.slice(0, 3)
    );
  }
}
