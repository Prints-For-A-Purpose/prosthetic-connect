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
    <div style={{ borderStyle: "dotted", width: "200px", margin: "10px" }}>
      <Link to={`/requests/${request.id}/`}>
        I Have {request.q1_disability_info}
      </Link>
      <h4>I need help with: </h4>
      <p>{request.q2_functional_requirements}</p>
      <h4>I use it for: </h4>
      <p>{request.q4_lifestyle_usage}</p>
      <ProgressBar color={color} progress={progress} />
    </div>
  );
}
