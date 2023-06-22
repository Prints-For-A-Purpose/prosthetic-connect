import React, { useState, useEffect } from "react";

const ProgressBar = ({ newColor, newProgress }) => {
  const [containerStyles, setContainerStyles] = useState({
    height: 20,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    // margin: 50,
  });

  const [fillerStyles, setFillerStyles] = useState({
    height: "100%",
    width: `${newProgress}%`,
    backgroundColor: newColor,
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
        <span style={labelStyles}>{`${newProgress}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
