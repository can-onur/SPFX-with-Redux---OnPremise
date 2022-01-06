import Account from '../models/Account';

export interface IAccountService {
  Create: (account: Account) => Promise<boolean>;
}

export class AccountService implements IAccountService {
  Create = async (account: Account) => {
    const result = await fetch(`https://example.com/users/`)
    const json = result.json()
    // json is an array of users
    return json
  };

  private static Instance: AccountService;

  public static getInstance() {
    if (!AccountService.Instance) {
      AccountService.Instance = new AccountService();
    }

    return AccountService.Instance;
  }
}

export default AccountService.getInstance();
