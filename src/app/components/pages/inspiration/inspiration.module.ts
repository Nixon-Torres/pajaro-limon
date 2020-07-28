import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {InspirationComponent} from "./inspiration.component";
import {VjsPlayerModule} from "../../shared/vjs-player/vjs-player.module";

const routes: Routes = [
  {
    path: '',
    component: InspirationComponent
  }
]

@NgModule({
  declarations: [
    InspirationComponent,
  ],
  imports: [
    CommonModule,
    VjsPlayerModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class InspirationModule { }
