import {Component, OnInit} from '@angular/core';
import {CourseService} from '../../services/course.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Course} from '../../models/course';
import {UserService} from '../../services/user.service';
import {log} from 'util';
import {Subject} from '../../models/subject';
import {User} from '../../models/user';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course: Course = new Course('', '', new Subject(''), 0);
  currentUser: User = new User(0, '', '', '');
  idOfCourse: number;

  public isUserAlreadyJoined: boolean;

  constructor(private courseService: CourseService, private route: ActivatedRoute, private userService: UserService,
              private router: Router) {
    let id = 0;
    this.route.queryParams.subscribe(params => {
      id = params['id'];
      this.idOfCourse = params['id'];
    });
    this.userService.getCourseForCurrentUser(id).subscribe(result => {
      this.isUserAlreadyJoined = result != null;
    });
    this.courseService.getById2(id).subscribe(res => this.course = res);
    this.q();
    log(this.currentUser);
  }
q() {
  this.userService.getById(this.idOfCourse).subscribe(
    user => this.currentUser = user
  );
}

  ngOnInit() {
  }

  onJoinToCourseClick() {
    // TODO disable button join when you already joined to course
    this.userService.addCourseForCurrentUser(this.course.id).subscribe(res =>
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['course'], {queryParams: {id: this.course.id}}))
    );
  }

  onGoToTheCourseClick() {
    this.router.navigate(['lessons'], {queryParams: {course_id: this.course.id}});
  }
}
