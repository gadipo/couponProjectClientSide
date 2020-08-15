import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coupon } from '../models/coupon';
import { Category } from '../models/category.enum';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private client:HttpClient) { }

  addCoupon(coupon:Coupon){
    return this.client.post("http://localhost:8080/company/addCoupon/"+sessionStorage.getItem('userId'),coupon,{responseType:'text'});
  }

  updateCoupon(coupon:Coupon){
    return this.client.put("http://localhost:8080/company/updateCoupon/"+sessionStorage.getItem('userId'),coupon,{responseType:'text'});
  }

  deleteCoupon(id:number){
    return this.client.delete("http://localhost:8080/company/deleteCoupon/"+id+"/"+sessionStorage.getItem('userId'),{responseType:'text'});
  }

  getCompanyCoupons(){
    return this.client.get<Coupon[]>("http://localhost:8080/company/getCoupons/"+sessionStorage.getItem('userId'));
  }

  getCouponsByCategory(category:Category){
    return this.client.get<Coupon[]>("http://localhost:8080/company/getCouponsByCategory/"+category+"/"+sessionStorage.getItem('userId'));
  }

  getCouponsBelowPrice(price:number){
    return this.client.get<Coupon[]>("http://localhost:8080/company/getCouponsBelowPrice/"+price+"/"+sessionStorage.getItem('userId'));
  }

  getCoupon(id:number){
    return this.client.get<Coupon>("http://localhost:8080/company/getOneCoupon/"+id+"/"+sessionStorage.getItem('userId'));
  }

  getCompanyDetails(){
    return this.client.get<Company>("http://localhost:8080/company/getCompanyDetails/"+sessionStorage.getItem('userId'));
  }
}
