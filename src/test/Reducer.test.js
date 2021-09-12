import reducer from "../reducers/productReducers";
import colorReducer from "../reducers/colorReducer";
import markReducer from "../reducers/markReducer";
import { FETCH_COLORS, FETCH_MARKS } from "../actions/types";

describe("Color Reducer", () => {

  it("should return the initial state", () => {
    expect(colorReducer(undefined, {})).toEqual({
      items: [],
      currentColor: {},
    });
  });

  it("Should return new color state if receiving type", () => {
    const expectedColors = {
      items: [
        {
          id: 1,
          name: "Beyaz",
        },
        {
          id: 2,
          name: "Siyah",
        },
        {
          id: 3,
          name: "Lacivert",
        },
      ],
      currentColor: {},
    };

    const actualColors = {
      currentColor: {},
      items: {
        currentColor: {},
        items: [
          {
            id: 1,
            name: "Beyaz",
          },
          {
            id: 2,
            name: "Siyah",
          },
          {
            id: 3,
            name: "Lacivert",
          },
        ],
      },
    };

    const newState = colorReducer(undefined, {
      type: FETCH_COLORS,
      payload: expectedColors,
    });
    expect(newState).toEqual(actualColors);
  });
});

describe("Mark Reducer", () => {
  it("should return the initial state", () => {
    expect(markReducer(undefined, {})).toEqual({
      items: [],
      currentMark: {}
    });
  });

  it("Should return new mark state if receiving type", () => {
    const expectedMarks = {
      items: [
        {
          id: 1,
          name: "Apple",
        },
        {
          id: 2,
          name: "Samsung",
        },
        {
          id: 3,
          name: "Xiaomi",
        },
      ],
    };

    const actualMarks = {
      items: [
        {
          id: 1,
          name: "Apple",
        },
        {
          id: 2,
          name: "Samsung",
        },
        {
          id: 3,
          name: "Xiaomi",
        },
      ],
    };

    const newState = markReducer(undefined, {
      type: FETCH_MARKS,
      payload: expectedMarks,
    });
    expect(newState.items).toEqual(actualMarks);
  });

});
