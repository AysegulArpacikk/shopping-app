import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_COLOR,
  ORDER_PRODUCTS_BY_PRICE,
  FILTER_PRODUCTS_BY_MARK,
  FILTER_PRODUCTS_BY_TITLE,
} from "../actions/types";

const initState = {
  items: [],
  filteredItems: [],
  color: "",
  sort: "",
  mark: "",
  filterText: "",
  currentSort:{},
};
export default function (state = initState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, items: action.payload, filteredItems: action.payload };
    case FILTER_PRODUCTS_BY_COLOR:
      return {
        ...state,
        filteredItems: action.payload.items,
        color: action.payload.color,
      };
    case ORDER_PRODUCTS_BY_PRICE:
      return {
        ...state,
        filteredItems: action.payload.items,
        sort: action.payload.sort,
      };
    case FILTER_PRODUCTS_BY_MARK:
      return {
        ...state,
        filteredItems: action.payload.items,
        mark: action.payload.mark,
      };
    case FILTER_PRODUCTS_BY_TITLE:
      return {
        ...state,
        filterText: action.payload,
      };
    default:
      return state;
  }
}
