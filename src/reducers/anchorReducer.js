import { HIDE_ANCHOR, SHOW_ANCHOR } from '../actions/anchorActions';

const initialState = {
  anchorVisible: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HIDE_ANCHOR:
      return {
        ...state,
        anchorVisible: false,
      };
    case SHOW_ANCHOR:
      return {
        ...state,
        anchorVisible: true,
      };
    default:
      return state;
  }
};
