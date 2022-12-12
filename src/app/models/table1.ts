export class Table1 {
  public area_id : string;
  public area_name : string;
  public version_name : string;
  public published : string;
  public status : string;
  public rules_version_id : number;
  public rules_area_id : number;


  constructor(area_id : string, area_name : string, version_name : string, published : string, status : string, rules_version_id : number, rules_area_id : number) {
    this.area_id = area_id;
    this.area_name = area_name;
    this.version_name = version_name;
    this.published = published;
    this.status = status;
    this.rules_version_id = rules_version_id;
    this.rules_area_id = rules_area_id;
  }
}
