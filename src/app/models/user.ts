export class User {
  public id : number;
  public email : string;
  public password : string;
  public firstName : string;
  public lastName : string;
  public domain : string;
  public token : string;

  constructor(id : number, email : string, password : string, firstName : string, lastName : string, domain : string, token : string) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.domain = domain;
    this.token = token;
  }
}
