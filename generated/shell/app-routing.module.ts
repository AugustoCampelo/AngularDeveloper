// Angular Imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminLayout } from './theme/layout/admin-layout/admin-layout.component';
import { GuestLayouts } from './theme/layout/guest-layout/guest-layout.component';
import { AuthGuardChild } from './theme/shared/components/_helpers/auth.guard';
import { Role } from './theme/shared/components/_helpers/role';

// Enxuto para a casca inicial: login (guest) + home (admin). Adicione features abaixo.
const routes: Routes = [
  {
    path: '',
    component: GuestLayouts,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () => import('./demo/pages/authentication/auth-login/auth-login.component').then((c) => c.AuthLoginComponent)
      }
    ]
  },
  {
    path: '',
    component: AdminLayout,
    canActivateChild: [AuthGuardChild],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./demo/home/home.component').then((c) => c.HomeComponent),
        data: { roles: [Role.Admin, Role.User] }
      }
      // ...adicione aqui as rotas das suas features
    ]
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./demo/pages/maintenance/unauthorize-error/unauthorize-error.component').then((c) => c.UnauthorizeErrorComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./demo/pages/maintenance/error/error.component').then((c) => c.ErrorComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
