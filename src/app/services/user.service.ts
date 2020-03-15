import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';
import {Course} from '../models/course';

@Injectable()
export class UserService {
  private base_url = '/api/users';
  constructor(private http: HttpClient) { }

  getById(id: number): Observable<User> {
    return this.http.get<User>(this.base_url + '/by-id/' + id);
  }

  getByEmail(email: string): Observable<User> {
    return this.http.get<User>(this.base_url + '/by-email/' + email);
  }

  getLoggedInUser() {
    return this.http.get<User>(this.base_url + '/me');
  }

  getAll() {
    return this.http.get(this.base_url);
  }

  addCourseForCurrentUser(course_id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post( this.base_url + '/me/courses/' + course_id, null, httpOptions);
  }

  getCourseForCurrentUser(course_id: number): Observable<Course> {
    return this.http.get<Course>(this.base_url + '/me/courses/' + course_id);
  }

  getAllCoursesForUser() {
    return this.http.get<Course[]>(this.base_url + '/me/courses');
  }

  uploadImageForProfile(uploadData: FormData) {
    return this.http.patch(this.base_url + '/me/change-image', uploadData);
  }
}
