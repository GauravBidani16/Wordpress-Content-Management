import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
    path: 'settings',
    loadComponent: () =>
      import('./features/settings/settings').then(m => m.Settings)
  },
  {
    path: 'posts/create',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/posts/create-post/create-post').then(m => m.CreatePost)
  },
//   {
//     path: 'posts',
//     canActivate: [authGuard],
//     loadComponent: () =>
//       import('./features/posts/post-list/post-list.component').then(m => m.PostListComponent)
//   },
  { path: '', redirectTo: 'settings', pathMatch: 'full' },
  { path: '**', redirectTo: 'settings' }
];
