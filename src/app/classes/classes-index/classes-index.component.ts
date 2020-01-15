import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ClassesService } from '../classes.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { tap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ClassesFormComponent } from '../classes-form/classes-form.component';
import { InstructorsService } from 'src/app/instructors/instructors.service';
export interface Classes {
  name: string;
  teacher: string;

}


@Component({
  selector: 'app-classes-index',
  templateUrl: './classes-index.component.html',
  styleUrls: ['./classes-index.component.scss']
})
export class ClassesIndexComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'teacher', 'edit', 'remove'];
  dataSource = new MatTableDataSource<Classes>([]);
  
  constructor(
    private classesService: ClassesService,
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
        tap(() => this.loadClasses())
    )
    .subscribe();
  }
  
  ngAfterViewInit() {
    this.loadClasses();
  }

  loadClasses() {
    this.classesService.getClasses({
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
    this.instructorService.all()
    .subscribe(instructors => {
      this.onLoadModal(instructors);
    })
  }

   onEdit(classes: any) {
    this.instructorService.all()
    .subscribe(instructors => {
      this.onLoadModal(instructors, classes)
    })
  }

  onLoadModal(instructors: any, classes?) {
    const dialogRef = this.dialog.open(ClassesFormComponent, {
      width: '520px',
      data : {
        classes: classes,
        instructors
      }
    });
    dialogRef.afterClosed().subscribe(val => {
      if (val) {
        this.onWarning(val.message)
        this.loadClasses();
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

  onRemove(classes: any) {
    this.classesService.destroy(classes.id)
    .subscribe(response => {
      this.loadClasses();
      this.onWarning('Delete berhasil ')
    }, error => {
      console.log(error);
    });
  }

  

}
