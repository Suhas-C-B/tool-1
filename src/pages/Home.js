import zIndex from "@mui/material/styles/zIndex";
import React from "react";
import "./Home.css";

import Car from "C:/Users/ASPLUSER/Desktop/React/annotation-tool/annotation-tool/src/pages/car.jpg";
import Drone from "C:/Users/ASPLUSER/Desktop/React/annotation-tool/annotation-tool/src/pages/drone.jpg";

function Home() {
  return (
    <div className="home-main-div">
      <div
        style={{
          positio: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "20px 9%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a>Annotation-Tool</a>
        <nav style={{ fontSize: "25px", color: "#666", marginLeft: "20px" }}>
          <a>Home</a>
          <a>About</a>
        </nav>
      </div>
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          gap: "15px",
          padding: "20px 9%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ flex: "1 1 400px" }}>
          <h3></h3>
          <p>Welcome to the annotation tool</p>
          <a>Sign-up</a>
        </div>
        <div style={{ flex: "1 1 400px", position: "relative" }}>
          <img
            style={{
              width: "400px",
              height: "200px",
              transform: "rotate(0deg)",
            }}
            src="https://pngimg.com/uploads/drone/drone_PNG108.png"
            alt=""
          />
          <img style={{width: '400px', height: '200px'}}
            src="https://tse2.mm.bing.net/th?id=OIP.xlYL5Z-M3inc-6Zza0SmWwHaE0&pid=Api&P=0"
            alt=""
          />
        </div>
      </section>
    </div>
  );
}

export default Home;
