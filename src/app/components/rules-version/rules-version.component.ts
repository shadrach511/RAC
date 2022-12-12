import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router } from '@angular/router';
import { Question } from 'app/models/question';
import { Answer } from 'app/models/answer';
import { RulesArea } from 'app/models/rulesArea';
import { RulesVersion } from 'app/models/rulesVersion';
import { User } from 'app/models/user';
import { AlertService } from 'app/services/alert.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { RulesAreasService } from 'app/services/rules-areas.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-rules-version',
  templateUrl: './rules-version.component.html',
  styleUrls: ['./rules-version.component.css']
})
export class RulesVersionComponent implements OnInit {
  currentUser: User;
  rulesVersionForm: FormGroup;
  //addQuestionForm: FormGroup;
  showBasicInfoFields = true;
  showBasicEditFields = false;
  showEditQuestionFields = false;
  loading = false;
  ra: RulesArea;
  rv: RulesVersion;
  submittedRulesArea = false;
  label1: string;
  label2: string;
  yesornoquestion = false;
  submittedAddQuestionForm = false;
  rvIdFromRoute: number;
  raIdFromRoute: number;
  questions: Array<Question>;


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private rulesAreasService: RulesAreasService,
              private alertService: AlertService,
              private route: ActivatedRoute
  ) {
    this.currentUser = this.authenticationService.getCurrentUserValue();
    this.showBasicInfoFields = true;
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;

    this.rvIdFromRoute = Number(routeParams.get('rvid'));
    this.raIdFromRoute = Number(routeParams.get('raid'));

    this.rulesVersionForm = this.formBuilder.group({
      status: ['', Validators.required],
      name: ['', Validators.required],
      published: ['', Validators.required],
      currentQuestion: [],
    });
    /*this.addQuestionForm = this.formBuilder.group({
      questionName: ['', Validators.required],
      yesorno: ['true'],
      noOfOutComes: ['2'],
      currentQuestion: [],
      questionLabel: ['New question: '],
    });*/
    this.rulesAreasService.getRulesArea(this.raIdFromRoute).subscribe(x => {

      // @ts-ignore
      this.ra = x;
      console.log('this.ra ' + JSON.stringify(this.ra));
      // @ts-ignore
      this.rv = x.rulesVersionDTOS.filter(x => x.id === +this.rvIdFromRoute);
      // @ts-ignore
      console.log('this.rv ' + JSON.stringify(this.rv[0].name));
      // @ts-ignore
      this.rulesVersionForm.controls['name'].setValue(this.rv[0].name);
      // @ts-ignore
      this.rulesVersionForm.controls['published'].setValue(this.rv[0].published);
      // @ts-ignore
      this.rulesVersionForm.controls['status'].setValue(this.rv[0].status);
      //this.rulesVersionForm.controls['label1'].setValue(this.ra.stringId);
      //this.rulesVersionForm.controls['label2'].setValue(this.ra.name);
      this.label1 = "Rules area id: " + this.ra.stringId;
      this.label2 = "Rules area name: " + this.ra.name;
    });
    console.log('this.rvIdFromRoute ' + this.rvIdFromRoute);
    this.rulesAreasService.getQuestions(+this.rvIdFromRoute).subscribe(x => {
        console.log('x ' + JSON.stringify(x));
        // @ts-ignore
      this.questions = x;
      }
    );
  }


  status() {
    return this.rulesVersionForm.get('status');
  }

  published() {
    return this.rulesVersionForm.get('published');
  }

  name() {
    return this.rulesVersionForm.get('name');
  }

  /*questionName() {
    return this.addQuestionForm.get('questionName');
  }

  questionLabel() {
    return this.addQuestionForm.get('questionLabel');
  }

  yesorno() {
    return this.addQuestionForm.get('yesorno');
  }*/

  onSubmit() {
    this.submittedRulesArea = true;
    Object.keys(this.rulesVersionForm.controls).forEach(key => {
      // @ts-ignore
      this.createFormRulesArea.get(key).setErrors(null);
    })
  }

  makeCopy() {

  }

  EditRulesArea() {
    console.log('this.showBasicInfoFields ' + this.showBasicInfoFields);
    this.showBasicInfoFields = false;
    this.showBasicEditFields = true;

  }

  back() {
    this.showBasicInfoFields = true;
    this.showBasicEditFields = false;
  }

  editQuestions() {
    this.showBasicInfoFields = false;
    this.showBasicEditFields = false;
    this.showEditQuestionFields = true;
  }
