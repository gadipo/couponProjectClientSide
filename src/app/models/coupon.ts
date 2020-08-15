import { Company } from './company';
import { Category } from './category.enum';

export class Coupon {

    constructor(
    public id :number,
    public title : string,
    public category : Category,
    public description : string,
    public price : number,
    public company : Company,
    public startDate : Date,
    public endDate : Date,
    public amount : number,
    public image : string,
    ){}
    
    
    public get _category() : Category {
        return this.category;
    }
    public set _category(category : Category) {
        this.category = category;
    }
    
    public get _price() : number {
        return this.price;
    }
    public set _price(price : number) {
        this.price = price;
    }
    
    public get _image() : string {
        return this.image;
     } 
    public set _image(image : string) {
        this.image = image;
    }
    
    public get _amount() : number {
        return this.amount;
    }
    public set _amount(amount : number) {
        this.amount = amount;
    }
    
    public get _endDate() : Date {
        return this.endDate;
    }
    public set _endDate(endDate : Date) {
        this.endDate = endDate;
    }
    
    public get _startDate() : Date {
        return this.startDate;
    }
    public set _startDate(startDate : Date) {
        this.startDate = startDate;
    }
    
    public get _description() : string {
        return this.description;
    }
    public set _description(description : string) {
        this.description = description;
    }
    
    public get _title() : string {
        return this.title;
    }
    public set _title(title : string) {
        this.title = title;
    }
    
    public get _company() : Company {
        return this.company;
    }
    public set _company(company : Company) {
        this.company = company;
    }
    
    public get _id() :number {
        return this.id;
    }
    public set _id(id :number) {
        this.id = id;
    }
    
}
