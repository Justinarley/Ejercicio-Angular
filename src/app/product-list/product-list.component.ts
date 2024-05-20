import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent {
  productos: string[] | undefined;
  cartItems: any [] = []; 
   constructor (private cartService:CartService) {}
   ngOnInit() {
    this.productos = this.cartService.getProducts();
    console.log(this.productos);
  }
  // ngClickGet() : void {
  //   this.cartService.getItems().subscribe(items => this.cartItems = items); 
  // }
  // onClickAdd(item : any) : void {
  //   this.cartService.addItems(item).subscribe(items => this.cartItems = items); 
  // }
  // onClickDelete(itemId : any) : void {
  //   this.cartService.removeItem(itemId).subscribe(() => console.log("Removido exitosamente")); 
  // }
  // onClickClear() : void {
  //   this.cartService.clearCart().subscribe(() => console.log("Removido toda la lista exitosamente")); 
  // }
}
