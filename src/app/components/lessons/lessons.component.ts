import {AfterContentInit, AfterViewChecked, Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Lesson} from '../../models/lesson';
import {ActivatedRoute, Router} from '@angular/router';
import {LessonService} from '../../services/lesson.service';
import {Course} from '../../models/course';
import {CourseService} from '../../services/course.service';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {Subject} from '../../models/subject';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit, DoCheck {


  private currentUser: User = new User(0, '', '', '');
  public isAuthor = true;
  public course: Course;
  public lessons: Lesson[] = [];
  public course_id: number;
  constructor(private router: Router, private route: ActivatedRoute, private lessonService: LessonService,
              private courseService: CourseService, private userService: UserService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.course_id = params['course_id'];
    });
    this.userService.getLoggedInUser().subscribe(
      user => this.currentUser = user
    );
    this.lessonService.getAllLessonsForCourse(this.course_id).subscribe(
      data => {
        this.lessons = data;
      }
    );
    this.courseService.getById(this.course_id).subscribe(course => this.course = course);
    console.log(this.currentUser.id);
    console.log(this.course.authorOfCourse);
  }

  onAddLesson() {
    this.router.navigate(['/edit-lesson'], {queryParams: {course_id: this.course_id}});
  }

  onLessonClick(lesson_id: number) {
   this.router.navigate(['/pages'], {queryParams: {lesson_id: lesson_id, course_id: this.course_id}});
  }

  onEditLessonClick(lesson_id: number) {
    this.router.navigate(['/edit-lesson'], {queryParams: {lesson_id: lesson_id, course_id: this.course_id}});
  }

  onDeleteClick(lesson_id: number) {
    this.lessonService.deleteById(lesson_id).subscribe( res =>
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['lessons'], {queryParams: {course_id: this.course.id}})));
  }
  ngDoCheck(): void {
    if (this.currentUser.id !== this.course.authorOfCourse) {
      this.isAuthor = false;
    } else {
      this.isAuthor = true;
    }
  }

  onAddFinalTest(course_id: number) {
    this.router.navigate(['edit-test'], {queryParams: {course_id: course_id}});
  }

  onGoToTheFinalTest(course_id: number) {
    this.router.navigate(['final-test'], {queryParams: {course_id: course_id}});
  }
}
