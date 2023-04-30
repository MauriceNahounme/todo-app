import React, { useState } from "react";
import {
  TableOutlined,
  AppstoreOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem(
    "Tableau de bord",
    "sub1",
    <TableOutlined style={{ fontSize: "20px", color: "#08c" }} />,
    [
      getItem("Accueil", "1"),
      getItem("Notifications", "2"),
      getItem("Objectifs", "3"),
    ]
  ),
  getItem(
    "Favoris",
    "sub2",
    <LineChartOutlined style={{ fontSize: "20px", color: "green" }} />,
    [getItem("Entreprises", "5"), getItem("Utilisateurs", "6")]
  ),
  getItem(
    "Espace",
    "sub3",
    <AppstoreOutlined style={{ fontSize: "20px", color: "#657798" }} />,
    [
      getItem("Sogeti", "sub4", null, [
        getItem("App", "7"),
        getItem("Api 8", "8"),
      ]),
    ]
  ),
];

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

const Sidebar = () => {
  const [openKeys, setOpenKeys] = useState(["sub1"]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const handleClick = (keys) => {
    if (keys.key === "1") {
      window.location = "/";
    }
  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      onClick={handleClick}
      style={{
        height: "100%",
        backgroundColor: "#1E1F21",
        color: "#FFFFFF",
        paddingTop: 30,
      }}
      items={items}
    />
  );
};

export default Sidebar;
