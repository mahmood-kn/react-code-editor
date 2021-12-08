import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';

interface BundleState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
}

const initialState: BundleState = {};

const reducer = (state: BundleState = initialState, action: Action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        draft[action.payload.cellId] = {
          loading: true,
          code: '',
          err: '',
        };
        return draft;
      case ActionType.BUNDLE_COMPLETE:
        draft[action.payload.cellId] = {
          loading: false,
          code: action.payload.bundle.code,
          err: action.payload.bundle.err,
        };
        return draft;

      default:
        return draft;
    }
  });
};

export default reducer;
