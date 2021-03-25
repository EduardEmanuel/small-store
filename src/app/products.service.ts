import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Product {
  // Tells Typescript that a string index on account would return a string OR a number OR undefined
  [key: string]: string | number | undefined;

  id: number,
  name?: string,
  price?: number,
  description?: string,
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products!: Array<Product>

 constructor(
   private http: HttpClient,
 ) {}
 initialise() {
   return this.http.get<Array<Product>>('/assets/products.json').toPromise(); 
 }
 addProduct(product:Product): void {
  Array.isArray(this.products) ? this.products.push(product) : (this.products = ([] as Array<Product>)).push(product);
 }
 addProducts(products: Array<Product>): void {
  this.products = Array.isArray(this.products) ? this.products.concat(products) : ([] as Array<Product>).concat(products);
 }
 getProduct(product: any): Product | undefined {
     const {id, name, price, description} = product;
     
     if (Array.isArray(this.products)) {
       console.log(this.products)
      if (typeof id === 'number') return this.products.find((product: Product) => product.id === id);
      if (typeof name === 'string') return this.products.find((product: Product) => product.name === name);
      if (typeof price === 'number') return this.products.find((product: Product) => product.price === price);
      if (typeof description === 'string') return this.products.find((product: Product) => product.description === description);
     }
     return undefined;
 }
 getProducts(): Array<Product> {
   var products:Array<Product> = Array.isArray(this.products) ? ([] as Array<Product>).concat(this.products) : [];

   return products;
 }
 removeProduct(product: Product): Product | undefined {
   if (Array.isArray(this.products)) {
    const index: number = this.products.findIndex((p: Product) => p.id === product.id);

    if (index !== -1) {
      let product: Product = this.products[index];
      
      if (index === 0)
       this.products = this.products.slice(index + 1);
      if (index === this.products.length - 1)
       this.products = this.products.slice(0, index);
      if (index > 0 && index < this.products.length - 1)
       this.products = this.products.slice(0, index).concat(this.products.slice(index + 1));
      return product;
     }
   }
   return undefined;
 }
 removeProducts(): Array<Product> {
  var products:Array<Product> = Array.isArray(this.products) ? ([] as Array<Product>).concat(this.products) : [];

  this.products = [];
  return products;
 }
 modifyProduct(product: Product): Product | undefined {
   if (Array.isArray(this.products)) {
    const index: number = this.products.findIndex((p: Product) => p.id === product.id);
    const keys: Array<string> = Object.keys(product);
  
    if (index !== -1) {
      keys.forEach(key => this.products[index][key] = product[key]);
      return this.products[index];
    }
   }
   return undefined;
 }
 modifyProducts(products: Array<Product>): Array<Product | undefined> {
   var modifiedProducts: Array<Product | undefined>  = [];
   
   products.forEach((product: Product) => modifiedProducts.push(this.modifyProduct(product)))
   return modifiedProducts
 }
}
