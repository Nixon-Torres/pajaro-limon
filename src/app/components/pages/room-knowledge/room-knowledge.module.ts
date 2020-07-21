import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RoomKnowledgeComponent} from "./room-knowledge.component";

const routes: Routes = [
  {
    path: '',
    component: RoomKnowledgeComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class RoomKnowledgeModule { }
