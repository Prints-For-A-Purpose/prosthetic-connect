import { useNavigate } from "react-router-dom";
import ChangeStatus from "./ChangeStatus";
import {
  deleteRequest,
  updateQuestionnaire,
} from "../adapters/request-adapter";
import { useState } from "react";

export default function RequestInfo({
  request,
  currentUser,
  setStatus,
  setErrorText,
  complete,
  numOfActive,
}) {
  const navigate = useNavigate();
  const {
    q1_disability_info,
    q2_functional_requirements,
    q3_physical_specifications,
    q4_lifestyle_usage,
    q5_additional,
    fabricators_needed,
  } = request;

  const [edit, setEdit] = useState({
    q1_disability_info,
    q2_functional_requirements,
    q3_physical_specifications,
    q4_lifestyle_usage,
    q5_additional,
    fabricators_needed,
  });
  const [newContent, setNewContent] = useState({
    q1_disability_info,
    q2_functional_requirements,
    q3_physical_specifications,
    q4_lifestyle_usage,
    q5_additional,
    fabricators_needed,
  });

  const [formVisibility, setFormVisibility] = useState({ display: "none" });
  const [buttonVisibility, setButtonVisibility] = useState({
    display: "inline-block",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = await new FormData(event.target);
    formData = Object.fromEntries(formData.entries());
    formData.id = request.id;
    await updateQuestionnaire(formData);
    setFormVisibility({ display: "none" });
    setButtonVisibility({
      display: "inline-block",
    });
    setNewContent({
      ...edit,
    });
  };

  const deleteReq = async () => {
    await deleteRequest(request.id);
    return navigate(`/users/${currentUser.id}`);
  };

  const showForm = () => {
    setFormVisibility({ display: "block" });
    setButtonVisibility({
      display: "none",
    });
  };

  const handleChange = (event) => {
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
    setEdit({
      ...request,
      [event.target.name]: String(event.target.value),
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
          request={request}
          request_id={request.id}
          setStatus={setStatus}
          newContent={newContent}
          setErrorText={setErrorText}
          complete={complete}
          numOfActive={numOfActive}
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
        ></textarea>
        <h4>Minimum Fabricators Needed (between 1 and 4):</h4>
        <p>{newContent.fabricators_needed}</p>
        {request.request_status === "Pending" ||
          (request.request_status === "Archived" && (
            <input
              style={formVisibility}
              defaultValue={fabricators_needed}
              type="number"
              className="form-input"
              name="fabricators_needed"
              min={1}
              max={4}
              onChange={handleChange}
            />
          ))}
        <button style={formVisibility}>Submit Edit</button>
      </form>
    </>
  );
}
