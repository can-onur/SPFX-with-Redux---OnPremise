export default class Account {
  public constructor(option:Account) {
    this.UserName = option.UserName;
    this.FirstName = option.FirstName;
    this.LastName = option.LastName;
    this.Country = option.Country;
    this.Region = option.Region;
  }

  public UserName?:string;

  public FirstName?:string;

  public LastName?:string;

  public Country?:string;

  public Region?:string;
}
