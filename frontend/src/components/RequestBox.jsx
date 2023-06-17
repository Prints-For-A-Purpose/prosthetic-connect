import { Link } from "react-router-dom";

export default function RequestBox({ request }) {
  return (
    <div style={{ borderStyle: "dotted", width: "200px", margin: "10px" }}>
      <Link to={`/requests/${request.id}/`}>
        I Have {request.q1_disability_info}
      </Link>
      <h4>I need help with: </h4>
      <p>{request.q2_functional_requirements}</p>
      <h4>I use it for: </h4>
      <p>{request.q4_lifestyle_usage}</p>
    </div>
  );
}
