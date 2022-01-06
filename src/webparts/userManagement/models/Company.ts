export default class Company {
  public constructor(option: Company) {
    this.Id = option.Id;
    this.Name = option.Name;
    this.Country = option.Country;
    this.Region = option.Region;
    this.WebSiteUrl = option.WebSiteUrl;
  }
  public Id: string;

  public Name: string;

  public Country?: string;

  public Region?: string;

  public WebSiteUrl?: string;
}
