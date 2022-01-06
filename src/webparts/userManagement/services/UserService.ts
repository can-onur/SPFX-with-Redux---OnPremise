import { IWebPartContext } from '@microsoft/sp-webpart-base';

export interface IUserService {
    currentUser: () => void;
}

export class UserService implements IUserService {
  constructor(private context: IWebPartContext) {
  }

  public currentUser: () => void;
}
