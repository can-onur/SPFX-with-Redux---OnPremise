import * as React from 'react';
import {
  ComboBox,
  css, IComboBoxOption, MaskedTextField, PrimaryButton, TextField
} from 'office-ui-fabric-react';
import countryRegionData, { Country, Region } from 'country-region-data';
import styles from './create.module.scss';
import Account from '../../../models/Account';
import Company from '../../../models/Company';
import CompanyService from '../../../services/CompanyService';
import { Util } from '../../../../../Util';

export interface ICreateState {
  Account: Account;
  Countries: IComboBoxOption[];
  Regions: IComboBoxOption[];
  Companies: IComboBoxOption[];
}

export interface ICreateProps {
  className?: string;
}

export class Create extends React.Component<ICreateProps, ICreateState> {
  constructor() {
    super();
    this.state = {
      Account: {},
      Countries: [],
      Regions: [],
      Companies: []
    };
  }

  public componentDidMount(): void {
    this.loadCountries();
    this.loadCompanies();
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
            validateOnFocusOut
            onChanged={this.handleChange.bind(this)}
            required
          />
          <TextField
            label='Email'
            name='Email'
            onChanged={this.handleChange.bind(this)}
            onGetErrorMessage={Util.Email.Validate}
            validateOnFocusOut
            validateOnLoad={false}
            required
          />
          <TextField
            label='Address'
            name='Address'
            onChanged={this.handleChange.bind(this)}
            multiline
            autoAdjustHeight
            max={500}
            required
          />
          <ComboBox
            label='Country:'
            allowFreeform={false}
            selectedKey={this.state.Account.Country}
            options={this.state.Countries}
            onChanged={this.onCountryChange.bind(this)}
            required
          />
          <ComboBox
            label='Region:'
            selectedKey={this.state.Account.Region}
            options={this.state.Regions}
            onChanged={this.onChange.bind(this)}
            disabled={!(this.state.Account.Country)}
            required
          />
          <TextField label='Zip Code' />
          <MaskedTextField 
            label='Mobile Phone'
            name='MobilePhone'
            mask='(999) 999 - 9999'
            onChanged={this.handleChange.bind(this)}
            required
          />
          <ComboBox
            label='Company:'
            selectedKey={this.state.Account.Company}
            options={this.state.Companies}
            onChanged={this.onChange.bind(this)}
            required
          />
          <br />
          <PrimaryButton className={css(styles.pullright, styles.clearfix)} text='Save' />
        </div>
      </div>
    );
  }

  private loadCountries = (): void => {
    const temp: IComboBoxOption[] = countryRegionData.map((country: Country) => ({
      key: country.countryShortCode, text: country.countryName, regions: country.regions, type: 'Country'
    }));

    this.setState({
      Countries: temp
    });
  }

  private loadRegions = (regions: Region[]): void => {
    const temp: IComboBoxOption[] = regions.map((region: Region) => ({ key: region.shortCode, text: region.name, type: 'Region' }));

    this.setState({
      Regions: temp
    });
  }


  loadCompanies() {
    CompanyService.Get().then((companies: Company[]) => {
      const temp: IComboBoxOption[] = companies.map((company: Company) => ({ key: company.Id, text: company.Name, type: 'Company' }))
      this.setState({
        Companies: temp
      });
    })
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
