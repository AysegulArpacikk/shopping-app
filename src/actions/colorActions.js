import { FETCH_COLORS, CHANGE_COLOR } from "./types";

export const fetchColors = () => (dispatch) => {
  fetch("http://localhost:8000/colors")
    .then((res) => res.json())
    .catch((err) =>
      fetch("db.json")
        .then((res) => res.json())
        .then((data) => data.colors)
    )
    .then((data) => {
      dispatch({ type: FETCH_COLORS, payload: data });
    });
};

export function changeColor(color) {
  return { type: CHANGE_COLOR, payload: color };
}
