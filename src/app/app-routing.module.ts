import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BodyComponent } from './core/body/body.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/classes',
    pathMatch: 'full',
  },
  {
    path: '',
    component: BodyComponent,
    children: [
      {
        path: 'classes',
        loadChildren: () => import('./classes/classes.module').then(m => m.ClassesModule)
      },
      {
        path: 'students',
        loadChildren: () => import('./students/students.module').then(m => m.StudentsModule)
      },
      {
        path: 'instructors',
        loadChildren: () => import('./instructors/instructors.module').then(m => m.InstructorsModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
