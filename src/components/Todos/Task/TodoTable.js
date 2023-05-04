import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Badge, Card, Tooltip } from "antd";
import { FlagFilled, SyncOutlined } from "@ant-design/icons";
import moment from "moment";
const { Meta } = Card;

const TodoTable = () => {
  const steps = useSelector((state) => state.stepReducer);
  const todos = useSelector((state) => state.todoReducer);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (steps.length && todos.length) {
      setLoading(true);
    }
  }, [steps, todos]);

  return (
    <>
      <div className="d-flex justify-content-around" style={{ width: "100%" }}>
        {steps &&
          steps.map((step, index) => {
            const countAsk = todos.filter((el) => el.step.name === step.name);
            return (
              <div className="mb-2" key={index}>
                <Badge count={countAsk.length}>
                  <Avatar
                    style={{
                      backgroundColor: `${step.color}`,
                      width: 250,
                    }}
                    shape="square"
                  >
                    {step.name.toUpperCase()}
                  </Avatar>
                </Badge>

                {todos
                  .filter((el) => el.step.name === step.name)
                  .map((todo) => {
                    return (
                      <Card
                        title={todo.name}
                        style={{ width: 250, marginTop: 10, marginRight: 20 }}
                        bordered={false}
                      >
                        <p style={{ color: "gray" }}>
                          {todo.description && todo.description}
                        </p>

                        <div className="d-flex justify-content-between mt-3">
                          <div>
                            {todo.priority === "Normale" && (
                              <Tooltip title={todo.priority}>
                                <FlagFilled
                                  style={{
                                    fontSize: "1.1em",
                                    color: "#6FDDFF",
                                  }}
                                />
                              </Tooltip>
                            )}
                            {todo.priority === "Urgente" && (
                              <Tooltip title={todo.priority}>
                                <FlagFilled
                                  style={{ fontSize: "1.1em", color: "red" }}
                                />
                              </Tooltip>
                            )}
                            {todo.priority === "Élevée" && (
                              <Tooltip title={todo.priority}>
                                <FlagFilled
                                  style={{ fontSize: "1.1em", color: "Orange" }}
                                />
                              </Tooltip>
                            )}
                            {todo.priority === "Basse" && (
                              <Tooltip title={todo.priority}>
                                <FlagFilled
                                  style={{ fontSize: "1.1em", color: "grey" }}
                                />
                              </Tooltip>
                            )}
                          </div>

                          <div>
                            {todo.assign && (
                              <Tooltip
                                title={
                                  todo.assign.first_name +
                                  " " +
                                  todo.assign.last_name
                                }
                              >
                                <Avatar
                                  style={{
                                    backgroundColor: "orange",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  {todo.assign.first_name?.slice(0, 1) +
                                    todo.assign.last_name?.slice(0, 1)}
                                </Avatar>
                              </Tooltip>
                            )}
                          </div>
                          <Meta
                            description={
                              todo.deadline && moment(todo.deadline).format("L")
                            }
                          />
                        </div>
                      </Card>
                    );
                  })}
              </div>
            );
          })}
      </div>

      <div className="text-center mt-5" style={{ height: "100vh" }}>
        {!loading && (
          <SyncOutlined style={{ fontSize: "2.2em", color: "blue" }} spin />
        )}
      </div>
    </>
  );
};

export default TodoTable;
