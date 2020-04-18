import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaPageRoutingModule } from './lista-routing.module';

import { ListaPage } from './lista.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ImageComponent } from 'src/app/components/image/image.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ListaPage],
  entryComponents: [ImageComponent]
})
export class ListaPageModule {}
