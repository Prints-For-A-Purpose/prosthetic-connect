import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { createRequests } from "../adapters/request-adapter";
import CurrentUserContext from "../contexts/current-user-context";

export default function QuestionsPage() {
  const navigate = useNavigate();
  const { currentUser } = useContext(CurrentUserContext);

  if (currentUser && currentUser.is_fabricator === true)
    return <Navigate to="/" />;

  const [request, setRequest] = useState({
    q1_disability_info: "",
    q2_functional_requirements: "",
    q3_physical_specifications: "",
    q4_lifestyle_usage: "",
    q5_additional: "",
    fabricators_needed: 0,
    category: "",
  });

  const [isDraft, setIsDraft] = useState(true);

  useEffect(() => {
    if (
      request.q1_disability_info &&
      request.q2_functional_requirements &&
      request.q3_physical_specifications &&
      request.q4_lifestyle_usage &&
      request.q5_additional &&
      request.fabricators_needed &&
      request.category
    ) {
      setIsDraft(false);
    } else {
      setIsDraft(true);
    }
  }, [request]);

  const onChange = (event) => {
    if (
      event.target.name === "fabricators_needed" &&
      event.target.value.length > 1
    )
      event.target.value = event.target.value[1];
    if (
      (event.target.name === "fabricators_needed" && +event.target.value > 4) ||
      +event.target.value === 0
    )
      event.target.value = "";
    setRequest({
      ...request,
      [event.target.name]: String(event.target.value),
    });
  };

  const handleSubmit = async (event) => {
    if (currentUser === null) return navigate("/sign-up");
    event.preventDefault();
    request.draft = false;
    const newRequest = await createRequests(request);
    navigate(`../requests/${newRequest[0].id}/`);
  };

  const handleDraft = async (event) => {
    if (currentUser === null) return navigate("/sign-up");
    event.preventDefault();
    request.draft = true;
    const newRequest = await createRequests(request);
    navigate(`../requests/${newRequest[0].id}/`);
  };

  const categoryDescriptions = {
    Prosthetics: "Prosthetic for various body parts.",
    "Assistive Devices":
      "Adaptive Tools that aid those with disabilities in their daily activities.",
    "Accessibility Modifications":
      "Improving and modifying existing objects or environments.",
    Orthotics: "Orthotic devices to support and protect body parts.",
    "Mobility Aids":
      "Enhance mobility such as wheelchair accessories or walking aids.",
    "Sensory Enhancements":
      "Enhance sensory experiences such as tactical maps, braille materials, or tools for those with visual or hearing impairments.",
    "Educational Resources":
      "3D-printed educational tools, models, or resources to support learning for individuals who need them.",
    "Wearable Technology and Accessories":
      "Personalized and custom solutions, including aesthetic modifications.",
    "Medical Tools": "Instruments and tools used in healthcare settings",
    "Rehabilitation Aids":
      "Devices or tools used in physical therapy or rehabilitation programs. ",
    "Animal Prosthetics":
      "Prosthetics designed for animals, such as pets or wildlife. ",
    "Craniofacial Optics":
      "Glasses and other devices to support craniofacial deformities or conditions affecting the head and face. ",
    Miscellaneous:
      "For unique or less common requirements, also includes those unsure of which category their need falls into. ",
  };

  const difficultyTags = {
    Beginner: "Simple and suitable for beginners.",
    Intermediate:
      "Moderate complexity requires more prior knowledge and experience.",
    Advanced:
      "Intricate and challenging, for those with advanced skills and expertise.",
    Expert:
      "Highly complex and intricate designs, needing specialized techniques, materials and technology.",
  };

  return (
    <div className="container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Create a Request Below</h2>
        <h5>
          (You can save your answers as a draft to your profile if they are not
          ready. )
        </h5>
        <h3 className="form-heading">Disability or Need Information:</h3>
        <label htmlFor="q1_disability_info" className="form-label">
          Can you provide a description of your specific disability, condition,
          or need for which the 3D-printed item is required?
        </label>
        <textarea
          type="text"
          id="q1_disability_info"
          name="q1_disability_info"
          onChange={onChange}
          className="form-input"
        />
        <br />

        <h3 className="form-heading">Functional Requirements:</h3>
        <label htmlFor="q2_functional_requirements" className="form-label">
          What are the desired functionalities or features you would like the
          3D-printed item to have? (e.g., grasping, gripping, specific
          movements)
        </label>
        <textarea
          type="text"
          id="q2_functional_requirements"
          name="q2_functional_requirements"
          onChange={onChange}
          className="form-input"
        />
        <br />

        <h3 className="form-heading">
          Physical Measurements or Specifications (If Applicable):
        </h3>
        <label htmlFor="q3_physical_specifications" className="form-label">
          What measurements or specifications are needed to ensure a comfortable
          and secure fit of the 3D-printed item? (e.g., circumference, length)
        </label>
        <textarea
          type="text"
          id="q3_physical_specifications"
          name="q3_physical_specifications"
          onChange={onChange}
          className="form-input"
        />
        <br />

        <h3 className="form-heading">Lifestyle and Usage:</h3>
        <label htmlFor="q4_lifestyle_usage" className="form-label">
          Could you provide relevant details about your daily routine,
          lifestyle, or specific use cases for the 3D-printed item?
        </label>
        <textarea
          type="text"
          id="q4_lifestyle_usage"
          name="q4_lifestyle_usage"
          onChange={onChange}
          className="form-input"
        />
        <br />

        <h3 className="form-heading">Additional Information:</h3>
        <label htmlFor="q5_additional" className="form-label">
          Do you have any other specific requests, concerns, or preferences that
          would help us create a tailored and suitable 3D-printed item for you?
        </label>
        <textarea
          type="text"
          id="q5_additional"
          name="q5_additional"
          onChange={onChange}
          className="form-input"
        />
        <br></br>
        <label htmlFor="category" className="form-label">
          What is the category of item you need? If your not sure select
          miscellaneous/other.
        </label>
        <select
          id="category"
          name="category"
          onChange={onChange}
          defaultValue={"none"}
        >
          <option disabled value="none"></option>
          <option value="Prosthetics" name="Prosthetics">
            Prosthetics
          </option>
          <option value="Assistive Devices" name="Assistive Devices">
            Assistive Devices
          </option>
          <option
            value="Accessibility Modifications"
            name="Accessibility Modifications"
          >
            Accessibility Modifications
          </option>
          <option value="Orthotics" name="Orthotics">
            Orthotics
          </option>
          <option value="Mobility Aids" name="Mobility Aids">
            Mobility Aids
          </option>
          <option
            value="Wearable Technology and Accessories"
            name="Wearable Technology and Accessories"
          >
            Wearable Technology and Accessories
          </option>
          <option
            value="Customization and Personalization"
            name="Customization and Personalization"
          >
            Customization and Personalization
          </option>
          <option value="Medical Tools" name="Medical Tools">
            Medical Tools
          </option>
          <option value="Rehabilitation Aids" name="Rehabilitation Aids">
            Rehabilitation Aids
          </option>
          <option value="Animal Prosthetics" name="Animal Prosthetics">
            Animal Prosthetics
          </option>
          <option value="Craniofacial Optics" name="Craniofacial Optics">
            Craniofacial Optics
          </option>
          <option value="Miscellaneous" name="Miscellaneous">
            Miscellaneous / Other
          </option>
        </select>
        <p>category explanation</p>
        <br></br>
        <label className="form-label">
          Minimum Fabricators Needed (between 1 and 4):
        </label>
        <input
          type="number"
          id="fabricators_needed"
          name="fabricators_needed"
          min={1}
          max={4}
          onChange={onChange}
        />
        <p>difficulty explanation</p>
        <br />
        <button className="form-submit-button" onClick={handleDraft}>
          Save Draft
        </button>
        {!isDraft && (
          <button type="submit" className="form-submit-button">
            Submit
          </button>
        )}
      </form>
    </div>
  );
}
