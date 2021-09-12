import React from "react";
import { shallow, configure, mount } from "enzyme";
import Filter from "../components/Filter";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import store from "../store.js";
import Products from "../components/Products";
import { setUp, findByTestAtrr, checkProps } from "./Common";

configure({ adapter: new Adapter() });

describe("Product Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("should get Product component", () => {
    const component = shallow(
      <Provider store={store}>
        <Products />
      </Provider>
    );
    expect(component.length).toEqual(1);
    expect(component.getElements()).toMatchSnapshot();
  });
});

describe("Have props", () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      filterText: "test",
      products: [
        {
          id: 1,
          image: 8463567356,
          title: "Test title",
          mark: "Test mark",
          color: "Beyaz",
          price: 800.85,
          priceWithoutDiscount: 900.0,
          discout: 2,
        },
      ],
      cartItems: [
        {
          id: 1,
          image: 8463567356,
          title: "Test title",
          mark: "Test mark",
          color: "Beyaz",
          price: 800.85,
          priceWithoutDiscount: 900.0,
          discout: 2,
        },
      ],
    };
    wrapper = setUp(props);
  });

  it("should render product image and title", () => {
    const title = findByTestAtrr(wrapper, "test-product-info");
    expect(title.length).toBe(1);
  });
});

describe("Check PropTypes", () => {
  it("Should not throw a warning", () => {
    const expectedProps = {
      filterText: "Test filter text",
      cartItems: [
        {
          id: 1,
          title: "Test title",
          color: "Siyah",
          mark: "Apple",
          price: 500,
        },
      ],
      filteredProducts: [
        {
          id: 1,
          title: "Test title",
          color: "Siyah",
          mark: "Apple",
          price: 500,
        },
      ],
    };

    const propsErr = checkProps(Products, expectedProps);
    expect(propsErr).toBeUndefined();
  });
});
