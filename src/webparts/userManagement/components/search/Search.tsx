import * as React from 'react';
import { connect } from 'react-redux';

import {
  CompactPeoplePicker,
  IBasePickerSuggestionsProps,
  ValidationState,
  assign,
  BaseComponent,
  IBaseProps,
  IPersonaProps
} from 'office-ui-fabric-react';

import { ISearchProps, ISearchState } from '.';
import { IDispatchToProps, mapDispatchToProps } from '../../stores/helper';
import IStore from '../../stores/IStore';
import { RandomUser } from 'RandomUser';
import SearchAction from '../../stores/actions/search';
import UserAction from '../../stores/actions/user';
import _ from 'lodash';
import RandomUserService from '../../services/RandomUserService';

export interface IPeoplePickerExampleState {
  delayResults?: boolean;
  currentSelectedItems?: IPersonaProps[];
}

const suggestionProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: 'Suggested People',
  mostRecentlyUsedHeaderText: 'Suggested Contacts',
  noResultsFoundText: 'No results found',
  loadingText: 'Loading',
  showRemoveButtons: true,
  suggestionsAvailableAlertText: 'People Picker Suggestions available',
  suggestionsContainerAriaLabel: 'Suggested contacts'
};

const limitedSearchAdditionalProps: IBasePickerSuggestionsProps = {
  searchForMoreText: 'Load all Results',
  resultsMaximumNumber: 10,
  searchingText: 'Searching...'
};

const limitedSearchSuggestionProps: IBasePickerSuggestionsProps = assign(limitedSearchAdditionalProps, suggestionProps);

class Search extends BaseComponent<IStateToProps & IDispatchToProps & ISearchProps, IStateToProps & ISearchState & IPeoplePickerExampleState> {
  constructor(props) {
    super(props);

    if (this.props.peopleList.length == 0) {
      RandomUserService.Get(500).then((randomUsers: RandomUser[]) => {
        randomUsers.forEach((persona: RandomUser) => {
          var target = {
            imageUrl: persona.picture.thumbnail,
            text: `${persona.name.first} ${persona.name.last}`,
          } as IPersonaProps;

          this.props.peopleList.push(target);
        });
        this.props.dispatch(UserAction.Set(this.props.peopleList));
      })
    }

    this.state = {
      delayResults: false,
      peopleList: this.props.peopleList,
      currentSelectedItems: !_.isEmpty(this.props.persona[0]) ? [this.props.persona[0]] : []
    };
  }

  public render(): React.ReactElement<ISearchProps & IPeoplePickerExampleState> {
    limitedSearchSuggestionProps.resultsFooter = this._renderFooterText;

    return (
      <div>
        <CompactPeoplePicker
          onResolveSuggestions={this._onFilterChangedWithLimit}
          className={'ms-PeoplePicker'}
          onGetMoreResults={this._onFilterChanged}
          pickerSuggestionsProps={limitedSearchSuggestionProps}
          onChange={this._onItemsChange}
          inputProps={{
            onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
            onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
            'aria-label': 'People Picker'
          }}
          selectedItems={this.state.currentSelectedItems}
          itemLimit={1}
          resolveDelay={300}
        />
      </div>
    );
  }

  private _onItemsChange = (items: any[]): void => {
    this.props.dispatch(SearchAction.Select(items));
    this.setState({
      currentSelectedItems: items
    });
  }

 

  private _renderFooterText = (): JSX.Element => {
    return <div>No additional results</div>;
  }

  private _onFilterChanged = (filterText: string, currentPersonas: IPersonaProps[], limitResults?: number): IPersonaProps[] | Promise<IPersonaProps[]> => {
    if (filterText) {
      let filteredPersonas: IPersonaProps[] = this._filterPersonasByText(filterText);

      filteredPersonas = this._removeDuplicates(filteredPersonas, currentPersonas);
      filteredPersonas = limitResults ? filteredPersonas.splice(0, limitResults) : filteredPersonas;
      return this._filterPromise(filteredPersonas);
    } else {
      return [];
    }
  }

  private _onFilterChangedWithLimit = (filterText: string, currentPersonas: IPersonaProps[]): IPersonaProps[] | Promise<IPersonaProps[]> => {
    return this._onFilterChanged(filterText, currentPersonas, 6);
  }

  private _filterPromise(personasToReturn: IPersonaProps[]): IPersonaProps[] | Promise<IPersonaProps[]> {
    if (this.state.delayResults) {
      return this._convertResultsToPromise(personasToReturn);
    } else {
      return personasToReturn;
    }
  }

  private _listContainsPersona(persona: IPersonaProps, personas: IPersonaProps[]) {
    if (!personas || !personas.length || personas.length === 0) {
      return false;
    }
    return personas.filter(item => item.text === persona.text).length > 0;
  }

  private _filterPersonasByText(filterText: string): IPersonaProps[] {
    return this.state.peopleList.filter(item => this._doesTextStartWith(item.text as string, filterText));
  }

  private _doesTextStartWith(text: string, filterText: string): boolean {
    return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
  }

  private _convertResultsToPromise(results: IPersonaProps[]): Promise<IPersonaProps[]> {
    return new Promise<IPersonaProps[]>((resolve, reject) => setTimeout(() => resolve(results), 2000));
  }

  private _removeDuplicates(personas: IPersonaProps[], possibleDupes: IPersonaProps[]) {
    return personas.filter(persona => !this._listContainsPersona(persona, possibleDupes));
  }

  private _validateInput = (input: string): ValidationState => {
    if (input.indexOf('@') !== -1) {
      return ValidationState.valid;
    } else if (input.length > 1) {
      return ValidationState.warning;
    } else {
      return ValidationState.invalid;
    }
  }

  /**
   * Takes in the picker input and modifies it in whichever way
   * the caller wants, i.e. parsing entries copied from Outlook (sample
   * input: "Aaron Reid <aaron>").
   *
   * @param input The text entered into the picker.
   */
  private _onInputChange(input: string): string {
    const outlookRegEx = /<.*>/g;
    const emailAddress = outlookRegEx.exec(input);

    if (emailAddress && emailAddress[0]) {
      return emailAddress[0].substring(1, emailAddress[0].length - 1);
    }

    return input;
  }
}


interface IStateToProps extends IBaseProps {
  persona?: IPersonaProps[],
  peopleList: IPersonaProps[]
}

const mapStateToProps = (state: IStore): IStateToProps => ({
  persona: state.search.persona,
  peopleList: state.user.peopleList
});

export default connect<IDispatchToProps, ISearchProps>(mapStateToProps, mapDispatchToProps)(Search);
