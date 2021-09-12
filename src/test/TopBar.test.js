import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import store from "../store.js";
import TopBar from "../components/TopBar";
import { setUp, findByTestAtrr, checkProps } from "./Common";

configure({ adapter: new Adapter() });

describe("TopBar Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("should get TopBar component", () => {
    const component = shallow(
      <Provider store={store}>
        <TopBar />
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
      sort: [
        {
          id: 1,
          name: "Test sort",
          value: "testValue",
        },
      ],
      filteredProducts: [
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

  it("should render a filter text", () => {
    const filterText = findByTestAtrr(wrapper, "test-filter-text");
    expect(filterText.length).toBe(1);
  });

  it("should render a select sort items field", () => {
    const filterText = findByTestAtrr(wrapper, "test-sort-select");
    expect(filterText.length).toBe(1);
  });
});

describe("Check PropTypes", () => {
  it("Should not throw a warning", () => {
    const expectedProps = {
      filterText: "Test filter text",
      sort: "Test sort item",
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

    const propsErr = checkProps(TopBar, expectedProps);
    expect(propsErr).toBeUndefined();
  });
});
