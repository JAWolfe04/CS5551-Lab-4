import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'UClassify',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../UClassify/UClassify.module').then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: 'Movies',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../Movies/Movies.module').then(m => m.Tab2PageModule)
          }
        ]
      },
      {
        path: 'Movies/:id',
        loadChildren: () => import('../movie-details/movie-details.module').then( m => m.MovieDetailsPageModule)
      },
      {
        path: '',
        redirectTo: 'UClassify',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/members/UClassify',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
