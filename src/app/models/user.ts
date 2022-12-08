export class User {
  public id : number;
  public username : string;
  public password : string;
  public firstName : string;
  public lastName : string;
  public token : string;

  constructor(id : number, username : string, password : string, firstName : string, lastName : string, token : string) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.token = token;
  }
}
