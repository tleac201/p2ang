import { Component, OnInit } from '@angular/core';
import { PizzaAPIService } from '../Service/pizza-api.service';
import { ShoppingCartItem } from '../standardproduct-api/standardproduct-api.component';

@Component({
  selector: 'app-shoppingcart-api',
  templateUrl: './shoppingcart-api.component.html',
  styleUrls: ['./shoppingcart-api.component.css']
})
export class ShoppingcartApiComponent implements OnInit {

  constructor(private Service: PizzaAPIService) { }
  ShoppingCartItems : ShoppingCartItem[]
  
  ngOnInit() {
    
  }

}
