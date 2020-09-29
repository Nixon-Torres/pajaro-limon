import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from "@angular/router";
import {HomeVinoComponent} from "./home-vino.component";
import {ReactiveFormsModule} from "@angular/forms";
import {VjsPlayerModule} from "../../shared/vjs-player/vjs-player.module";


const routes: Routes = [
  {
    path: '',
    component: HomeVinoComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VjsPlayerModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class HomeVinoModule { }
