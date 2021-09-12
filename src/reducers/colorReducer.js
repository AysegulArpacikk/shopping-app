import {FETCH_COLORS, CHANGE_COLOR} from '../actions/types';

const initState = { items: [], currentColor: {}};
export default function (state = initState, action) {
  switch (action.type) {
    case FETCH_COLORS:
      return { ...state, items: action.payload };
    case CHANGE_COLOR:
      return { ...state, currentColor: action.payload}
    default:
      return state;
  }
}