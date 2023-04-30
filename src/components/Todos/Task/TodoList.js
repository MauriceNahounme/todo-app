import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { SearchOutlined, FlagFilled } from "@ant-design/icons";
import { Button, Input, Space, Table, Badge, Avatar, Tooltip } from "antd";
import Highlighter from "react-highlight-words";
import moment from "moment";
import AddTodo from "./AddTodo";

const TodoList = () => {
  const steps = useSelector((state) => state.stepReducer);
  const tasks = useSelector((state) => state.taskReducer);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Todo",
      dataIndex: "task",
      key: "task",
      width: "50%",
      ...getColumnSearchProps("task"),
    },
    {
      title: "Assigné",
      dataIndex: "assign",
      key: "assign",
      width: "20%",
      ...getColumnSearchProps("assign"),
    },
    {
      title: "Priorité",
      dataIndex: "priority",
      key: "priority",
      width: "10%",
      render: (priority) => (
        <>
          {priority === "Normal" && (
            <Tooltip title={priority}>
              <FlagFilled style={{ fontSize: "1.3em", color: "#6FDDFF" }} />
            </Tooltip>
          )}
          {priority === "Urgent" && (
            <Tooltip title={priority}>
              <FlagFilled style={{ fontSize: "1.3em", color: "red" }} />
            </Tooltip>
          )}
          {priority === "Élevé" && (
            <Tooltip title={priority}>
              <FlagFilled style={{ fontSize: "1.3em", color: "Orange" }} />
            </Tooltip>
          )}
          {priority === "Bas" && (
            <Tooltip title={priority}>
              <FlagFilled style={{ fontSize: "1.3em", color: "grey" }} />
            </Tooltip>
          )}
        </>
      ),
      // sorter: (a, b) => a.priority.length - b.priority.length,
      // sortDirections: ["descend", "ascend"],
    },
    {
      title: "Echéance",
      dataIndex: "deadline",
      key: "deadline",
      width: "10%",
    },
  ];

  const data = tasks.map((task) => {
    return {
      key: task._id,
      task: task.name,
      assigne: `${task.last_name && task.last_name} ${
        task.first_name && task.first_name
      }`,
      priority: task.priority && task.priority,
      deadline: task.deadline && moment(task.deadline).format("LLL"),
      step: task.step && task.step.name,
    };
  });

  // console.log("data", data);

  return (
    <div>
      {steps.map((step) => {
        const countAsk = data.filter((el) => el.step === step.name);
        return (
          <div className="mb-2">
            <Badge count={countAsk.length}>
              <Avatar
                style={{
                  backgroundColor: `${step.color}`,
                  width: 80,
                }}
                shape="square"
              >
                {step.name.toUpperCase()}
              </Avatar>
            </Badge>
            <AddTodo />

            <div>
              <Table
                columns={columns}
                dataSource={data.filter((el) => el.step === step.name)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
