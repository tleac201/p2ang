import { Component, OnInit } from '@angular/core';
import { StandardProducts } from '../service/pizza-api.service';
import { PizzaAPIService } from '../service/pizza-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-standardproduct-api',
  templateUrl: './standardproduct-api.component.html',
  styleUrls: ['./standardproduct-api.component.css']
})
export class StandardproductApiComponent implements OnInit {

  standardproducts: StandardProducts[];
  standardproduct: StandardProducts;
  standardproductToAdd: StandardProducts;
  shoppingCartVms: ShoppingCartItem[];
  message: string;

  constructor(private standardproductService: PizzaAPIService, 
    private route:ActivatedRoute, private router:Router ) { }

  ngOnInit() {
    this.getStandardProducts()
    console.log(this.standardproducts);
    console.log(this.standardproducts.length);
    for(let sp of this.standardproducts) {
      let scVM = new ShoppingCartItem();
      scVM.ProductId = sp.StandardProductId;
      scVM.Quantity = 0;
      scVM.Standard = true;
      this.shoppingCartVms.push(scVM);
    }
  }

  add(id) {
    let item = new ShoppingCartItem();
    item.ProductId = id;
    item.Quantity = 1;
    item.Standard = true;
    console.log(item);
    this.standardproductService.addProductToCart(item)
      .subscribe(a => {
        if(a.Id != undefined) {
          alert(`1 ${this.standardproducts[id - 1].Name} placed in cart.`); 
        }
        else{
          alert("There was an error processing your request.");
        } 
      });
  }

  getStandardProduct(id) {
    // Get one Standard Product data.
    this.standardproductService.getStandardProduct(id)
      .subscribe(a => {
        this.standardproduct = a;
        console.log(this.standardproduct);
      });
  }

  getStandardProducts() {
    //console.log("component:getstandardProducts");
    this.standardproductService.getStandardProducts()
      .subscribe(a => {
        console.log(a);
        this.standardproducts = a;
        console.log(this.standardproducts);
      });
  }

  addStandardProduct() {
    this.standardproductService.addStandardProduct(this.standardproductToAdd)
      .subscribe(res => {
        this.getStandardProducts();
        alert('Standard Product Added successfully');
      }),
      err => {
        console.log("Error occurred: " + err);
      };
    }
    SendToHome(){
      this.router.navigate(['home']);
    }
}
export class ShoppingCartItem {
  Id? : number;
  ProductId : number;
  Standard : boolean;
  Quantity : number;
}