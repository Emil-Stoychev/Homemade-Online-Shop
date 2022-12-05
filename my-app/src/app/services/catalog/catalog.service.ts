import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {

  private URL: string = 'http://localhost:3030/'

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.URL + 'catalog')
  }

  createProduct(data: object): Observable<IProduct[]> {
    return this.http.post<IProduct[]>(this.URL + 'catalog/create', data)
  }

  getOwnProducts(id: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.URL + 'users/ownProducts/' +  id)
  }

  getLikedProducts(id: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.URL + 'users/likedProducts/' +  id)
  }
}
