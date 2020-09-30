import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VinosDialogsComponent} from "./vinos-dialogs.component";



@NgModule({
  declarations: [VinosDialogsComponent],
  imports: [
    CommonModule
  ],
  exports: [VinosDialogsComponent, CommonModule]
})
export class VinosDialogsModule { }
