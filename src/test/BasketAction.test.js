import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { addToCart, removeFromCart } from "../actions/cartActions";
import rootReducer from "../reducers/index";

const testStore = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
  return createStoreWithMiddleware(rootReducer, initialState);
};

test("Should generate add product to cart", () => {
  const addedProduct = {
    id: 27,
    image: 3263456345763,
    title: "Samsung",
    color: "Sarı",
    mark: "Samsung",
    price: 134.9,
    priceWithoutDiscount: 150.0,
    discount: 12,
  };

  const expectedBasketItem = [
    {
      id: 27,
      image: 3263456345763,
      title: "Samsung",
      color: "Sarı",
      mark: "Samsung",
      price: 134.9,
      priceWithoutDiscount: 150.0,
      discount: 12,
      count: 1,
    },
  ];

  const store = testStore();

  let data = store.dispatch(addToCart([], addedProduct));
  data = store.getState();
  expect(data.cart.items).toEqual(expectedBasketItem);
});

test("Should generate remove product from cart", () => {
  const basket = [
    {
      id: 27,
      image: 3263456345763,
      title: "Samsung",
      color: "Sarı",
      mark: "Samsung",
      price: 134.9,
      priceWithoutDiscount: 150.0,
      discount: 12,
      count: 1,
    },
    {
      id: 28,
      image: 93593245692845,
      title: "iPhone",
      color: "Beyaz",
      mark: "Apple",
      price: 134.9,
      priceWithoutDiscount: 150.0,
      discount: 12,
      count: 1,
    },
  ];

  const deletedProduct = {
    id: 27,
    image: 3263456345763,
    title: "Samsung",
    color: "Sarı",
    mark: "Samsung",
    price: 134.9,
    priceWithoutDiscount: 150.0,
    discount: 12,
  };

  const expectedBasketItems = [
    {
      id: 28,
      image: 93593245692845,
      title: "iPhone",
      color: "Beyaz",
      mark: "Apple",
      price: 134.9,
      priceWithoutDiscount: 150.0,
      discount: 12,
      count: 1,
    },
  ];

  const store = testStore();

  let data = store.dispatch(removeFromCart(basket, deletedProduct));
  data = store.getState();
  expect(data.cart.items).toEqual(expectedBasketItems);
});
