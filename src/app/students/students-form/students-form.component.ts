import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.scss']
})
export class StudentsFormComponent implements OnInit {
  studentForm: FormGroup;
  studies = ['MATH', 'CHEMISTRY', 'BIOLOGI']
  subjects: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private studentService: StudentsService,
    private dialogRef: MatDialogRef<StudentsFormComponent>
  ) { }

  ngOnInit() {
    this.subjects = this.data.subjects;
    this.createForm()
  }

  createForm() {
    const { student , subjects } = this.data;
    if (student) {
      this.studentForm = new FormGroup({
        id: new FormControl(student.id),
        name: new FormControl(student.name, Validators.required),
        nisn: new FormControl(student.nisn, Validators.required),
        study: new FormControl(student.study, Validators.required),
        subjects: new FormArray([]),
      });
    } else {
      this.studentForm = new FormGroup({
        name: new FormControl(null, Validators.required),
        nisn: new FormControl(null, Validators.required),
        study: new FormControl(null, Validators.required),
        subjects: new FormArray([]),
      });
      this.loadSubbject()
    }
  
  }
  loadSubbject() {
    const control = new FormGroup({
      subject_id: new FormControl(null)
    });
    (<FormArray>this.studentForm.get('subjects')).push(control);
  }

  onAddSubject() {
    const control = new FormGroup({
      subject_id: new FormControl(null)
    });
    (<FormArray>this.studentForm.get('subjects')).push(control);
    console.log(this.studentForm.value)
  }

  onRemoveSubject(i: number) {
    (<FormArray>this.studentForm.get('subjects')).removeAt(i);
  }


  onSubmit() {
    console.log(this.studentForm.value)
    if (this.data.student) {
      this.studentService.update(this.studentForm.value)
      .subscribe(response => {
        this.onCloseModal('Edit Berhasil !');
      }, error => {
        console.log(error);
      });
    } else {
      this.studentService.store(this.studentForm.value)
      .subscribe(response => {
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
