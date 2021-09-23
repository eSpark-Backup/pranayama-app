import {PAID_BUNDLE_SUCCESS, PAID_BUNDLE_FAIL} from '../actions/types';

const initialState = {
  paidBundle: [],
  isLoading: true,
};

export default function(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case PAID_BUNDLE_SUCCESS:
      return {
        ...state,
        paidBundle: payload,
        isLoading: false,
      };
    case PAID_BUNDLE_FAIL:
      return {
        ...state,
        paidBundle: false,
        audio: null,
      };
    default:
      return state;
  }
}
