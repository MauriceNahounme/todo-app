import axios from "axios";

export const GET_STEPS = "GET_STEPS";

export const getSteps = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/step`)
      .then((value) => {
        dispatch({
          type: GET_STEPS,
          payload: value.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
