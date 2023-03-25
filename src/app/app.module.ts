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
import {BlankComponent} from '@pages/blank/blank.component';
import {ReactiveFormsModule} from '@angular/forms';
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
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';
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
import {httpInterceptorsProviders} from "@/interceptors";
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {EditCategoryComponent} from './pages/categories/edit-category/edit-category.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {AddProductComponent} from './pages/products/add-product/add-product.component';
import {EditProductComponent} from './pages/products/edit-product/edit-product.component';
import {NgxColorsModule} from "ngx-colors";


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
        BlankComponent,
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
    SubMenuComponent,
    MenuItemComponent,
    ControlSidebarComponent,
    SidebarSearchComponent,
    ProductsComponent,
    CategoriesComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    ConfirmDialogComponent,
    AddProductComponent,
    EditProductComponent
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
      NgxColorsModule
    ],
    providers: [httpInterceptorsProviders],
    bootstrap: [AppComponent]
})
export class AppModule {}
