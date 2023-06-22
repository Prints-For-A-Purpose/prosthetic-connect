import React, { useState } from "react";

const ProgressBar = ({ color, progress }) => {
  const [containerStyles, setContainerStyles] = useState({
    height: 20,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    // margin: 50,
  });

  const [fillerStyles, setFillerStyles] = useState({
    height: "100%",
    width: `${progress}%`,
    backgroundColor: color,
    borderRadius: "inherit",
    textAlign: "right",
  });

  const [labelStyles] = useState({
    padding: 5,
    color: "white",
    fontWeight: "bold",
  });

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
