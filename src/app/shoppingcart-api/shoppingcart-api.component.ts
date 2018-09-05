import { Component, OnInit } from '@angular/core';
import { PizzaAPIService, ShoppingCartViewModel, StandardProducts } from '../Service/pizza-api.service';
import { ShoppingCartItem } from '../standardproduct-api/standardproduct-api.component';

@Component({
  selector: 'app-shoppingcart-api',
  templateUrl: './shoppingcart-api.component.html',
  styleUrls: ['./shoppingcart-api.component.css']
})
export class ShoppingcartApiComponent implements OnInit {

  constructor(private Service: PizzaAPIService) { }
  ShoppingCartItems : ShoppingCartItem[]
  ShoppingCart : ShoppingCartViewModel;
  SPs: StandardProducts[];
  //CPs: CustomPizzas[]


  ngOnInit() {
    this.Service.getCart().subscribe( response => {
      this.ShoppingCart = response;
    });/*
    for(let item of this.ShoppingCart.Items)
    {
      let sp : StandardProducts;
      this.Service.getStandardProduct(item.Id).
        subscribe(item => sp = item);
      this.SPs.push(sp);
    }*/
    this.ShoppingCart.Price
  }
}

