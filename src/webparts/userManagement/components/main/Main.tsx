import * as React from 'react';

import { Label, Pivot, PivotItem } from 'office-ui-fabric-react';
import styles from './main.module.scss';

import { Search } from '../search';
import { Account } from '../account';
import { IUserManagementWebPartProps } from '../../IUserManagementWebPartProps';

export class Main extends React.Component<IUserManagementWebPartProps,{}> {
  constructor() {
    super();
    this.state = {
    };
  }

  public render(): React.ReactElement<IUserManagementWebPartProps> {
    return (
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.row}>
            <h1 className={styles.title}>{this.props.title}</h1>
            <h3 className={styles.description}>{this.props.description}</h3>
          </div>

          <Pivot className={styles.pivot}>
            <PivotItem linkText='Search' itemIcon='Search'>
              <Search className={styles.item} />
            </PivotItem>
            <PivotItem linkText='Account' itemIcon='TemporaryUser'>
              <Account className={styles.item} />
            </PivotItem>
            <PivotItem linkText='Permissions' itemIcon='Permissions'>
              <Label>Pivot #4</Label>
            </PivotItem>
          </Pivot>
        </div>
      </div>
    );
  }
}

