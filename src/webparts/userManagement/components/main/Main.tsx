import * as React from 'react';
import { Provider, ProviderProps, connect } from 'react-redux';

import { Label, Pivot, PivotItem } from 'office-ui-fabric-react';
import styles from './main.module.scss';

import { Account } from '../account';

import { IUserManagementWebPartProps } from '../../IUserManagementWebPartProps';
import Search from '../search/Search';
import Permission from '../permissions/Permission';
import configureStore from '../../stores';

export class Main extends React.Component<IUserManagementWebPartProps> {
  constructor() {
    super();
  }

  private store = configureStore();

  public render(): React.ReactElement<IUserManagementWebPartProps> {
    return (
       <Provider store={this.store}>
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
                <Permission className={styles.item} />
              </PivotItem>
            </Pivot>
          </div>
        </div>
       </Provider>
    );
  }
}

