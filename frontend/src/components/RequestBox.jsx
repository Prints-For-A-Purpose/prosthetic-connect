import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";

export default function RequestBox({ request, status }) {
  const progressStatus = {
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

  const { color, progress } = progressStatus[status] || progressStatus.Active;

  return (
    <div className="request-container">
    <div className="request-card">
      <Link to={`/requests/${request.id}/`}className="request-link">
        I Have {request.q1_disability_info}
      </Link>
      <h4>I need help with: </h4>
      <p>{request.q2_functional_requirements}</p>
      <h4>I use it for: </h4>
      <p>{request.q4_lifestyle_usage}</p>
      <ProgressBar color={color} progress={progress} />
    </div>
    </div>
  );
}
