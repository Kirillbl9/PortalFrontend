import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TestService} from '../../services/test.service';
import {CourseService} from '../../services/course.service';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.css']
})
export class TestResultComponent implements OnInit {

  public course_id: number;
  public result: number;
  public questNum: number;
  constructor(private route: ActivatedRoute, private testService: TestService, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.course_id = params['course_id'];
      this.result = params['result'];
      this.questNum = params['questNum'];
    });
  }

  onBaskToLessonsClick() {
    this.router.navigate(['lessons'], {queryParams: {course_id: this.course_id}});
  }

  onTryAgainClick() {
    this.router.navigate(['final-test'], {queryParams: {course_id: this.course_id}});
  }
}
