import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from '@/app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from '@modules/main/main.component';
import {LoginComponent} from '@modules/login/login.component';
import {HeaderComponent} from '@modules/main/header/header.component';
import {FooterComponent} from '@modules/main/footer/footer.component';
import {MenuSidebarComponent} from '@modules/main/menu-sidebar/menu-sidebar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from '@pages/profile/profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {ToastrModule} from 'ngx-toastr';
import {MessagesComponent} from '@modules/main/header/messages/messages.component';
import {NotificationsComponent} from '@modules/main/header/notifications/notifications.component';

import {CreateCategoryComponent} from '@pages/categories/create-category/create-category.component';
import {SidebarSearchComponent} from '@components/sidebar-search/sidebar-search.component';
import {ProductsComponent} from '@pages/products/products.component';
import {CategoriesComponent} from '@pages/categories/categories.component';
import {MainMenuComponent} from '@pages/main-menu/main-menu.component';
import {MenuItemComponent} from '@components/menu-item/menu-item.component';
import {ControlSidebarComponent} from '@modules/main/control-sidebar/control-sidebar.component';

import {registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import {UserComponent} from '@modules/main/header/user/user.component';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {LanguageComponent} from '@modules/main/header/language/language.component';

import {StoreModule} from '@ngrx/store';
import {authReducer} from './store/auth/reducer';
import {uiReducer} from './store/ui/reducer';
import {ProfabricComponentsModule} from '@profabric/angular-components';
import {defineCustomElements} from '@profabric/web-components/loader';
import {httpInterceptorsProviders} from '@/interceptors';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {EditCategoryComponent} from '@pages/categories/edit-category/edit-category.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '@components/confirm-dialog/confirm-dialog.component';
import {AddProductComponent} from '@pages/products/add-product/add-product.component';
import {EditProductComponent} from '@pages/products/edit-product/edit-product.component';
import {NgxColorsModule} from 'ngx-colors';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {BrandsComponent} from '@pages/brands/brands.component';
import {DeleteBrandComponent} from '@pages/brands/delete-brand/delete-brand.component';
import {AddBrandComponent} from '@pages/brands/add-brand/add-brand.component';
import {EditBrandComponent} from '@pages/brands/edit-brand/edit-brand.component';
import {CouponsListComponent} from '@pages/coupons/coupons-list/coupons-list.component';
import {DeleteCouponComponent} from '@pages/coupons/delete-coupon/delete-coupon.component';
import {AddCouponComponent} from '@pages/coupons/add-coupon/add-coupon.component';
import {EditCouponComponent} from '@pages/coupons/edit-coupon/edit-coupon.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { OrdersComponent } from '@pages/orders/orders.component';
import { OrderDetailsComponent } from '@pages/orders/order-details/order-details.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
defineCustomElements();
registerLocaleData(localeEn, 'en-EN');

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        MenuSidebarComponent,
        ProfileComponent,
        RegisterComponent,
        DashboardComponent,
        MessagesComponent,
        NotificationsComponent,
        UserComponent,
        ForgotPasswordComponent,
        RecoverPasswordComponent,
        LanguageComponent,
        MainMenuComponent,
        MenuItemComponent,
        ControlSidebarComponent,
        SidebarSearchComponent,
        ProductsComponent,
        CategoriesComponent,
        CreateCategoryComponent,
        EditCategoryComponent,
        ConfirmDialogComponent,
        AddProductComponent,
        EditProductComponent,
        BrandsComponent,
        DeleteBrandComponent,
        AddBrandComponent,
        EditBrandComponent,
        CouponsListComponent,
        DeleteCouponComponent,
        AddCouponComponent,
        EditCouponComponent,
        OrdersComponent,
        OrderDetailsComponent,
    ],
    imports: [
        BrowserModule,
        StoreModule.forRoot({auth: authReducer, ui: uiReducer}),
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        }),
        ProfabricComponentsModule,
        MatPaginatorModule,
        MatTableModule,
        MatButtonModule,
        MatDialogModule,
        NgxColorsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FormsModule,
        MatProgressSpinnerModule,

    ],
    providers: [httpInterceptorsProviders],
    bootstrap: [AppComponent]
})
export class AppModule {}
