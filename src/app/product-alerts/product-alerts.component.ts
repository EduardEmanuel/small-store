import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../products.service';

@Component({
  selector: 'app-product-alerts',
  templateUrl: './product-alerts.component.html',
  styleUrls: ['./product-alerts.component.css']
})
export class ProductAlertsComponent implements OnInit {

  @Input() product!: Product;
  @Output() notify = new EventEmitter();
  isExpensive!: boolean;

  constructor() { }
  ngOnInit(): void {
    this.isExpensive = this.product && this.product.price! > 700;
  }

}
