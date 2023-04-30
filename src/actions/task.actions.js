import axios from "axios";

export const GET_TASKS = "GET_TASKS";

export const getTasks = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/task`)
      .then((value) => {
        dispatch({
          type: GET_TASKS,
          payload: value.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
