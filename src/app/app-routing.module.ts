import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';
import {ProductsComponent} from '@pages/products/products.component';
import {CategoriesComponent} from '@pages/categories/categories.component';
import {CreateCategoryComponent} from '@pages/categories/create-category/create-category.component';
import {EditCategoryComponent} from '@pages/categories/edit-category/edit-category.component';
import {AddProductComponent} from '@pages/products/add-product/add-product.component';
import {EditProductComponent} from '@pages/products/edit-product/edit-product.component';
import {BrandsComponent} from '@pages/brands/brands.component';
import {AddBrandComponent} from '@pages/brands/add-brand/add-brand.component';
import {EditBrandComponent} from '@pages/brands/edit-brand/edit-brand.component';
import {CouponsListComponent} from '@pages/coupons/coupons-list/coupons-list.component';
import {AddCouponComponent} from '@pages/coupons/add-coupon/add-coupon.component';
import {EditCouponComponent} from '@pages/coupons/edit-coupon/edit-coupon.component';
import {OrdersComponent} from "@pages/orders/orders.component";
import {OrderDetailsComponent} from "@pages/orders/order-details/order-details.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'blank',
        component: BlankComponent
      },
      {
        path: 'sub-menu-1',
        component: SubMenuComponent
      },
      {
        path: 'sub-menu-2',
        component: BlankComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'products/create',
        component: AddProductComponent
      },
      {
        path: 'products/:id/edit',
        component: EditProductComponent
      },
      {
        path: 'categories',
        component: CategoriesComponent
      },
      {
        path: 'categories/create',
        component: CreateCategoryComponent
      },
      {
        path: 'categories/:id/edit',
        component: EditCategoryComponent
      },
      {
        path: 'brands',
        component: BrandsComponent
      },
      {
        path: 'brands/add',
        component: AddBrandComponent
      },
      {
        path: 'brands/edit/:id',
        component: EditBrandComponent
      },
      {
        path: 'coupons',
        component: CouponsListComponent
      },
      {
        path: 'coupons/add',
        component: AddCouponComponent
      },
      {
        path: 'coupons/edit/:id',
        component: EditCouponComponent
      },
      {
        path: '',
        component: DashboardComponent
      }
      , {
        path: 'orders',
        component: OrdersComponent
      },
       {
        path: 'orders/:id',
        component: OrderDetailsComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
    // canActivate: [NonAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
    //  canActivate: [NonAuthGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
    //   canActivate: [NonAuthGuard]
  },
  {
    path: 'recover-password',
    component: RecoverPasswordComponent
    //  canActivate: [NonAuthGuard]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
