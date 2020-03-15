import { Component, OnInit } from '@angular/core';
import {Page} from '../../models/page';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../services/page.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {

  public page_number = 1;
  public page_id: number;
  public lesson_id: number;
  public course_id: number;
  public pages: Page[] = [];
  public currentPage: Page;
  public numAfterToAdd: any;

  constructor(private route: ActivatedRoute, private router: Router, private pageService: PageService) { }

  ngOnInit() {
    this.currentPage = new Page();
    this.route.queryParams.subscribe(params => {
      this.lesson_id = params['lesson_id'];
      this.course_id = params['course_id'];
      this.page_id = params['page_id'];
    });
    this.pageService.getPagesForLesson(this.lesson_id).subscribe(res => this.pages = res);
    if (this.page_id) {
      this.pageService.getPageById(this.page_id).subscribe(result => this.currentPage = result);
    }
  }

  createPage() {
    if (this.numAfterToAdd) {
      this.currentPage.number = this.numAfterToAdd + 1;
    } else {
      this.currentPage.number = 1;
    }
    this.pageService.createPage(this.currentPage, this.lesson_id).subscribe(
      next => this.router.navigate(['pages'],
        {queryParams: {course_id: this.course_id, lesson_id: this.lesson_id, page_id: this.page_id}})
    );
  }

  updatePage() {
    this.pageService.updatePage(this.currentPage, this.lesson_id).subscribe(
      next => this.router.navigate(['pages'], {queryParams: {course_id: this.course_id, lesson_id: this.lesson_id}})
    );
  }
}
