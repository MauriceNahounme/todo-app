import React from "react";
import Sidebar from "../components/Navigation/Sidebar";
import Topbar from "../components/Navigation/Topbar";
import ListView from "../components/Todos/View/ListView";

const Home = () => {
  return (
    <div
      className="d-flex col-12"
      style={{ backgroundColor: "#EBEFF2", height: "100%" }}
    >
      <div className="" style={{ width: "20%" }}>
        <Sidebar />
      </div>

      <div style={{ width: "80%" }}>
        <Topbar />

        <div className="mt-5 mx-4">
          <ListView />
        </div>
      </div>
    </div>
  );
};

export default Home;
