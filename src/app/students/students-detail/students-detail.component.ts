import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-students-detail',
  templateUrl: './students-detail.component.html',
  styleUrls: ['./students-detail.component.scss']
})
export class StudentsDetailComponent implements OnInit {
  student: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    console.log(this.data)
    this.student = this.data.student;

  }

}
