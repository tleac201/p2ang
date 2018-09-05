import { Component, OnInit } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';
import { AccountRegister } from '../service/pizza-api.service';
import { PizzaAPIService } from '../service/pizza-api.service';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-register-api',
  templateUrl: './register-api.component.html',
  styleUrls: ['./register-api.component.css']
})
export class RegisterAPIComponent implements OnInit {

  Resgister: AccountRegister;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  FirstName: string;
  LastName: string;
  Phone: string;
  accounts: AccountRegister[];
  account: AccountRegister;
  accountToAdd: AccountRegister;

  constructor(private accountService: PizzaAPIService, private route:ActivatedRoute, private router:Router) {
    this.Resgister = new AccountRegister();
  }

  ngOnInit() {
  }

  register(email: string, password: string, confirmpassword: string, firstname:string, lastname:string, phonenumber:string) {
    this.Resgister.Email = email;
    this.Resgister.Password = password;
    this.Resgister.ConfirmPassword = confirmpassword;
    this.Resgister.FirstName = firstname;
    this.Resgister.LastName = lastname;
    this.Resgister.Phone = phonenumber;

    this.accountService.register(this.Resgister)
    .subscribe(a => {
      this.Resgister = a.body;
      console.log(this.Resgister);
    })
  }

  getAccount(id) {
    // Get one Account data.
    this.accountService.getAccount(id)
      .subscribe(a => {
        this.account = a;
        console.log(this.account);
      });
  }

  getAccounts() {
    this.accountService.getAccounts()
      .subscribe(a => {
        console.log(a);
        this.accounts = a;
        console.log(this.accounts);
      });
  }

  addAccount() {
    this.accountService.addAccount(this.accountToAdd)
      .subscribe(res => {
        this.getAccounts();
        alert('Account Added successfully');
      }),
      err => {
        console.log("Error occurred: " + err);
      };
    }

  updateAccount() {
    this.accountService.editAccount(this.account)
      .subscribe(res => {
        this.getAccounts();
        alert("Account data Updated successfully !!")
      });
  }

  SendToLogin(){
    this.router.navigate(['']);
  }
}
