import { Coupon } from './coupon';

export class Company {
//try to use getters and setters
constructor(
    public id: number,
    public name: string,
    public password: string,
    public email: string,
    public coupons: Coupon[]){}
    // public editable:boolean =false;
    
    public get_coupons(): Coupon[] {
        return this.coupons;
    }
    public set_coupons(coupons: Coupon[]) {
        this.coupons = coupons;
    }

    public get_email(): string {
        return this.email;
    }
    public set_email(email: string) {
        this.email = email;
    }

    public get_password(): string {
        return this.password;
    }
    public set_password(password: string) {
        this.password = password;
    }

    public getName(): string {
        return this.name;
    }
    public set_name(name: string) {
        this.name = name;
    }


    public getid(): number {
        return this.id;
    }
    public set_id(id: number) {
        this.id = id;
    }

}
