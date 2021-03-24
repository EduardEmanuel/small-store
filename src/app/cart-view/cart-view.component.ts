import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {
  checkoutForm
  
  constructor(
    public cartService: CartService,
    private formBuilder: FormBuilder,
  ) {
    this.checkoutForm = this.formBuilder.group({
      name:"",
      address:"",
    });
  }
  onSubmit(): void {
    console.warn(`Your order has been submitted.`, this.checkoutForm.value, this.cartService.clear());
    this.checkoutForm.reset();
  }
  ngOnInit(): void {
  }

}
