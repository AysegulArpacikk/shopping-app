import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import store from "../store.js";
import { setUp, findByTestAtrr, checkProps} from "./Common";
import Basket from "../components/Basket.js";

configure({ adapter: new Adapter() });

describe("Basket Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("should get Basket component", () => {
    const component = shallow(
      <Provider store={store}>
        <Basket />
      </Provider>
    );
    expect(component.length).toEqual(1);
    expect(component.getElements()).toMatchSnapshot();
  });

});

describe("Check PropTypes", () => {
  it("Should not throw a warning", () => {
    const expectedProps = {
      cartItems: [
        {
            id: 1,
            image: 8463567356,
            title: "Test title",
            color: "Siyah",
            mark: "Apple",
            price: 500,
          }
      ]
    };

    const propsErr = checkProps(Basket, expectedProps);
    expect(propsErr).toBeUndefined();
  });
});
