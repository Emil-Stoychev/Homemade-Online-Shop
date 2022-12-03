import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { CatalogComponent } from './main/catalog/catalog.component';
import { CreateComponent } from './main/create/create.component';
import { DetailsComponent } from './main/details/details.component';
import { EditComponent } from './main/edit/edit.component';
import { HomeComponent } from './main/home/home.component';
import { ProfileComponent } from './main/profile/profile.component';
import { LoginComponent } from './main/user/login/login.component';
import { RegisterComponent } from './main/user/register/register.component';
import { OwnProductsComponent } from './main/ownProducts/ownProducts.component';
import { LikedProductsComponent } from './main/likedProducts/likedProducts.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'catalog', component: CatalogComponent },
  { path: 'create', component: CreateComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'catalog/details/:id', component: DetailsComponent },
  { path: 'catalog/edit/:id', component: EditComponent, canActivate: [AuthGuard] },
  { path: 'ownProducts', component: OwnProductsComponent, canActivate: [AuthGuard] },
  { path: 'likedProducts', component: LikedProductsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
