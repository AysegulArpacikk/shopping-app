import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import {
  sortProducts,
  filterProducts,
  filterProductsByMark,
} from "../actions/productActions";
import rootReducer from "../reducers/index";

const testStore = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
  return createStoreWithMiddleware(rootReducer, initialState);
};

test("should generate sort product by price", () => {
  const actualProducts = [
    {
      id: 27,
      image: 3263456345763,
      title: "Samsung",
      color: "Sarı",
      mark: "Samsung",
      price: 134.9,
      priceWithoutDiscount: 150.0,
      discount: 12,
    },
    {
      id: 28,
      image: 9345295934692,
      title: "Apple iPhone 12 Pro",
      color: "Sarı",
      mark: "Apple",
      price: 300.9,
      priceWithoutDiscount: 400.0,
      discount: 12,
    },
  ];

  const expectedProducts = [
    {
      id: 28,
      image: 9345295934692,
      title: "Apple iPhone 12 Pro",
      color: "Sarı",
      mark: "Apple",
      price: 300.9,
      priceWithoutDiscount: 400.0,
      discount: 12,
    },
    {
      id: 27,
      image: 3263456345763,
      title: "Samsung",
      color: "Sarı",
      mark: "Samsung",
      price: 134.9,
      priceWithoutDiscount: 150.0,
      discount: 12,
    },
  ];

  const store = testStore();

  let data = store.dispatch(sortProducts(actualProducts, "highestprice"));
  data = store.getState();
  expect(data.products.filteredItems).toEqual(expectedProducts);
});

test("should generate sort products by alphabetically product name", () => {
  const actualProducts = [
    {
      id: 27,
      image: 3263456345763,
      title: "Samsung",
      color: "Sarı",
      mark: "Samsung",
      price: 134.9,
      priceWithoutDiscount: 150.0,
      discount: 12,
    },
    {
      id: 28,
      image: 9345295934692,
      title: "Apple iPhone 12 Pro",
      color: "Sarı",
      mark: "Apple",
      price: 300.9,
      priceWithoutDiscount: 400.0,
      discount: 12,
    },
  ];

  const expectedProducts = [
    {
      id: 28,
      image: 9345295934692,
      title: "Apple iPhone 12 Pro",
      color: "Sarı",
      mark: "Apple",
      price: 300.9,
      priceWithoutDiscount: 400.0,
      discount: 12,
    },
    {
      id: 27,
      image: 3263456345763,
      title: "Samsung",
      color: "Sarı",
      mark: "Samsung",
      price: 134.9,
      priceWithoutDiscount: 150.0,
      discount: 12,
    },
  ];

  const store = testStore();

  let data = store.dispatch(sortProducts(actualProducts, "theNewOneAtoZ"));
  data = store.getState();
  expect(data.products.filteredItems).toEqual(expectedProducts);
});

test("Should generate filter product by color", () => {
  const actualProducts = [
    {
      id: 27,
      image: 3263456345763,
      title: "Samsung",
      color: "Beyaz",
      mark: "Samsung",
      price: 134.9,
      priceWithoutDiscount: 150.0,
      discount: 12,
    },
    {
      id: 28,
      image: 9345295934692,
      title: "Apple iPhone 12 Pro",
      color: "Sarı",
      mark: "Apple",
      price: 300.9,
      priceWithoutDiscount: 400.0,
      discount: 12,
    },
  ];

  const expectedProducts = [
    {
      id: 28,
      image: 9345295934692,
      title: "Apple iPhone 12 Pro",
      color: "Sarı",
      mark: "Apple",
      price: 300.9,
      priceWithoutDiscount: 400.0,
      discount: 12,
    },
  ];

  const store = testStore();

  let data = store.dispatch(filterProducts(actualProducts, "Sarı"));
  data = store.getState();
  expect(data.products.filteredItems).toEqual(expectedProducts);
});

test("Should generate filter product by mark", () => {
  const actualProducts = [
    {
      id: 27,
      image: 3263456345763,
      title: "Samsung",
      color: "Beyaz",
      mark: "Samsung",
      price: 134.9,
      priceWithoutDiscount: 150.0,
      discount: 12,
    },
    {
      id: 28,
      image: 9345295934692,
      title: "Apple iPhone 12 Pro",
      color: "Sarı",
      mark: "Apple",
      price: 300.9,
      priceWithoutDiscount: 400.0,
      discount: 12,
    },
  ];

  const expectedProducts = [
    {
      id: 27,
      image: 3263456345763,
      title: "Samsung",
      color: "Beyaz",
      mark: "Samsung",
      price: 134.9,
      priceWithoutDiscount: 150.0,
      discount: 12,
    },
  ];

  const store = testStore();

  let data = store.dispatch(filterProductsByMark(actualProducts, "Samsung"));
  data = store.getState();
  expect(data.products.filteredItems).toEqual(expectedProducts);
});
