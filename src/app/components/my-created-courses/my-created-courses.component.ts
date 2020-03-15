import {AfterViewChecked, Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {Course} from '../../models/course';
import {UserService} from '../../services/user.service';
import {CourseService} from '../../services/course.service';
import {User} from '../../models/user';
import {log} from 'util';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-my-created-courses',
  templateUrl: './my-created-courses.component.html',
  styleUrls: ['./my-created-courses.component.css']
})
export class MyCreatedCoursesComponent implements OnInit, DoCheck  {
  public currentUser: User = new User(0, '', '', '');
  public courses: Course[] = [];

  constructor(
    private courseService: CourseService,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.userService.getLoggedInUser().subscribe(
      user => this.currentUser = user
    );
  }

  onSelectCourse(course_id: number) {
    this.router.navigate(['/course'], {queryParams: {id: course_id}});
  }

  ngDoCheck(): void {
    this.courseService.getAllCreatedCoursesForUser(this.currentUser.id).subscribe(result => this.courses = result);
  }
}
