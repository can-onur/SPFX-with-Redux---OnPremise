import IAction from "../../IAction";
import { IPersonaProps } from "office-ui-fabric-react";
import SearchAction, { SearchActionUnion } from "../../actions/search";

export interface ISearchReducerState {
    readonly persona: IPersonaProps[];
}

export default class SearchReducer {

    private static readonly _initialState: ISearchReducerState = {
        persona: []
    };

    public static reducer(state: ISearchReducerState = SearchReducer._initialState,
        action: IAction<SearchActionUnion>): ISearchReducerState {
        switch (action.type) {
            case SearchAction.SELECT:
                return SearchReducer.reduceSelectAction(state, action);
            case SearchAction.DESELECT:
                return SearchReducer.reduceDeselectAction(state);
            default:
                return state;
        }
    }
    private static reduceSelectAction = (state = SearchReducer._initialState, action: IAction<SearchActionUnion>) => {
        return { ...state, persona: action.payload }
    }

    private static reduceDeselectAction = (state = SearchReducer._initialState) => {
        return { ...state, persona: [] }
    }
}


