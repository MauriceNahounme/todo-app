import axios from "axios";

export const GET_TASKS = "GET_TASKS";
export const POST_TASK = "POST_TASK";
export const PUT_TASK = "PUT_TASK";
export const GET_VIEW = "GET_VIEW";

export const getTodos = () => {
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

export const addTodo = (todo) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}/task`, todo)
      .then((value) => {
        dispatch({ type: POST_TASK, payload: { todo } });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const changeStep = (idTodo, step) => {
  return (dispatch) => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}/task/${idTodo}`, {
        step: step._id,
      })
      .then(() => {
        dispatch({ type: PUT_TASK, payload: { idTodo, step } });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getView = (view) => {
  return (dispatch) => {
    dispatch({ type: GET_VIEW, payload: view });
  };
};
