import React from "react";
import { SwapOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { changeStep, getTodos } from "../../../actions/todo.actions";

const ChangeStep = ({ step, ids }) => {
  const steps = useSelector((state) => state.stepReducer);
  const dispatch = useDispatch();

  return (
    <>
      <SwapOutlined
        style={{
          fontSize: "1.7em",
          marginLeft: 25,
          position: "relative",
          top: "-4px",
        }}
      />
      {steps
        .filter((el) => el._id !== step._id)
        .map((step, index) => {
          return (
            <span className="mx-2" key={index}>
              <Button
                shape="round"
                style={{
                  backgroundColor: `${step.color}`,
                }}
                onClick={() => {
                  ids.map((id) => {
                    dispatch(changeStep(id, step));
                    dispatch(getTodos());
                    window.location.reload();
                  });
                }}
              />
            </span>
          );
        })}
    </>
  );
};

export default ChangeStep;
