import React from "react";
import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";

export default function RequestBox({ request }) {
  const { request_status } = request;

  const progressStatus = {
    Active: {
      newColor: "#ff9800",
      newProgress: 30,
    },
    In_progress: {
      newColor: "#2196f3",
      newProgress: 50,
    },
    Done: {
      newColor: "#4caf50",
      newProgress: 100,
    },
  };

  const { newColor, newProgress } =
    progressStatus[request_status] || progressStatus.Active;

  return (
    <div className="request-container">
      <div className="request-card">
        <Link to={`/requests/${request.id}/`} className="request-link">
          I Have {request.q1_disability_info}
        </Link>
        <div>
          status {request.request_status}
          <h2>Functional Requirements:</h2>
          <p>{request.q2_functional_requirements}</p>
        </div>
        <div>
          <h2>Intended Usage:</h2>
          <p>{request.q4_lifestyle_usage}</p>
        </div>
        <ProgressBar newColor={newColor} newProgress={newProgress} />
      </div>
    </div>
  );
}
