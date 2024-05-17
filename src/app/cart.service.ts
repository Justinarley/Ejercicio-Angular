import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  additem(item: any) {
    throw new Error('Method not implemented.');
  }
  sayHello() {
    console.log('Hello');
  }
  getProducts() {
    return [ 'Chocolate' , 'Cookie' , 'Dulce de leche'];
  }

  private apiUrl = 'http://api.myecommerce.com';

  constructor(private http:HttpClient) {}

  getItems(): Observable<any[]>{
  const url = `${this.apiUrl}/cart/items`;
  return this.http.get<any[ ]>(url);
  }
  addItems(item: any): Observable<any> {
  const url = `${this.apiUrl}/cart/add`;
  return this.http.post(url,item);
  }
  removeItem(id: number): Observable<any> {
    const url = `${this.apiUrl}/cart/delete/${id}`;
    return this.http.delete<void>(url);
  }
  clearCart(): Observable<any> {
    const url = `${this.apiUrl}/cart/clear`;
    return this.http.delete<void>(url);
  }
}
