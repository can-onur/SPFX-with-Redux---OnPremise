import * as React from 'react';
import { Pivot, PivotItem } from 'office-ui-fabric-react';

import { Create } from './create';

export interface IAccountState {
}

export interface IAccountProps {
  className?: string;
}

export class Account extends React.Component<IAccountProps, IAccountState> {
  constructor() {
    super();
    this.state = {
      userName: ''
    };
  }

  public render(): React.ReactElement<IAccountProps> {
    return (
      <div>
        <Pivot>
          <PivotItem linkText='Create' itemIcon='AddFriend'>
            <Create />
          </PivotItem>
          <PivotItem linkText='Update' itemIcon='UserSync'>
            <div className='DefaultContentBlock' />
          </PivotItem>
        </Pivot>
      </div>
    );
  }
}
