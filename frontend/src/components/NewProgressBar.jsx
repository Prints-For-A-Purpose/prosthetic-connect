import React, { useState, useEffect } from "react";
import { Badge, Card, Grid, Text, Progress } from "@nextui-org/react";

import { Gradient } from "../Gradient";

const NewProgressBar = ({ request }) => {
  const { request_status } = request;
  const progressStatus = {
    Pending: {
      color: "hsl(4, 100%, 50%)",
      progress: 5,
    },
    Planning: {
      color: "hsl(30, 100%, 57%)",
      progress: 10,
    },
    Design: {
      color: "hsl(30, 100%, 57%)",
      progress: 30,
    },
    Development: {
      color: "hsl(120, 81%, 65%)",
      progress: 50,
    },
    Testing: {
      color: "hsl(180, 80%, 35%)",
      progress: 70,
    },
    Review: {
      color: "hsl(194, 75%, 43%)",
      progress: 80,
    },
    Iteration: {
      color: "hsl(300, 100%, 40%)",
      progress: 90,
    },
    Documentation: {
      color: "hsl(275, 93%, 57%)",
      progress: 95,
    },
    Deployment: {
      color: "hsl(180, 100%, 25%)",
      progress: 100,
    },
    Archived: {
      color: "hsl(4, 100%, 50%)",
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

  return (
    <>
      <Progress
        value={newProgress}
        shadow
        color={"secondary"}
        status="primary"
        size="md"
        css={{ "--nextui--progressColor": newColor }}
      />
    </>
  );
};

export default NewProgressBar;
