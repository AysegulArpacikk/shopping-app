import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import store from "../store.js";
import Header from "../components/Header.js";
import { setUp, findByTestAtrr, checkProps} from "./Common";


configure({ adapter: new Adapter() });

describe("Header Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("should get Header component", () => {
    const component = shallow(
      <Provider store={store}>
        <Header/>
      </Provider>
    );
    expect(component.length).toEqual(1);
    expect(component.getElements()).toMatchSnapshot();
  });
});

describe("should get element on Header Component", () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        filterText: "Test text",
      };
      console.log(props);
      wrapper = setUp(props);
    });

    it("should get input element", () => {
        const input = findByTestAtrr(wrapper, "input-text");
        expect(input.length).toBe(1);
    });

    it("should get logo element", () => {
        const input = findByTestAtrr(wrapper, "test-logo");
        expect(input.length).toBe(1);
    });

    it("should get basket", () => {
        const input = findByTestAtrr(wrapper, "test-basket");
        expect(input.length).toBe(1);
    });
});

describe("Check PropTypes", () => {
    it("Should not throw a warning", () => {
      const expectedProps = {
        filterText: "Test filter text",
      };
  
      const propsErr = checkProps(Header, expectedProps);
      expect(propsErr).toBeUndefined();
    });
});
  



