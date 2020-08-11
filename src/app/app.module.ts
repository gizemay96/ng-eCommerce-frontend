import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule, matFormFieldAnimations } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, matDialogAnimations } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { QuantityPipe } from './pipes/quantity.pipe';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { AutoFocusDirective } from './directiver/auto-focus.directive';
import { EqualValidationDirective } from './directiver/equal-validation.directive';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';

@NgModule({
  declarations: [AppComponent, LoginPageComponent, RegisterPageComponent, NavbarComponent, HomePageComponent, ProfilePageComponent, ProductCardComponent, SidebarComponent, CartComponent, CheckoutPageComponent, QuantityPipe, OrderItemComponent, AutoFocusDirective, EqualValidationDirective, DialogExampleComponent],
  entryComponents: [DialogExampleComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatGridListModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
