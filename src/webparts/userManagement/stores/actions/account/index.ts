import Account from '../../../models/Account';
import AccountService from '../../../services/AccountService';
import IAction from '../../IAction';

export type AccountActionUnion = boolean;

export default class AccountAction {

  public static readonly CREATE: string = 'AccountAction.CREATE';
  public static readonly SEARCH: string = 'AccountAction.SEARCH';

  public static async Create(account: Account): Promise<IAction<boolean>> {
      const result = await AccountService.Create(account);
      return {payload: result,type: AccountAction.CREATE};
  }
}
