import React from "react";
import { shallow, configure } from "enzyme";
import Filter from "../components/Filter";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import store from "../store.js";
import { setUp, findByTestAtrr, checkProps} from "./Common";

configure({ adapter: new Adapter() });

describe("Filter Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("should get Filter component", () => {
    const component = shallow(
      <Provider store={store}>
        <Filter />
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
      sortTitle: "test title",
      marks: [
        {
          id: 1,
          name: "Samsung",
        },
      ],
      colors: [
        {
          id: 1,
          name: "Beyaz",
        },
      ],
    };
    wrapper = setUp(props);
  });

  it("should render a sort filter", () => {
    const mark = findByTestAtrr(wrapper, "test-sort");
    expect(mark.length).toBe(1);
  });

  it("should render a mark filter", () => {
    const mark = findByTestAtrr(wrapper, "test-mark");
    expect(mark.length).toBe(1);
  });

  it("should render a color filter", () => {
    const color = findByTestAtrr(wrapper, "test-color");
    expect(color.length).toBe(1);
  });
});

describe("Check PropTypes", () => {
  it("Should not throw a warning", () => {
    const expectedProps = {
      filterText: "Test filter text",
      color: "Beyaz",
      colors: [
        {
          id: 1,
          name: "Beyaz",
        },
      ],
      marks: [
        {
          id: 1,
          name: "Samsung",
        },
      ],
    };

    const propsErr = checkProps(Filter, expectedProps);
    expect(propsErr).toBeUndefined();
  });
});
