import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react';
import { ISearchProps, ISearchState } from '.';

export class Search extends React.Component<ISearchProps, ISearchState> {
  constructor() {
    super();
    this.state = {
      userName: ''
    };
  }

  public render(): React.ReactElement<ISearchProps> {
    return (
      <div {...this.props}>
        <SearchBox
          placeholder='Start typing name or surname.'
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          underlined
        />
      </div>
    );
  }
}
