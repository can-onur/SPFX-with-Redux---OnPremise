import * as React from 'react';
import { connect } from 'react-redux';

import { IPersonaProps, SearchBox } from 'office-ui-fabric-react';
import { IPermissionProps, IPermissionState } from '.';
import { IDispatchToProps, mapDispatchToProps } from '../../stores/helper';
import IStore from '../../stores/IStore';
import _ from 'lodash';

class Permission extends React.Component<IStateToProps & IDispatchToProps & IPermissionProps, IPermissionState> {
  constructor() {
    super();
  }

  public render(): React.ReactElement<IPermissionProps> {
    return (
      <div>
      {!_.isEmpty(this.props.persona[0]) ? this.props.persona[0].text : "Please search and select user."}
      </div>
    );
  }
}


interface IStateToProps {
  persona:IPersonaProps[]
}

const mapStateToProps = (state: IStore): IStateToProps => ({
  persona : state.search.persona
});


export default connect<IStateToProps, IDispatchToProps,IPermissionProps>(mapStateToProps, mapDispatchToProps)(Permission);
