import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { createRequests } from "../adapters/request-adapter";
import CurrentUserContext from "../contexts/current-user-context";

export default function QuestionsPage() {
  const navigate = useNavigate();
  const { currentUser } = useContext(CurrentUserContext);

  if (currentUser === null) return <Navigate to="/sign-up" />;

  const [request, setRequest] = useState({
    title: "",
    summary: "",
    q1_disability_info: "",
    q2_functional_requirements: "",
    q3_physical_specifications: "",
    q4_lifestyle_usage: "",
    q5_additional: "",
  });

  const onChange = (event) => {
    setRequest({
      ...request,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newRequest = await createRequests(request);
    navigate(`../requests/${newRequest[0].id}/`);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>Card Description</h3>
        <label htmlFor="card-title">Title</label>
        <input
          type="text"
          id="card-title"
          name="title"
          onChange={onChange}
          required
        />
        <br />
        <label htmlFor="card-summary">Summary</label>
        <input
          type="text"
          id="card-summary"
          name="summary"
          onChange={onChange}
          required
        />
        <br />

        <h3>Disability or Need Information:</h3>
        <label htmlFor="q1_disability_info">
          Can you provide a description of your specific disability, condition,
          or need for which the 3D-printed item is required?
        </label>
        <input
          type="text"
          id="q1_disability_info"
          name="q1_disability_info"
          onChange={onChange}
        />
        <br />

        <h3>Functional Requirements:</h3>
        <label htmlFor="q2_functional_requirements">
          What are the desired functionalities or features you would like the
          3D-printed item to have? (e.g., grasping, gripping, specific
          movements)
        </label>
        <input
          type="text"
          id="q2_functional_requirements"
          name="q2_functional_requirements"
          onChange={onChange}
          required
        />
        <br />

        <h3>Physical Measurements or Specifications (If Applicable):</h3>
        <label htmlFor="q3_physical_specifications">
          What measurements or specifications are needed to ensure a comfortable
          and secure fit of the 3D-printed item? (e.g., circumference, length)
        </label>
        <input
          type="text"
          id="q3_physical_specifications"
          name="q3_physical_specifications"
          onChange={onChange}
          required
        />
        <br />

        <h3>Lifestyle and Usage:</h3>
        <label htmlFor="q4_lifestyle_usage">
          Could you provide relevant details about your daily routine,
          lifestyle, or specific use cases for the 3D-printed item?
        </label>
        <input
          type="text"
          id="q4_lifestyle_usage"
          name="q4_lifestyle_usage"
          onChange={onChange}
          required
        />
        <br />

        <h3>Additional Information:</h3>
        <label htmlFor="q5_additional">
          Do you have any other specific requests, concerns, or preferences that
          would help us create a tailored and suitable 3D-printed item for you?
        </label>
        <input
          type="text"
          id="q5_additional"
          name="q5_additional"
          onChange={onChange}
          required
        />
        <br />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
