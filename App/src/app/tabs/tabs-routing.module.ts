//-----------------------------------------------------------------------------------------------------------------
// CS 5551
// Lab 4
// Jonathan Wolfe
// Bill Yerkes
// Create a simple ionic application using any of the ionic templates [tabs, sidemenu]
//     Make changes to the template to display
//     1. Login and Registration Activities
//     The application must have a sign up and login activities.
//
//     2. A Main page
//     The Page should be Mashup of at least Two Web Services (refer to the web services
//     from the spreadsheet). One of them should be from the list of knowledge/Machine
//     learning/AI services and that you haven’t used in your previous work.
//
//     3. Testing
//     Write at least 3-unit test cases related to your application.
//
//     Deploy the application to android device/ web/ ionic lab
//
// Adapted from https://devdactic.com/ionic-4-jwt-login/
//-----------------------------------------------------------------------------------------------------------------
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
