import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './components/admin/admin.component';
import { CompanyComponent } from './components/company/company.component';
import { CustomerComponent } from './components/customer/customer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UpdateCoupon2Component } from './components/company/update-coupon2/update-coupon2.component';
import { ImageDialogComponent } from './components/image-dialog/image-dialog.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { CouponDisplayComponent } from './components/coupon-display/coupon-display.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { UpdateCompanyComponent } from './components/update-company/update-company.component';
import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    CompanyComponent,
    CustomerComponent,
    HomeComponent,
    LoginComponent,
    NotFoundComponent,
    UpdateCoupon2Component,
    ImageDialogComponent,
    UserDetailsComponent,
    CustomerDetailsComponent,
    CouponDisplayComponent,
    ToolbarComponent,
    UpdateCompanyComponent,
    UpdateCustomerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatBadgeModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    FormsModule,
    MatTabsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
