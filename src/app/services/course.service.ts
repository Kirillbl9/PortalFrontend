import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from '../models/subject';
import {Course} from '../models/course';
import {log} from 'util';
import {UserService} from './user.service';
import {User} from '../models/user';

@Injectable()
export class CourseService {
  u: User = new User(null, '', '', '');
  private base_url = '/api/courses';

  constructor(private http: HttpClient, private userService: UserService) {
  }

  getById(id: number): Observable<Course> {
    return this.http.get<Course>(this.base_url + '/' + id);
  }

  getById2(id: number): Observable<Course> {
    return this.http.get<Course>(this.base_url + '2' + '/' + id);
  }

  getAll(): Observable<Course[]> {
    return this.http.get<Course[]>(this.base_url);
  }

  getAllBySubjectId(id: number): Observable<Course[]> {
    return this.http.get<Course[]>(this.base_url + '/by-subject-id/' + id);
  }

  getBySearchedName(courseName: string) {
    return this.http.get<Course[]>(this.base_url + '/by-name/' + courseName);
  }

  /*  public createCourse(course) {
      return this.http.post<Course>(this.base_url + '/course-create/', course);
    }
    public getSubject(subject) {
      return this.http.post<Subject>(this.base_url + '/get-subject/', subject);
    }*/
  createCourse(course) {
    const name = course.name;
    const description = course.description;
    const subject = course.subject.name;
    const authorOfCourse = course.authorOfCourse;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.base_url + '/create-course/', {name, description, subject, authorOfCourse}, httpOptions);
  }
  getAllCreatedCoursesForUser(id: number) {
    return this.http.get<Course[]>(this.base_url + '/courses-by-user-id/' + id);
  }
}
