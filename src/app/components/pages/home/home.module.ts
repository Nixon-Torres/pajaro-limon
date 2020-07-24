import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home.component";
import {ReactiveFormsModule} from "@angular/forms";
import {VjsPlayerComponent} from "../../shared/vjs-player/vjs-player.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [
    HomeComponent,
    VjsPlayerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  exports: [RouterModule, VjsPlayerComponent,]
})
export class HomeModule { }
