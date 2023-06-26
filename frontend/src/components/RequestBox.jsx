import React from "react";
import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";

export default function RequestBox({ request }) {
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
        <ProgressBar request={request} />
      </div>
    </div>
  );
}
