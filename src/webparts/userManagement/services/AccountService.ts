import Account from '../models/Account';

export interface IAccountService {
  Create: (account: Account) => Promise<boolean>;
}

export class AccountService implements IAccountService {
  Create: (account: Account) => Promise<boolean>;

  private static Instance: AccountService;

  public static getInstance() {
    if (AccountService.Instance) {
      AccountService.Instance = new AccountService();
    }

    return AccountService.Instance;
  }
}

export default AccountService.getInstance();
