import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstructorsService } from '../instructors.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-instructors-form',
  templateUrl: './instructors-form.component.html',
  styleUrls: ['./instructors-form.component.scss']
})
export class InstructorsFormComponent implements OnInit {
  formInstructor: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private instructorService: InstructorsService,
    private dialogRef: MatDialogRef<InstructorsFormComponent>

  ) { }

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    if (this.data) {
      this.formInstructor = this.fb.group({
        id: [this.data.id],
        name: [this.data.name, Validators.required]
      });
    } else {
      this.formInstructor = this.fb.group({
        name: [null, Validators.required]
      });
    }
  
  }

  onSubmit() {
    if (this.data) {
      this.instructorService.update(this.formInstructor.value)
      .subscribe(response => {
        this.onCloseModal('Edit Berhasil !');
      }, error => {
        console.log(error);
      });
    } else {
      this.instructorService.store(this.formInstructor.value)
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
