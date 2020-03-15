import { Component, OnInit } from '@angular/core';
import {TestService} from '../../services/test.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Question} from '../../models/question';
import {Answer} from '../../models/answer';
import {a} from '@angular/core/src/render3';

@Component({
  selector: 'app-test-questions',
  templateUrl: './test-questions.component.html',
  styleUrls: ['./test-questions.component.css']
})
export class TestQuestionsComponent implements OnInit {

  public questions: Question[] = [];
  public course_id: number;
  public selectedAnswers = new Map<number, number>();

  constructor(private route: ActivatedRoute, private testService: TestService, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.course_id = params['course_id'];
      if (this.course_id) {
        this.testService.getQuestionsByCourseId(this.course_id).subscribe(
          res => {
            this.questions = res;
            for (let i = 0; i < this.questions.length; i++) {
              this.testService.getAnswersForQuestion(this.questions[i].id).subscribe(
                answers => {
                  this.questions[i].answers = answers;
                  this.selectedAnswers.set(this.questions[i].id, this.questions[i].answers[0].id);
                }
              );
            }
          }
        );
      }
    });
  }

  submitAnswers() {
    let result = 0;
    for (let question of this.questions) {
      let rightAnswer;
      for (let answ of question.answers) {
        if (answ.right === true) {
          rightAnswer = answ;
        }
      }
      if (this.selectedAnswers.get(question.id) === rightAnswer.id) {
        result += 1;
      }
    }
    this.router.navigate(['test-result'], {queryParams: {result: result, course_id: this.course_id, questNum: this.questions.length}});
  }

  onSelectRadioChange(question: Question, answer: Answer) {
    this.selectedAnswers.set(question.id, answer.id);
  }
}
