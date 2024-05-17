import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  constructor(private cartService:CartService) {}

  sayHello() {
    return this.cartService.sayHello()
  }
  ngOnInit(): void {
      this.sayHello()
  }
}
