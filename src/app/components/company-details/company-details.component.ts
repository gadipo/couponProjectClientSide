import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  constructor(private service:CompanyService) { }

  company:Company;

  ngOnInit(): void {
      this.service.getCompanyDetails().subscribe((res) => {
        this.company = res;
      },(err)=>{
        alert(err.error);
        console.log(err.error);
      });
  }

}
