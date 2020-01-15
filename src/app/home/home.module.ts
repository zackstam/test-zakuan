import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeIndexComponent } from './home-index/home-index.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeIndexComponent
  }
]

@NgModule({
  declarations: [HomeIndexComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
