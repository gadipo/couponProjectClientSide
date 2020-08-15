import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private client: HttpClient) { }

  addCompany(company: Company) {
    return this.client.post("http://localhost:8080/admin/addCompany/" + sessionStorage.getItem('userId'), company,{responseType:'text'});
  }

  updateCompany(company: Company) {
    //is it post or put??
    return this.client.put("http://localhost:8080/admin/updateCompany/" + sessionStorage.getItem('userId'), company,{responseType:'text'});
  }

  deleteCompany(id: number) {
    return this.client.delete("http://localhost:8080/admin/deleteCompany/" + id + "/" + sessionStorage.getItem('userId'), { responseType: 'text' });
  }

  getAllCompanies() {
    return this.client.get<Company[]>("http://localhost:8080/admin/getAllCompanies/" + sessionStorage.getItem('userId'));
  }

  getCompany(id: number) {
    return this.client.get<Company>("http://localhost:8080/admin/getOneCompany/" + id + "/" + sessionStorage.getItem('userId'));
  }

  getCompanyByEmail(email: string) {
    return this.client.get<Company>("http://localhost:8080/admin/getCompanyByEmail/" + email + "/" + sessionStorage.getItem('userId'));
  }

  addCustomer(customer: Customer) {
    return this.client.post("http://localhost:8080/admin/addCustomer/" + sessionStorage.getItem('userId'), customer,{responseType:'text'});
  }

  updateCustomer(customer: Customer) {
    return this.client.put("http://localhost:8080/admin/updateCustomer/" + sessionStorage.getItem('userId'), customer,{responseType:'text'});
  }

  deleteCustomer(id: number,) {
    return this.client.delete("http://localhost:8080/admin/deleteCustomer/" + id + "/" + sessionStorage.getItem('userId'), { responseType: 'text' });
  }

  getAllCustomers() {
    return this.client.get<Customer[]>("http://localhost:8080/admin/getAllCustomers/" + sessionStorage.getItem('userId'));
  }

  getCustomer(id: number) {
    return this.client.get<Customer>("http://localhost:8080/admin/getOneCustomer/" + id + "/" + sessionStorage.getItem('userId'));
  }

  getCustomerByEmail(email: string) {
    return this.client.get<Customer>("http://localhost:8080/admin/getCustomerByEmail/" + email + "/" + sessionStorage.getItem('userId'));
  }
}
