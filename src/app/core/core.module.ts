import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './body/body.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';

const routes: Routes = [
  {
    path: '',
    component: BodyComponent
  }
];

@NgModule({
  declarations: [BodyComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),

  ]
})
export class CoreModule { }
