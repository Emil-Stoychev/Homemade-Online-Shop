import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CreateComponent } from './create/create.component';
import { OwnProductsComponent } from './ownProducts/ownProducts.component';

@NgModule({
  declarations: [
    HomeComponent,
    CatalogComponent,
    CreateComponent,
    OwnProductsComponent,
  ],
  imports: [CommonModule],
  exports: [HomeComponent, CatalogComponent, CreateComponent, OwnProductsComponent],
})
export class MainModule {}
