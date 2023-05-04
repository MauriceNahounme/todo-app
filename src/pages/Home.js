import React from "react";
import Sidebar from "../components/Navigation/Sidebar";
import Topbar from "../components/Navigation/Topbar";
import ListView from "../components/Todos/View/ListView";
import { useSelector } from "react-redux";
import TableView from "../components/Todos/View/TableView";

const Home = () => {
  const view = useSelector((state) => state.viewReducer);

  return (
    <div
      className="d-flex col-12"
      style={{
        backgroundColor: "#EBEFF2",
        height: "100%",
        width: view === "table" && "100%",
      }}
    >
      <div className="" style={{ width: "20%" }}>
        <Sidebar />
      </div>

      <div style={{ width: view === "table" ? "100%" : "80%" }}>
        <Topbar />

        <div className="mt-5 mx-4">
          {view === "table" ? <TableView /> : <ListView />}
        </div>
      </div>
    </div>
  );
};

export default Home;
