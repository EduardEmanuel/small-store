import { Component, Input, OnInit } from '@angular/core';

import { Product, ProductsService} from '../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products!: Array<Product>

  constructor(
    private productsService: ProductsService,
  ) { var products = productsService.getProducts();
    productsService.initialise().then(products =>
      productsService.addProducts(this.products = ([] as Array<Product>).concat(products)));
  }
  ngOnInit(): void {}
  share(product: Product): void {
    window.alert(`The ${product.name} has been shared!`);
  }
  onNotify(product: Product): void {
    window.alert(`You will be notified when ${product.name} goes on sale!`);
  }

}
