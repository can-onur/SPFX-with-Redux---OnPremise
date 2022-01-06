import Company from '../models/Company';

export interface ICompanyService {
  Get: () => Promise<Company[]>;
}

export class CompanyService implements ICompanyService {
  Get: () => Promise<Company[]>;

  private static Instance: CompanyService;

  public static getInstance() {
    if (!CompanyService.Instance) {
      CompanyService.Instance = new CompanyService();
    }

    return CompanyService.Instance;
  }
}

export default CompanyService.getInstance();
