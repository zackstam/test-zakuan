import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { StudentsService } from '../students.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { tap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { StudentsFormComponent } from '../students-form/students-form.component';
import { ClassesService } from 'src/app/classes/classes.service';
import { StudentsDetailComponent } from '../students-detail/students-detail.component';

export interface Students {
  name: string;
  study: string;
}

@Component({
  selector: 'app-students-index',
  templateUrl: './students-index.component.html',
  styleUrls: ['./students-index.component.scss']
})
export class StudentsIndexComponent implements OnInit {
  displayedColumns: string[] = ['name' , 'study', 'detail', 'remove'];
  dataSource = new MatTableDataSource<Students>([]);
  
  constructor(
    private studentsService: StudentsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private classesService: ClassesService
  ) { }



  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.pageIndex = 0;

    merge(this.paginator.page)
    .pipe(
        tap(() => this.loadStudentss())
    )
    .subscribe();
  }
  
  ngAfterViewInit() {
    this.loadStudentss();
  }

  loadStudentss() {
    this.studentsService.getStudents({
      page: this.paginator.pageIndex,
      limit: this.paginator.pageSize
    })
    .subscribe(response => {
      this.paginator.length = response.total;
      this.paginator.pageIndex = response.page - 1;
      this.dataSource =  response.data;
    })
  }

  onAdd() {
    this.classesService.all()
    .subscribe(classes => {
      this.onLoadModal(classes);
    })
  }

  onDetail(student: any) {
    const dialogRef = this.dialog.open(StudentsDetailComponent, {
      width: '520px',
      data : {
        student: student
      }
    });
    dialogRef.afterClosed().subscribe(val => {

    });
  }

  onLoadModal(classes: any, student?) {
    const dialogRef = this.dialog.open(StudentsFormComponent, {
      width: '520px',
      data : {
        subjects: classes,
        student: student
      }
    });
    dialogRef.afterClosed().subscribe(val => {
      if (val) {
        this.onWarning(val.message)
        this.loadStudentss();
      }

    });
  }

  onWarning(message: string) {
    const snackBarRef = this.snackBar.open(message, 'Tutup', {
      duration: 3000
    });
    snackBarRef.afterDismissed().subscribe(() => {
      // console.log('The snack-bar was dismissed');
    });
  }

  onRemove(student: any) {
    this.studentsService.destroy(student.id)
    .subscribe(response => {
      this.loadStudentss();
      this.onWarning('Delete berhasil ')
    }, error => {
      console.log(error);
    });
  }

}
