import React from "react";

const ProgressBar = ({ percentage }) => {
  const getStatusStyles = (status) => {
    const statusStyles = {
      Active: {
        color: "#ff9800",
        progress: 30,
      },
      In_progress: {
        color: "#2196f3",
        progress: 50,
      },
      Done: {
        color: "#4caf50",
        progress: 100,
      },
    };
    return statusStyles[status] || statusStyles.Active;
  };

  const { color, progress } = getStatusStyles(percentage);

  const containerStyles = {
    height: 20,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 50,
  };

  const fillerStyles = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: color,
    borderRadius: "inherit",
    textAlign: "right",
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
