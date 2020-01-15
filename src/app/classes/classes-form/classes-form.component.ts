import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClassesService } from '../classes.service';

@Component({
  selector: 'app-classes-form',
  templateUrl: './classes-form.component.html',
  styleUrls: ['./classes-form.component.scss']
})
export class ClassesFormComponent implements OnInit {
  classForm: FormGroup;
  instructors: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private classesService: ClassesService,
    private dialogRef: MatDialogRef<ClassesFormComponent>
  ) { }

  ngOnInit() {
    this.instructors = this.data.instructors
    console.log(this.data)
    this.createForm();
  }


  createForm() {
    const { classes , instructors } = this.data;
    if (classes) {
      this.classForm = this.fb.group({
        id: [classes.id],
        name: [classes.name, Validators.required],
        teacher_id: [classes.teacher_id, Validators.required],
      });
    } else {
      this.classForm = this.fb.group({
        name: [null, Validators.required],
        teacher_id: [null, Validators.required],
      });
    }
  
  }


  onSubmit() {
    if (this.data.classes) {
      this.classesService.update(this.classForm.value)
      .subscribe(response => {
        this.onCloseModal('Edit Berhasil !');
      }, error => {
        console.log(error);
      });
    } else {
      this.classesService.store(this.classForm.value)
      .subscribe(response => {
        console.log(response);
        this.onCloseModal('Tambah Berhasil !');
      }, error => {
        console.log(error);
      });
    }

  }

  onCloseModal(message: string) {
    this.dialogRef.close({
      status: true,
      message: message
    });
  }

}
