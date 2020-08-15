import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/company';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

company:Company;
customer:Customer;

  constructor(private customerService:CustomerService, private companyService:CompanyService) { }

  ngOnInit(): void {
  }

}
