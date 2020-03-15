import { Component, OnInit } from '@angular/core';
import {Question} from '../../models/question';
import {ActivatedRoute, Router} from '@angular/router';
import {TestService} from '../../services/test.service';
import {Answer} from '../../models/answer';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.css']
})
export class EditTestComponent implements OnInit {


  public questions: Question[] = [];
  public selectedAnswers = new Map<number, number>();
  survey: FormGroup;
  public flag = false;
  public course_id: number;
  constructor(private testService: TestService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.course_id = params['course_id'];
    });

    this.survey = new FormGroup({
      surveyName: new FormControl(''),
      logoUrl: new FormControl(''),
      headerUrl: new FormControl(''),
      headerColor: new FormControl(''),
      footerUrl: new FormControl(''),
      footerColor: new FormControl(''),
      sections: new FormArray([
        this.initSection(),
      ]),
    });
  }

  initSection() {
    return new FormGroup({
      questions: new FormArray([
        this.initQuestion()
      ])
    });
  }
  initQuestion() {
    return new FormGroup({
      questionTitle: new FormControl(''),
      questionType: new FormControl('', Validators.required),
      options: new FormArray([
        this.initOptions()
      ]),
    });
  }

  initOptions() {
    return new FormGroup({
      optionTitle: new FormControl('')
    });
  }

  addQuestion(j) {
    console.log(j);
    const control = <FormArray>this.survey.get(['sections', j, 'questions']);
    control.push(this.initQuestion());
  }

  add(i, j) {
    const control = <FormArray>this.survey.get(['sections', i, 'questions' , j, 'options']);
    control.push(this.initOptions());
  }

  getSections(form) {
    return form.controls.sections.controls;
  }
  getQuestions(form) {
    return form.controls.questions.controls;
  }
  getOptions(form) {
    return form.controls.options.controls;
  }

  removeQuestion(i, j) {
    const control = <FormArray>this.survey.get(['sections', i, 'questions']);
    control.removeAt(j);
  }

  removeOption(i, j, k) {
    console.log(i, j, k);
    const control = <FormArray>this.survey.get(['sections', i, 'questions', j, 'options']); // also try this new syntax
    control.removeAt(k);
  }

  remove(i, j) {
    const control =  <FormArray>this.survey.get(['sections', i, 'questions', j, 'options']);
    control.removeAt(0);
    control.controls = [];
  }

  onSubmit(form) {
    const questionList = this.survey.get(['sections', 0, 'questions']).value;
    let questId = 1;
    for (let question of questionList) {
      let answId = 1;
      const q = new Question(questId, question.questionTitle);
      for (let answer of question.options) {
        const answ = new Answer(answId, '', false);
        answ.content = answer.optionTitle;
        q.answers.push(answ);
        answId++;
      }
      questId++;
      q.answers[0].right = true;
      this.questions.push(q);
    }
    console.log(this.survey);
    this.flag = true;
  }

  onSelectRadioChange(question: Question, answer: Answer) {
    for (let ans of question.answers) {
      if (ans.id !== answer.id) {
        ans.right = false;
      } else {
        ans.right = true;
      }
    }
    //this.selectedAnswers.set(question.id, answer.id);
  }

  onSaveTestClick() {
    this.testService.createTest(this.questions, this.course_id).subscribe(res =>
      this.router.navigate(['lessons'], {queryParams: {course_id: this.course_id}}));
  }
}
