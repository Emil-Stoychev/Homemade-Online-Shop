import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog/catalog.service';

@Component({
  selector: 'app-ownProducts',
  templateUrl: './ownProducts.component.html',
  styleUrls: ['./ownProducts.component.css']
})
export class OwnProductsComponent implements OnInit {

  constructor(private catalogService: CatalogService) { }

  ngOnInit() {

  }

}
