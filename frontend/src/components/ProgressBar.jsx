import React, { useState, useEffect } from "react";
import { Progress } from "@nextui-org/react";

const ProgressBar = ({ request, size }) => {
  const { request_status } = request;
  const progressStatus = {
    Pending: {
      color: "hsl(4, 100%, 50%)",
      progress: 5,
      bkg: "hsl(4, 100%, 90%)",
    },
    Planning: {
      color: "hsl(30, 100%, 57%)",
      progress: 10,
      bkg: "hsl(30, 100%, 90%)",
    },
    Design: {
      color: "hsl(52,93%,61%)",
      progress: 30,
      bkg: "hsl(52, 93%, 85%)",
    },
    Development: {
      color: "hsl(120, 81%, 65%)",
      progress: 50,
      bkg: "hsl(120, 81%, 85%)",
    },
    Testing: {
      color: "hsl(180, 80%, 35%)",
      progress: 70,
      bkg: "hsl(180, 80%, 85%)",
    },
    Review: {
      color: "hsl(194, 75%, 43%)",
      progress: 80,
      bkg: "hsl(194, 75%, 75%)",
    },
    Iteration: {
      color: "hsl(300, 100%, 40%)",
      progress: 90,
      bkg: "hsl(300, 100%, 85%)",
    },
    Documentation: {
      color: "hsl(275, 93%, 57%)",
      progress: 95,
      bkg: "hsl(275, 93%, 80%)",
    },
    Deployment: {
      color: `linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%);`,
      progress: 100,
      bkg: "hsl(299, 100%, 85%)",
    },
    Archived: {
      color: "hsl(4, 100%, 50%)",
      progress: 0,
      bkg: "hsl(4, 100%, 80%)",
    },
  };

  const [newColor, setColor] = useState(
    progressStatus[request_status]["color"]
  );

  const [newBkg, setBkg] = useState(progressStatus[request_status]["bkg"]);

  const [newProgress, setProgress] = useState(
    progressStatus[request_status]["progress"]
  );

  useEffect(() => {
    setColor(progressStatus[request_status].color);
    setProgress(progressStatus[request_status].progress);
    setBkg(progressStatus[request_status].bkg);
  }, [request]);

  return (
    <>
      <Progress
        value={newProgress}
        shadow
        color={"secondary"}
        status="primary"
        size={size}
        css={{
          "--nextui--progressColor": newColor,
          background: newBkg,
        }}
      />
    </>
  );
};

export default ProgressBar;
