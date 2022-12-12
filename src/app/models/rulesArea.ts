import { RulesVersion } from "./rulesVersion";

export class RulesArea {
  public id : number;
  public stringId : string;
  public name : string;
  public text : string;
  public rulesVersions : RulesVersion[];

  constructor(id : number, stringId : string, name : string, text : string, rulesVersions : RulesVersion[]) {
    this.id = id;
    this.stringId = stringId;
    this.name = name;
    this.text = text;
    this.rulesVersions = rulesVersions;
  }
}
