import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { catchError, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  //courses: Course[] = [];
  courses$: Observable <Course[]>;
  displayedColumns = ['name', 'category', 'actions'];

  //coursesService: CoursesService;

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) {
    //this.coursesService = new CoursesService();
    //this.coursesService.list().subscribe(courses => this.courses = courses);
    this.courses$ = this.coursesService.list()
    .pipe(
      catchError(error => {
        this.onError('Error ao carregar cursos.')
        return of([])
      } )
    )
   }

   onError(errorMsg: string){
      this.dialog.open(ErrorDialogComponent, {
        data: errorMsg
      });
   }




  ngOnInit(): void {
    //this.courses = this.coursesService.list(); could be here as well

  }

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
