import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsProductService } from 'src/app/services/catalog/details/detailsProduct.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  public product = [] as any;

  constructor(private detailsProduct: DetailsProductService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id')

    console.log(id);
    

    this.detailsProduct.getProducts().subscribe(data => console.log(data)
    );
  }

}
