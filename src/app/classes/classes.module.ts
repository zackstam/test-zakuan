import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesIndexComponent } from './classes-index/classes-index.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { ClassesFormComponent } from './classes-form/classes-form.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ClassesIndexComponent
  }
]

@NgModule({
  declarations: [ClassesIndexComponent, ClassesFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ClassesFormComponent
  ]
})
export class ClassesModule { }
