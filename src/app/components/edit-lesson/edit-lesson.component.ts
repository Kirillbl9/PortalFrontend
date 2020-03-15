import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Lesson} from '../../models/lesson';
import {LessonService} from '../../services/lesson.service';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css']
})
export class EditLessonComponent implements OnInit {

  public lesson = new Lesson();
  public course_id: number;
  public numAfterToAdd: number;
  public lessons: Lesson[];
  constructor(private route: ActivatedRoute, private router: Router, private lessonService: LessonService) { }

  ngOnInit() {
    let lesson_id = 0;
    this.route.queryParams.subscribe(params => {
      lesson_id = params['lesson_id'];
      this.course_id = params['course_id'];
      this.lessonService.getAllLessonsForCourse(this.course_id).subscribe(res => this.lessons = res);
    });
    if (lesson_id !== 0) {
      this.lessonService.getLessonById(lesson_id).subscribe(lesson => this.lesson = lesson);
    // TODO update lesson
    }
  }

  createLesson() {
    if (this.numAfterToAdd) {
      this.lesson.number = this.numAfterToAdd + 1;
    } else {
      this.lesson.number = 1;
    }
    this.lessonService.createLesson(this.lesson, this.course_id).subscribe(
      next => this.router.navigate(['lessons'], {queryParams: {course_id: this.course_id}}));
  }

  updateLesson() {
    this.lessonService.updateLesson(this.lesson, this.course_id).subscribe(
      next => this.router.navigate(['lessons'], {queryParams: {course_id: this.course_id}}));
  }
}
