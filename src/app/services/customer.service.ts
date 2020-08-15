import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coupon } from '../models/coupon';
import { Category } from '../models/category.enum';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private client:HttpClient) { }

  purchaseCoupon(id:number){
     return this.client.get("http://localhost:8080/customer/purchaseCoupon/"+id+"/"+sessionStorage.getItem('userId'),{responseType:'text'});
  }

  getAllCoupons(){
    return this.client.get<Coupon[]>("http://localhost:8080/customer/getAllCoupons/"+sessionStorage.getItem('userId'));
  }

  getCustomerCoupons(){
    return this.client.get<Coupon[]>("http://localhost:8080/customer/getCustomerCoupons/"+sessionStorage.getItem('userId'));
  }

  getCouponsByCat(cat:Category){
    return this.client.get<Coupon[]>("http://localhost:8080/customer/getCouponsByCat/"+cat+"/"+sessionStorage.getItem('userId'));
  }

  getCouponsByPrice(price:number){
    return this.client.get<Coupon[]>("http://localhost:8080/customer/getCouponsByPrice/"+price+"/"+sessionStorage.getItem('userId'));
  }

  getCustomerDetails(){
    return this.client.get<Customer>("http://localhost:8080/customer/getCustomerDetails/"+sessionStorage.getItem('userId'));
   }
}
