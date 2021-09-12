import React from "react";
import { mount } from "enzyme";
import App from "../App";
import checkPropTypes from "check-prop-types";


export const setUp = (props = {}) => {
  const component = mount(<App {...props} />);
  return component;
};

export const findByTestAtrr = (component, atrr) => {
  const wrapper = component.find(`[data-test='${atrr}']`);
  return wrapper;
};

export const checkProps = (component, expectedProps) => {
  const propsErr = checkPropTypes(
    component.propTypes,
    expectedProps,
    "props",
    component.name
  );
  return propsErr;
};