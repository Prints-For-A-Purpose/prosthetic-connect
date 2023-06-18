import React, { useState } from "react";

export default function QuestionsPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [request, setRequest] = useState({
    title: "",
    summary: "",
    details: "",
    requirement: "",
    specifications: "",
    daily_routine: "",
    additional_requests: "",
  });

  const onChange = (event) => {
    setRequest({
      ...request,
      [event.target.name]: event.target.value,
    });
  }

  const submitData = async () => {
    try {
      await fetch('/api/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify(request),
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error(err)
    }

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    submitData();
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
        <label htmlFor="details">
          Can you provide a description of your specific disability, condition,
          or need for which the 3D-printed item is required?
        </label>
        <input type="text" id="details" name="details" onChange={onChange} />
        <br />

        <h3>Functional Requirements:</h3>
        <label htmlFor="requirement">
          What are the desired functionalities or features you would like the
          3D-printed item to have? (e.g., grasping, gripping, specific
          movements)
        </label>
        <input type="text" id="requirement" name="requirement" onChange={onChange} required />
        <br />

        <h3>Physical Measurements or Specifications (If Applicable):</h3>
        <label htmlFor="specifications">
          What measurements or specifications are needed to ensure a comfortable
          and secure fit of the 3D-printed item? (e.g., circumference, length)
        </label>
        <input type="text" id="specifications" name="specifications" onChange={onChange} required />
        <br />

        <h3>Lifestyle and Usage:</h3>
        <label htmlFor="daily_routine">
          Could you provide relevant details about your daily routine,
          lifestyle, or specific use cases for the 3D-printed item?
        </label>
        <input type="text" id="daily_routine" name="daily_routine" onChange={onChange} required />
        <br />

        <h3>Additional Information:</h3>
        <label htmlFor="additional_requests">
          Do you have any other specific requests, concerns, or preferences that
          would help us create a tailored and suitable 3D-printed item for you?
        </label>
        <input type="text" id="additional_requests" name="additional_requests" onChange={onChange} required />
        <br />

        <button type="submit">Submit</button>
      </form>

      {isSubmitted && (
        <div className="card">
          <h3>{request.title}</h3>
          <p>{request.summary}</p>
        </div>
      )}
    </>
  );
}
