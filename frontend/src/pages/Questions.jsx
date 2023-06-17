import React, { useState } from "react";

export default function QuestionsPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    setTitle(event.target.elements["card-title"].value);
    setSummary(event.target.elements["card-summary"].value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>Card Description</h3>
        <label htmlFor="card-title">Title</label>
        <input
          type="text"
          id="card-title"
          name="card-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <label htmlFor="card-summary">Summary</label>
        <input
          type="text"
          id="card-summary"
          name="card-summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
        <br />

        <h3>Disability or Need Information:</h3>
        <label htmlFor="details">
          Can you provide a description of your specific disability, condition,
          or need for which the 3D-printed item is required?
        </label>
        <input type="text" id="details" name="details" />
        <br />

        <h3>Functional Requirements:</h3>
        <label htmlFor="requirement">
          What are the desired functionalities or features you would like the
          3D-printed item to have? (e.g., grasping, gripping, specific
          movements)
        </label>
        <input type="text" id="requirement" name="requirement" required />
        <br />

        <h3>Physical Measurements or Specifications (If Applicable):</h3>
        <label htmlFor="specifications">
          What measurements or specifications are needed to ensure a comfortable
          and secure fit of the 3D-printed item? (e.g., circumference, length)
        </label>
        <input type="text" id="specifications" name="specifications" required />
        <br />

        <h3>Lifestyle and Usage:</h3>
        <label htmlFor="daily_routine">
          Could you provide relevant details about your daily routine,
          lifestyle, or specific use cases for the 3D-printed item?
        </label>
        <input type="text" id="daily_routine" name="daily_routine" required />
        <br />

        <h3>Additional Information:</h3>
        <label htmlFor="additional_requests">
          Do you have any other specific requests, concerns, or preferences that
          would help us create a tailored and suitable 3D-printed item for you?
        </label>
        <input
          type="text"
          id="additional_requests"
          name="additional_requests"
          required
        />
        <br />

        <button type="submit">Submit</button>
      </form>

      {isSubmitted && (
        <div className="card">
          <h3>{title}</h3>
          <p>{summary}</p>
        </div>
      )}
    </>
  );
}
