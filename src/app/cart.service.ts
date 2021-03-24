import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from './products.service';

export interface Shipping {
  // Tells Typescript that a string index on account would return a string OR a number OR undefined
  [key: string]: string | number;

  type: string,
  price: number,
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Array<Product> = [];

  constructor(
    private http: HttpClient,
  ) {}
  addItem(product: Product): void {
    this.items.push(product)
  }
  removeItem(product: Product): Product | undefined {
    const index: number = this.items.findIndex((p: Product) => p.id === product.id);
         if (index !== -1) {
            let product: Product = this.items[index];

            if (index === 0)
            this.items = this.items.slice(index + 1);
            if (index === this.items.length - 1)
            this.items = this.items.slice(0, index);
            if (index > 0 && index < this.items.length - 1)
            this.items = this.items.slice(0, index).concat(this.items.slice(index + 1));
            return product;
         }
         return undefined;
  }
  getItem(product: any): Product | undefined {
    const {id, name, price, description} = product;
    
    if (typeof id === 'number') return this.items.find((product: Product) => product.id === id);
    if (typeof name === 'string') return this.items.find((product: Product) => product.name === name);
    if (typeof price === 'number') return this.items.find((product: Product) => product.price === price);
    if (typeof description === 'string') return this.items.find((product: Product) => product.description === description);
    return undefined;
  }
  getItems(): Array<Product> {
    var products: Array<Product> = ([] as Array<Product>).concat(this.items);

    return products;
  }
  clear(): Array<Product> {
    var products: Array<Product> = ([] as Array<Product>).concat(this.items);

    this.items = [];
    return products;
  }
  getShippingPrices() {
    return this.http.get<Array<Shipping>>('/assets/shipping.json');
  }
}
