import { useNavigate } from "react-router-dom";
import ChangeStatus from "./ChangeStatus";
import {
  deleteRequest,
  updateQuestionnaire,
} from "../adapters/request-adapter";
import { useState } from "react";

export default function RequestInfo({ request, currentUser }) {
  const navigate = useNavigate();
  const {
    q1_disability_info,
    q2_functional_requirements,
    q3_physical_specifications,
    q4_lifestyle_usage,
    q5_additional,
  } = request;

  const [edit, setEdit] = useState({
    q1_disability_info,
    q2_functional_requirements,
    q3_physical_specifications,
    q4_lifestyle_usage,
    q5_additional,
  });

  const [newContent, setNewContent] = useState({
    q1_disability_info,
    q2_functional_requirements,
    q3_physical_specifications,
    q4_lifestyle_usage,
    q5_additional,
  });

  const [formVisibility, setFormVisibility] = useState({ display: "none" });
  const [buttonVisibility, setButtonVisibility] = useState({
    display: "inline-block",
  });

  const deleteReq = async () => {
    const results = await deleteRequest(request.id);
    return navigate(`/users/${currentUser.id}`);
  };

  const showForm = () => {
    setFormVisibility({ display: "block" });
    setButtonVisibility({
      display: "none",
    });
  };

  const handleChange = (event) => {
    setEdit({
      ...edit,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    formData = Object.fromEntries(formData.entries());
    formData.id = request.id;
    const updatedQuestions = await updateQuestionnaire(formData);
    setFormVisibility({ display: "none" });
    setButtonVisibility({
      display: "inline-block",
    });
    setNewContent({
      ...edit,
    });
  };

  const authorized = currentUser && +currentUser.id === +request.user_id;

  return (
    <>
      {authorized && (
        <button onClick={deleteReq} style={buttonVisibility}>
          Delete
        </button>
      )}
      {authorized && (
        <>
          <button onClick={showForm} style={buttonVisibility}>
            Edit
          </button>
          <br></br>
        </>
      )}
      {authorized && (
        <ChangeStatus
          request_status={request.request_status}
          request_id={request.id}
        ></ChangeStatus>
      )}
      <form onSubmit={handleSubmit}>
        <h4>
          Can you provide a description of your specific disability, condition,
          or need for which the 3D-printed item is required?
        </h4>
        <p>{newContent.q1_disability_info}</p>
        <textarea
          style={formVisibility}
          defaultValue={q1_disability_info}
          type="text"
          className="form-input"
          name="q1_disability_info"
          onChange={handleChange}
          required
        ></textarea>
        <h4>
          What are the desired functionalities or features you would like the
          3D-printed item to have?
        </h4>
        <p>{newContent.q2_functional_requirements}</p>
        <textarea
          style={formVisibility}
          defaultValue={q2_functional_requirements}
          type="text"
          className="form-input"
          name="q2_functional_requirements"
          onChange={handleChange}
          required
        ></textarea>
        <h4>
          What measurements or specifications are needed to ensure a comfortable
          and secure fit of the 3D-printed item?
        </h4>
        <p>{newContent.q3_physical_specifications}</p>
        <textarea
          style={formVisibility}
          defaultValue={q3_physical_specifications}
          type="text"
          className="form-input"
          name="q3_physical_specifications"
          onChange={handleChange}
          required
        ></textarea>
        <h4>
          Could you provide relevant details about your daily routine,
          lifestyle, or specific use cases for the 3D-printed item?
        </h4>
        <p>{newContent.q4_lifestyle_usage}</p>
        <textarea
          style={formVisibility}
          defaultValue={q4_lifestyle_usage}
          type="text"
          className="form-input"
          name="q4_lifestyle_usage"
          onChange={handleChange}
          required
        ></textarea>
        <h4>
          Do you have any other specific requests, concerns, or preferences that
          would help us create a tailored and suitable 3D-printed item for you?
        </h4>
        <p>{newContent.q5_additional || "N/A"}</p>
        <textarea
          style={formVisibility}
          defaultValue={q5_additional}
          type="text"
          className="form-input"
          name="q5_additional"
          onChange={handleChange}
          required
        ></textarea>
        <button style={formVisibility}>Submit Edit</button>
      </form>
    </>
  );
}
