import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {Course} from '../../models/course';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {

  public courses: Course[] = [];
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getAllCoursesForUser().subscribe(result => this.courses = result);
  }

  onSelectCourse(course_id: number) {
    this.router.navigate(['/course'], {queryParams: {id: course_id}});
  }
}
