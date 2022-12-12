export class RulesVersion {
  public id : number;
  public rulesAreaId : number;
  public name : string;
  public published : string;
  public status : string;


  constructor(id : number, rulesAreaId : number, name : string, published : string, status : string) {
    this.id = id;
    this.rulesAreaId = rulesAreaId;
    this.name = name;
    this.published = published;
    this.status = status;
  }
}
