export class Answer {
  public id : number;
  public answer : string;
  public questionId : number;


  constructor(id : number, answer : string, questionId : number) {
    this.id = id;
    this.answer = answer;
    this.questionId = questionId;
  }
}
