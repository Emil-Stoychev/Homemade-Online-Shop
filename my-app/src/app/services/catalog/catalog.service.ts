import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private URL: string = `${window.location.protocol}//${window.location.hostname}:3030/`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.URL + 'catalog');
  }

  createProduct(data: object): Observable<IProduct[]> {
    return this.http.post<IProduct[]>(this.URL + 'catalog/create', data);
  }

  addCommentToProduct(data: object) {
    return this.http.post(this.URL + 'catalog/addComment', data);
  }

  editComment(data: any) {
    return this.http.put(this.URL + 'catalog/editComment/' + data?.commentId, data)
  }

  deleteComment(data: any) {
    return this.http.delete(this.URL + 'catalog/' + data?.option + '/' + data?.commentId, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  replyToComment(data: any) {
    return this.http.put(this.URL + 'catalog/addReplyComment/' + data?.commentId, data)
  }

  likeComment(data: any) {
    return this.http.put(this.URL + 'catalog/likeComment/' + data?.commentId, data)
  }

  editProduct(data: any): Observable<IProduct[]> {
    return this.http.put<IProduct[]>(
      this.URL + 'catalog/edit/' + data?.productId,
      data
    );
  }

  likeProduct(data: any) {
    return this.http.put(
      this.URL + 'catalog/addProductLikes/' + data?.productId,
      data
    );
  }

  changeProductStatus(data: any) {
    return this.http.put(
      this.URL + 'catalog/changeProductStatus/' + data?.productId,
      data.cookie
    );
  }

  buyProduct(data: any) {
    return this.http.put(
      this.URL + 'catalog/changeProductAuthor/' + data?.productId,
      data
    );
  }

  deleteProduct(data: any) {
    return this.http.delete(this.URL + 'catalog/delete/' + data?.productId, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  unlikeProduct(data: any) {
    return this.http.put(
      this.URL + 'catalog/removeProductLikes/' + data?.productId,
      data
    );
  }

  getOwnProducts(id: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.URL + 'users/ownProducts/' + id);
  }

  getLikedProducts(id: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.URL + 'users/likedProducts/' + id);
  }
}
