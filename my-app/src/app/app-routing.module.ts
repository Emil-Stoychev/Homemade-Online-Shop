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

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'catalog', component: CatalogComponent },
  { path: 'create', component: CreateComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'catalog/details/:id', component: DetailsComponent },
  { path: 'catalog/edit/:id', component: EditComponent },
  { path: 'ownProducts', component: OwnProductsComponent },
  { path: 'likedProducts', component: LikedProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
