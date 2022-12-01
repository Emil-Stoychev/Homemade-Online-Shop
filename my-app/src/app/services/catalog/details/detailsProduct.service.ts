import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class DetailsProductService {

  private URL: string = 'http://localhost:3030/catalog/details/:id'

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.URL)
  }
}
