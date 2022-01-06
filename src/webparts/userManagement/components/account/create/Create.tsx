import * as React from 'react';
import {
  css, Dropdown, PrimaryButton, TextField
} from 'office-ui-fabric-react';
import countryRegionData, { Country, Region } from 'country-region-data';
import styles from './create.module.scss';
import Account from '../../../models/Account';

export interface ICreateState {
  Account: Account;
  Countries: any[];
  Regions: any[];
}

export interface ICreateProps {
  className?: string;
}

export class Create extends React.Component<ICreateProps, ICreateState> {
  private country: Dropdown;

  constructor() {
    super();
    this.state = {
      Account: {},
      Countries: [],
      Regions: []
    };
  }

  public componentDidMount(): void {
    this.loadCountries();
  }

  public render(): React.ReactElement<ICreateProps> {
    return (
      <div className={styles.create}>
        <div className={styles.container}>
          <h3>New account details</h3>
          <TextField
            label='First Name'
            name='FirstName'
            onChanged={this.handleChange.bind(this)}
            required
          />
          <TextField
            label='Last Name'
            name='LastName'
            onChanged={this.handleChange.bind(this)}
            required
          />
          <TextField label='Company' />
          <Dropdown
            placeHolder='Select a Country'
            label='Country:'
            selectedKey={this.state.Account.Country}
            options={this.state.Countries}
            onChanged={this.onCountryChange.bind(this)}
            ref={(ref) => this.country = ref}
          />
          <Dropdown
            placeHolder='Select a Region'
            label='Region:'
            selectedKey={this.state.Account.Region}
            options={this.state.Regions}
            onChanged={this.onChange.bind(this)}
            disabled={!(this.country && this.state.Account.Country)}
          />
          <TextField label='Zip Code' />
          <br />
          <PrimaryButton className={css(styles.pullright, styles.clearfix)} text='Save' />
        </div>
      </div>
    );
  }

  private loadCountries = (): void => {
    const temp: any = countryRegionData.map((country: Country) => ({
      key: country.countryShortCode, text: country.countryName, regions: country.regions, type: 'Country'}));

    this.setState({
      Countries: temp
    });
  }

  private loadRegions = (regions: Region[]): void => {
    const temp: any = regions.map((region: Region) => ({ key: region.shortCode, text: region.name, type: 'Region' }));

    this.setState({
      Regions: temp
    });
  }

  private onCountryChange = (option: any, index?: number): void => {
    this.onChange(option, index);
    this.loadRegions(option.regions);
    this.setRegion(-1);
  }

  private setRegion = (region: number): void => {
    const { Account } = this.state;
    Account!.Region = region.toString();
    this.setState({ Account });
  }

  private onChange = (option: any, index?: number): void => {
    const { Account } = this.state;
    Account![option.type] = option.key;
    this.setState({ Account });
  }

  private handleChange = (option: any) => {
    const { Account } = this.state;
    const element: HTMLInputElement = event.target as HTMLInputElement;
    Account![element!.name] = element.value;
    this.setState({ Account });
  }
}
