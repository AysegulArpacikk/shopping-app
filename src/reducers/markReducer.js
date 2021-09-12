import {FETCH_MARKS, CHANGE_MARK} from '../actions/types';

const initState = { items: [], currentMark: {} };
export default function (state = initState, action) {
  switch (action.type) {
    case FETCH_MARKS:
      return { ...state, items: action.payload };
    case CHANGE_MARK:
      return { ...state, currentMark: action.payload };
    default:
      return state;
  }
}