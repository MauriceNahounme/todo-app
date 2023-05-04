import React, { useState } from "react";
import {
  UnorderedListOutlined,
  CalendarOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useDispatch } from "react-redux";
import { getView } from "../../actions/todo.actions";

const Topbar = () => {
  const dispatch = useDispatch();

  const [current, setCurrent] = useState("list");
  const onClick = (e) => {
    // console.log("click ", e);
    setCurrent(e.key);
    dispatch(getView(e.key));
  };

  const items = [
    {
      label: "List",
      key: "list",
      icon: <UnorderedListOutlined />,
    },
    {
      label: "Tableau",
      key: "table",
      icon: <DatabaseOutlined />,
    },
    // {
    //   label: "Calendrier",
    //   key: "calendar",
    //   icon: <CalendarOutlined />,
    // },
  ];

  return (
    <div>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        style={{
          backgroundColor: "#1E1F21",
          color: "#FFFFFF",
        }}
      />
    </div>
  );
};

export default Topbar;
