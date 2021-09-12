import { FETCH_MARKS, CHANGE_MARK } from "./types";

export const fetchMarks = () => (dispatch) => {
  fetch("http://localhost:8000/marks")
    .then((res) => res.json())
    .catch((err) =>
      fetch("db.json")
        .then((res) => res.json())
        .then((data) => data.marks)
    )
    .then((data) => {
      dispatch({ type: FETCH_MARKS, payload: data });
    });
};

export function changeMark(mark) {
  return { type: CHANGE_MARK, payload: mark };
}
