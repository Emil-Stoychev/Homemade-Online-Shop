/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DetailsProductService } from './detailsProduct.service';

describe('Service: DetailsProduct', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetailsProductService]
    });
  });

  it('should ...', inject([DetailsProductService], (service: DetailsProductService) => {
    expect(service).toBeTruthy();
  }));
});
