import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./components/pages/home/home.module')
      .then(m => m.HomeModule),
  }, {
    path: 'making',
    loadChildren: () => import('./components/pages/inspiration/inspiration.module')
      .then(m => m.InspirationModule),
  }, {
    path: 'room',
    loadChildren: () => import('./components/pages/room-knowledge/room-knowledge.module')
      .then(m => m.RoomKnowledgeModule),
  }, {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  }, {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
