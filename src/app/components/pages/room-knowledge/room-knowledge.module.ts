import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RoomKnowledgeComponent} from "./room-knowledge.component";
import {VjsPlayerModule} from "../../shared/vjs-player/vjs-player.module";

const routes: Routes = [
  {
    path: '',
    component: RoomKnowledgeComponent
  }
]

@NgModule({
  declarations: [
    RoomKnowledgeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    VjsPlayerModule
  ],
  exports: [RouterModule]
})
export class RoomKnowledgeModule { }
