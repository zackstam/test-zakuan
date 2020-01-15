import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { InstructorsService } from '../instructors.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { tap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { InstructorsFormComponent } from '../instructors-form/instructors-form.component';
import { MatDialog, MatSnackBar } from '@angular/material';

export interface Instructor {
  name: string;

}
@Component({
  selector: 'app-instructors-index',
  templateUrl: './instructors-index.component.html',
  styleUrls: ['./instructors-index.component.scss']
})
export class InstructorsIndexComponent implements OnInit {
  displayedColumns: string[] = ['name', 'edit', 'remove'];
  dataSource = new MatTableDataSource<Instructor>([]);
  
  constructor(
    private instructorService: InstructorsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }



  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.pageIndex = 0;

    merge(this.paginator.page)
    .pipe(
        tap(() => this.loadInstructors())
    )
    .subscribe();
  }
  
  ngAfterViewInit() {
    this.loadInstructors();
  }

  loadInstructors() {
    this.instructorService.getInstructors({
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
    const dialogRef = this.dialog.open(InstructorsFormComponent, {
      width: '420px'
    });
    dialogRef.afterClosed().subscribe(val => {
      if (val) {
        this.onWarning(val.message)
        this.loadInstructors();
      }

    });
  }

  onEdit(instructor: any) {
    const dialogRef = this.dialog.open(InstructorsFormComponent, {
      width: '420px',
      data: instructor
    });
    dialogRef.afterClosed().subscribe(val => {
      if (val) {
        this.onWarning(val.message)
        this.loadInstructors();
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

  onRemove(instructor: any) {
    this.instructorService.destroy(instructor.id)
    .subscribe(response => {
      this.loadInstructors();
      this.onWarning('Delete berhasil ')
    }, error => {
      console.log(error);
    });
  }

}
