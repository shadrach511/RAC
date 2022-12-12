import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  showEditQuestionFields: any;
  questionForm: FormGroup;
  questions: any;
  submittedAddQuestionForm: any[] | undefined;
  yesornoquestion: any;
  loading: any;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.questionForm = this.formBuilder.group({
      questionName: ['', Validators.required],
      yesorno: [''],
      noOfOutComes: [''],
      currentQuestion: [],
      questionLabel: [''],
    });
    }

  onNewQuestionSubmit() {

  }

  getQuestion() {

  }

  getQuestionLabel() {

  }

  questionName() {
    return this.questionForm.get('questionName');
  }
  noOfOutComes() {
    return this.questionForm.get('noOfOutComes');
  }
  getAnswersLabel() {

  }

 

  backFromQuestions() {

  }

  checkBox() {

  }

  apa() {

  }
}
