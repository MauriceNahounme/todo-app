import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SearchOutlined, FlagFilled, SyncOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Badge, Avatar, Tooltip } from "antd";
import Highlighter from "react-highlight-words";
import moment from "moment";
import "moment/locale/fr";
import AddTodo from "./AddTodo";
import ChangeStep from "./ChangeStep";

const TodoList = () => {
  const steps = useSelector((state) => state.stepReducer);
  const tasks = useSelector((state) => state.todoReducer);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState();
  const [loading, setLoading] = useState(false);

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
      render: (assign) => (
        <>
          {assign.last && assign.first && (
            <Tooltip title={assign.first + " " + assign.last}>
              <Avatar
                style={{
                  backgroundColor: "orange",
                  verticalAlign: "middle",
                }}
                size="large"
              >
                {assign.first?.slice(0, 1) + assign.last?.slice(0, 1)}
              </Avatar>
            </Tooltip>
          )}
        </>
      ),
    },
    {
      title: "Priorité",
      dataIndex: "priority",
      key: "priority",
      width: "10%",
      render: (priority) => (
        <>
          {priority === "Normale" && (
            <Tooltip title={priority}>
              <FlagFilled style={{ fontSize: "1.3em", color: "#6FDDFF" }} />
            </Tooltip>
          )}
          {priority === "Urgente" && (
            <Tooltip title={priority}>
              <FlagFilled style={{ fontSize: "1.3em", color: "red" }} />
            </Tooltip>
          )}
          {priority === "Élevée" && (
            <Tooltip title={priority}>
              <FlagFilled style={{ fontSize: "1.3em", color: "Orange" }} />
            </Tooltip>
          )}
          {priority === "Basse" && (
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

  const data = tasks
    .sort((a, b) => moment(b.createdAt) - moment(a.createdAt))
    .map((task) => {
      return {
        key: task._id,
        task: task.name,
        assign: {
          last: task.assign && `${task.assign?.last_name}`,
          first: task.assign && `${task.assign?.first_name}`,
        },
        priority: task.priority && task.priority,
        deadline: task.deadline && moment(task.deadline).format("L"),
        step: task.step && task.step.name,
      };
    });

  const onSelectChange = (newSelectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
    if (newSelectedRowKeys.length === 0) {
      setSelectedRowKeys("");
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    if (steps.length && tasks.length) {
      setLoading(true);
    }
  }, [steps, tasks]);

  return (
    <>
      <div>
        {steps &&
          steps.map((step, index) => {
            const countAsk = data.filter((el) => el.step === step.name);
            return (
              <div className="mb-2" key={index}>
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

                <AddTodo step={step} />
                {selectedRowKeys && (
                  <ChangeStep step={step} ids={selectedRowKeys} />
                )}

                <div className="mb-4">
                  <Table
                    columns={columns}
                    dataSource={data.filter((el) => el.step === step.name)}
                    rowSelection={rowSelection}
                    onRow={(record) => {
                      return {
                        onClick: (e) => console.log(record),
                      };
                    }}
                  />
                </div>
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

export default TodoList;
