import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsIndexComponent } from './students-index/students-index.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { StudentsFormComponent } from './students-form/students-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentsDetailComponent } from './students-detail/students-detail.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsIndexComponent
  }
]

@NgModule({
  declarations: [StudentsIndexComponent, StudentsFormComponent, StudentsDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    StudentsFormComponent,
    StudentsDetailComponent
  ]
})
export class StudentsModule { }
