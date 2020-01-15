import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorsIndexComponent } from './instructors-index/instructors-index.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { InstructorsFormComponent } from './instructors-form/instructors-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: InstructorsIndexComponent
  }
]

@NgModule({
  declarations: [InstructorsIndexComponent, InstructorsFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [
    InstructorsFormComponent
  ]
})
export class InstructorsModule { }
