export default class Account {
  public constructor(option:Account) {
    this.UserName = option.UserName;
    this.FirstName = option.FirstName;
    this.LastName = option.LastName;
    this.Company = option.FirstName;
    this.Country = option.Country;
    this.Region = option.Region;
    this.DUNNS = option.DUNNS;
  }

  public UserName?:string;

  public FirstName?:string;

  public LastName?:string;

  public Email?:string;

  public Company?:string;

  public Country?:string;

  public Region?:string;

  public DUNNS?:string;
}
