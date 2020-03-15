import { Component, OnInit } from '@angular/core';
import {Subject} from '../../models/subject';
import {SubjectService} from '../../services/subject.service';
import {CourseService} from '../../services/course.service';
import {Course} from '../../models/course';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {ActivatedRoute, Route, Router} from '@angular/router';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  public subjects: Subject[] = [];
  public courses: Course[] = [];
  constructor(private subjectService: SubjectService, private courseService: CourseService, private router: Router,
              private route: ActivatedRoute) {
    this.ngOnInit();
  }

  ngOnInit() {
    // TODO add here checking search param in url
    this.subjectService.getAll().subscribe(elements => this.subjects = elements);
    if (this.route.snapshot.queryParams['search']) {
      let searchParam = '';
      this.route.queryParams.subscribe(params => {
        searchParam = params['search'];
      });
      this.courseService.getBySearchedName(searchParam).subscribe(elements => this.courses = elements);
    } else {
      this.courseService.getAll().subscribe(elements => this.courses = elements);
    }
  }

  onSelectSubject(subjectId: number) {
    this.courseService.getAllBySubjectId(subjectId).subscribe(elements => this.courses = elements);
  }

  onSelectCourse(courseId: number) {
    this.router.navigate(['/course'], {queryParams: {id: courseId}});
  }
}
