import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_COLOR,
  ORDER_PRODUCTS_BY_PRICE,
  FILTER_PRODUCTS_BY_MARK,
  FILTER_PRODUCTS_BY_TITLE,
  CHANGE_SORT
} from "./types";

export const fetchProducts = () => (dispatch) => {
  fetch("http://localhost:8000/products")
    .then((res) => res.json())
    .catch((err) =>
      fetch("db.json")
        .then((res) => res.json())
        .then((data) => data.products)
    )
    .then((data) => {
      localStorage.setItem("products", JSON.stringify(data));
      dispatch({ type: FETCH_PRODUCTS, payload: data });
    });
};


export const sortProducts = (items, sort) => (dispatch) => {
  const products = items.slice();
  if (sort !== "") {
    products.sort((a, b) =>
      sort === "lowestprice"
        ? a.price > b.price
          ? 1
          : -1
        : sort === "highestprice" ? a.price < b.price
        ? 1
        : -1 :
        sort === "theNewOneAtoZ"
          ? (a.title.toLowerCase() > b.title.toLowerCase() || a.title.toUpperCase() > b.title.toUpperCase()) ? 1 : -1
          : (a.title.toLowerCase() < b.title.toLowerCase() || a.title.toUpperCase() < b.title.toUpperCase()) ? 1 : -1
    );
  } else {
    products.sort((a, b) => (a.id > b.id ? 1 : -1));
  }
  dispatch({
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      items: products,
    },
  });
};

export const filterProducts = (items, color,states) => (dispatch) => {

  if(states.marks&& states.marks.filter(val=>val.active).length>0){
    let markValue=states.marks.filter(val=>val.active)
    items=items.filter(val=>val.mark.indexOf(markValue[0].name) >= 0)
  }
  dispatch({
    type: FILTER_PRODUCTS_BY_COLOR,
    payload: {
      color: color,
      items:
        color === ""
          ? items
          : items.filter(
              (x) => x.color.indexOf(color) >= 0
            ),
    },
  });
};

export const filterProductsByMark = (items, mark,states) => (dispatch) => {

  if(states.colors&& states.colors.filter(val=>val.active).length>0){
    let colorValue=states.colors.filter(val=>val.active)
    items=items.filter(val=>val.color.indexOf(colorValue[0].name) >= 0)
  }

  dispatch({
    type: FILTER_PRODUCTS_BY_MARK,
    payload: {
      mark: mark,
      items:
        mark === ""
          ? items
          : items.filter(
              (x) => x.mark.indexOf(mark) >= 0
            ),
    },
  });
};

export const filterProductsByName = (filterText) => (dispatch) => {
  dispatch({
    type: FILTER_PRODUCTS_BY_TITLE,
    payload: filterText
  });
};

export const filterProductsByPriceOrTitle = (sort) => (dispatch) => {
  dispatch({
    type: CHANGE_SORT,
    payload: sort
  });
};

