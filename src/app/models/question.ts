import { Answer } from "./answer";

export class Question {
  public id : number;
  public rulesVersionId : number;
  public question : string;
  public answers : Answer[];
  public yesOrNo : boolean;

  constructor(id : number, rulesVersionId : number, question : string, answers : Answer[], yesOrNo : boolean) {
    this.id = id;
    this.rulesVersionId = rulesVersionId;
    this.question = question;
    this.answers = answers;
    this.yesOrNo = yesOrNo;
  }
}
