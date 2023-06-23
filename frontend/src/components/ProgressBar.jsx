import React, { useState, useEffect } from "react";
import { Gradient } from "../Gradient";

const ProgressBar = ({ request }) => {
  const { request_status } = request;
  const progressStatus = {
    Pending: {
      color: "#ff1100",
      progress: 5,
    },
    Planning: {
      color: "#ff9222",
      progress: 10,
    },
    Design: {
      color: "#f8e03e",
      progress: 30,
    },
    Development: {
      color: "#5bee5b",
      progress: 50,
    },
    Testing: {
      color: "#12a3a3",
      progress: 70,
    },
    Review: {
      color: "#1c99c0",
      progress: 80,
    },
    Iteration: {
      color: "#ce00ce",
      progress: 90,
    },
    Documentation: {
      color: "#a12cf7",
      progress: 95,
    },
    Deployment: {
      color: "#008080",
      progress: 100,
    },
    Archived: {
      color: "#ff1100",
      progress: 0,
    },
  };

  const [newColor, setColor] = useState(
    progressStatus[request_status]["color"]
  );
  const [newProgress, setProgress] = useState(
    progressStatus[request_status]["progress"]
  );

  useEffect(() => {
    setColor(progressStatus[request_status].color);
    setProgress(progressStatus[request_status].progress);
  }, [request]);

  const containerStyles = {
    height: 45,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    overflow: "hidden",
  };

  const fillerStyles = {
    height: "100%",
    width: `${newProgress}%`,
    backgroundColor: newColor,
    borderRadius: "inherit",
    textAlign: "right",
  };

  const labelStyles = {
    color: newProgress === 0 || newProgress === 30 ? "black" : "white",
    fontWeight: "bold",
    position: "sticky",
    top: "25%",
    bottom: "25%",
    right: "5%",
    zIndex: 1000,
  };

  const canvasColor = [
    {
      "--gradient-color-1": "#4A4E4D",
      "--gradient-color-2": "#0E9AA7",
      "--gradient-color-3": "#F6CD61",
      "--gradient-color-4": "#3DA4AB",
      width: "1032",
      height: "600",
    },
    {
      "--gradient-color-1": "#1F9EA3",
      "--gradient-color-2": "#F8BD97",
      "--gradient-color-3": "#9E5428",
      "--gradient-color-4": "#3B0102",
      width: "1032",
      height: "600",
    },
    {
      "--gradient-color-1": "#043D5D",
      "--gradient-color-2": "#032E46",
      "--gradient-color-3": "#23B684",
      "--gradient-color-4": "#0F595E",
      width: "1032",
      height: "600",
    },
    {
      "--gradient-color-1": "#FE6860",
      "--gradient-color-2": "#FE8A71",
      "--gradient-color-3": "#D9BBAE",
      "--gradient-color-4": "#F3C9BF",
      width: "1032",
      height: "600",
    },
    {
      "--gradient-color-1": "#D1D5D8",
      "--gradient-color-2": "#3498DB",
      "--gradient-color-3": "#E74C3C",
      "--gradient-color-4": "#F1C40F",
      width: "1032",
      height: "600",
    },
    {
      "--gradient-color-1": "#c3e4ff",
      "--gradient-color-2": "#6ec3f4",
      "--gradient-color-3": "#eae2ff",
      "--gradient-color-4": "#b9beff",
      width: "1032",
      height: "600",
    },
    {
      "--gradient-color-1": "#53DF83",
      "--gradient-color-2": "#47D2E9",
      "--gradient-color-3": "#3F3F3F",
      "--gradient-color-4": "#EEEEEE",
      width: "1032",
      height: "600",
    },
    {
      "--gradient-color-1": "#2D3E50",
      "--gradient-color-2": "#01C26E",
      "--gradient-color-3": "#E24C3F",
      "--gradient-color-4": "#F3C40F",
      width: "1032",
      height: "600",
    },
    {
      "--gradient-color-1": "#4CD4B0",
      "--gradient-color-2": "#FFFCE6",
      "--gradient-color-3": "#F24D16",
      "--gradient-color-4": "#EDD834",
      width: "1032",
      height: "600",
    },
  ];

  const gradient = new Gradient();
  gradient.initGradient(".gradient-canvas");
  let canvas = document.getElementsByClassName(".gradient-canvas");

  return (
    <>
      <div style={containerStyles}>
        <div style={fillerStyles}>
          {newProgress === 100 && (
            <canvas
              className="gradient-canvas"
              data-js-darken-top=""
              data-transition-in=""
              style={canvasColor[Math.floor(Math.random() * 9)]}
            ></canvas>
          )}
          <span style={labelStyles}>{`${newProgress}%`}</span>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
