import { Coupon } from './coupon';

export class Customer {

    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public coupons: Coupon[]) { }
        // public editable:boolean =false;


        get _id():number{
            return this.id;
        }

        get _firstName():string{
            return this.firstName;
        }

        get _lastName():string{
            return this.lastName;
        }

        get _email():string{
            return this.email;
        }

        get _password():string{
            return this.password;
        }

        get _coupons():Coupon[]{
            return this.coupons;
        }

        set_id(id:number){
            this.id = id;
        }

        set_firstName(firstName:string){
            this.firstName = firstName;
        }

        set_lastName(lastName:string){
         this.lastName = lastName;
        }

        set_email(email:string){
         this.email = email;
        }

        set_password(password:string){
            this.password = password;
        }

        set_coupons(coupons:Coupon[]){
            this.coupons = coupons;
        }
}