/*
  backFromQuestions() {

    this.showBasicEditFields = true;
    this.showEditQuestionFields = false;
  }
*/
 /* onNewQuestionSubmit() {
    console.log('this.addQuestionForm.invalid ' + this.addQuestionForm.invalid);
    this.submittedAddQuestionForm = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.addQuestionForm.invalid) {
      return;
    }
    this.loading = true;
    console.log('this.yesornoquestion 1 ' + this.yesorno()?.value);
    if (this.yesorno()?.value) {

      // @ts-ignore
      let question: Question = new Question(-1, this.rvIdFromRoute, this.questionName().value, [], true);
      this.rulesAreasService.createQuestion(question)
        //this.rulesAreasService.getRulesArea(1)
        .subscribe(
          data => {
            this.alertService.success('The question has been created', true);
            this.loading = false;
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
    } else {
      // @ts-ignore
      let answers: Array<Answer> = [];
      // @ts-ignore
      for (let i = 1; i <= this.addQuestionForm.get('noOfOutComes').value; ++i) {
        // @ts-ignore
        let answer: Answer = new Answer(-1, this.addQuestionForm.get('Field' + i).value);
        answers.push(answer);
      }
      // @ts-ignore
      let question: Question = new Question(-1, this.rvIdFromRoute, this.questionName().value, answers, false);
      this.rulesAreasService.createQuestion(question)
        .subscribe(
          data => {
            this.alertService.success('The question has been created', true);
            this.loading = false;
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
    }
  }


  checkBox() {
    console.log('checkbox');
    // @ts-ignore
    this.addQuestionForm.get('noOfOutComes').setValue('2');
    this.yesornoquestion = !this.yesornoquestion;
    if (this.yesornoquestion) {
      // @ts-ignore
      for (let i = 1; i <= this.addQuestionForm.get('noOfOutComes').value; ++i) {
        this.addQuestionForm.addControl('Field' + i, new FormControl());
        this.addQuestionForm.controls['Field' + i].setValue('Answer ' + i);
      }
    }
  }

  noOfOutComes() {
    return this.addQuestionForm.get('noOfOutComes');
  }

  apa() {
    // @ts-ignore
    for (let i = 1; i <= this.addQuestionForm.get('noOfOutComes').value; ++i) {
      this.addQuestionForm.addControl('Field' + i, new FormControl());
      this.addQuestionForm.controls['Field' + i].setValue('Answer ' + i);
    }
  }

  getQuestion() {
    // @ts-ignore
    //this.currentQuestion = this.addQuestionForm.get('currentQuestion');

    // @ts-ignore
    //console.log('this.currentQuestion ' + this.currentQuestion.value);
    for (let i = 0; i < this.questions.length; ++i) {

      // @ts-ignore
      if (+this.currentQuestion.value === this.questions[i].id) {
        // @ts-ignore
        this.yesorno().setValue(this.questions[i].yesOrNo);
        console.log('this.yesorno() ' + this.yesorno()?.value);


        // @ts-ignore
        this.yesornoquestion = this.questions[i].yesOrNo;
        // @ts-ignore
        this.addQuestionForm.get('noOfOutComes').setValue(this.questions[i].answers.length);
        for (let j = 1; j <= this.questions[i].answers.length; ++j) {
          this.addQuestionForm.addControl('Field' + j, new FormControl());
          this.addQuestionForm.controls['Field' + j].setValue(this.questions[i].answers[j - 1].answer);
        }
      }
    }
  }

  getQuestionLabel() {
    // @ts-ignore
    if (this.currentQuestion?.value > 0) {
      return "Question name:";
    } else {
      return "New Question name:";
    }
  }

  // @ts-ignore
  getAnswersLabel() {
    console.log('getAnswersLabel');
    // @ts-ignore
    if (this.currentQuestion?.value > 0) {
      for (let i = 0; i < this.questions.length; ++i) {
          console.log('sdf' + i);
        // @ts-ignore
        if (+this.currentQuestion.value === this.questions[i].id) {
          console.log('this.questions[i].yesOrNo ' + this.questions[i].yesOrNo);
          if (this.questions[i].yesOrNo) {
            return "";
          } else {
            return "Answers:"
          }
        }
      }
    }
    else
      {
        return "Answers:";
      }

  }*/
}
