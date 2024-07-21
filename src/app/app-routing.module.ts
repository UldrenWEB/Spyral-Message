import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/splash',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadChildren: () => import('./views/splash-page/splash.module').then(m=> m.SplashScreenModule)
  },
  {
    path: 'startup',
    loadChildren: () => import('./views/startup-page/startup.module').then(m=>m.StartupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./views/login-page/login.module').then(m=>m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./views/register-page/register.module').then(m=>m.RegisterPageModule)
  },
  {
    path: 'chat-page',
    loadChildren: () => import('./views/chat-page/chat.module').then(m=>m.HomePageModule)
  },
  {
    path: '',
    loadChildren: () => import('./views/tabs/tabs.module').then(m => m.TabsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
