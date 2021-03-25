import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CartService } from '../cart.service';
import { ProductsService, Product } from '../products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
   product!:Product;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productsService: ProductsService,
  ) {}

  ngOnInit(): void {
    // get product id from current route
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));

    // find corresponding product from route
    this.productsService.initialise().then(products => {
      this.productsService.addProducts(products);
      this.product = this.productsService.getProduct({id: productIdFromRoute}) as Product;
    });
  }
  addToCart(product: Product): void {
    this.cartService.addItem(product);
    window.alert(`Your ${product.name} has been added to the cart!`);
  }

}
