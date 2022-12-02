import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CreateComponent } from './create/create.component';
import { OwnProductsComponent } from './ownProducts/ownProducts.component';
import { LikedProductsComponent } from './likedProducts/likedProducts.component';
import { ProfileComponent } from './profile/profile.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    HomeComponent,
    CatalogComponent,
    CreateComponent,
    OwnProductsComponent,
    LikedProductsComponent,
    ProfileComponent,
    DetailsComponent,
    EditComponent,
  ],
  imports: [CommonModule, UserModule],
  exports: [
    HomeComponent,
    CatalogComponent,
    CreateComponent,
    OwnProductsComponent,
    LikedProductsComponent,
    ProfileComponent,
    DetailsComponent,
    EditComponent
  ],
})
export class MainModule {}
