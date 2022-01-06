import IAction from "./IAction";
import IStore from "./IStore";

export interface IDispatchToProps {
    dispatch: (action: IAction<any>) => void;
}
export const mapDispatchToProps = (dispatch: any): IDispatchToProps => ({
    dispatch
});

export interface IStateToProps {}
export const mapStateToProps = (state: IStore): IStateToProps => ({});