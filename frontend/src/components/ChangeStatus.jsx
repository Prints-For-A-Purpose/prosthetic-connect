import { moveStatusProgress } from "../adapters/request-adapter";
import { archiveRequest, startProject } from "../adapters/invites-adapter";

import { useState, useEffect } from "react";

export default function ChangeStatus({
  request,
  setStatus,
  request_id,
  newContent,
  setErrorText,
  complete,
}) {
  const [selectFormVisibility, setSelectFormVisibility] = useState({
    display: "none",
  });
  const [selectButtonVisibility, setSelectButtonVisibility] = useState({
    display: "inline-block",
  });

  const { request_status } = request;

  const statusDescriptions = {
    Archived:
      "Archived posts are only visible to the Recipient. Drafts are also held as archived until the Recipient is ready to publish them publicly.",
    Pending:
      "The Recipient's request is currently waiting for enough Fabricators to join.",
    Planning:
      "This is the phase of defining goals, requirements, and project scope. It involves the understanding of the Recipient's situation and working together for brainstorming and researching ideas. The Recipient is welcomed to be as proactive as they want through the next coming phases. ",
    Design:
      "This stage focuses on the specific design of the product. Mock-ups and visualization of the final outcome are reached here.",
    Development:
      "Now the construction of the device is set into motion. 3D printing, assembly, coding, and other technical requirements begin here.",
    Testing:
      "Testing phase is used to ensure functionality, quality, and compliance with the Recipient's exact specifications.",
    Review:
      "The review stage involves evaluation and feedback gathering. Here is where improvements and modifications are followed through with.",
    Iteration:
      "During iteration, multiple rounds of feedback and versions are required for continuous refinement until the instrument is up to par with the original intent.",
    Documentation:
      "Providing documentation in this stage is necessary to preserve knowledge for future fabricators and to serve as reference for device maintenance by the Recipient.",
    Deployment:
      "In the last phase, delivery and integration of the device from the Fabricator(s) finally reaches the Recipient who needs it. ",
  };

  const [newStatus, setNewStatus] = useState(request_status);
  const [explanation, setExplanation] = useState(
    statusDescriptions[request_status]
  );

  const {
    q1_disability_info,
    q2_functional_requirements,
    q3_physical_specifications,
    q4_lifestyle_usage,
  } = newContent;

  const handleChange = (event) => {
    setNewStatus(event.target.value);
    setExplanation(statusDescriptions[event.target.value]);
  };

  const showSelect = () => {
    setSelectFormVisibility({ display: "block" });
    setSelectButtonVisibility({
      display: "none",
    });
  };
  const [showModal, setShowModal] = useState(false);

  const statusName = Object.keys(statusDescriptions);
  let index = statusName.findIndex((e) => e === request_status);

  const handleSelectSubmit = async (event) => {
    event.preventDefault();
    if (
      q1_disability_info === "" ||
      q2_functional_requirements === "" ||
      q3_physical_specifications === "" ||
      q4_lifestyle_usage === ""
    ) {
      setErrorText(
        "Please finish your questions before unarchiving this request."
      );
    } else {
      await moveStatusProgress(request_id, newStatus);
      await setStatus(newStatus);
      console.log(`New status ${newStatus}`);
      if (newStatus === "Archived") {
        await archiveRequest(request_id);
      } else if (newStatus === "Planning") {
        await startProject(request_id);
      }
    }
    hideAll();
  };

  const hideAll = () => {
    setShowModal(false);
    setSelectButtonVisibility({
      display: "inline-block",
    });
    setSelectFormVisibility({
      display: "none",
    });
  };

  const showAlert = () => {
    setShowModal(true);
  };

  return (
    <>
      <button style={selectButtonVisibility} onClick={showSelect}>
        Move Progress
      </button>
      <form style={selectFormVisibility} onSubmit={handleSelectSubmit}>
        <label>Pick a new Status:</label>
        <select onChange={handleChange} defaultValue={newStatus}>
          <option
            value="Archived"
            name="Archived"
            disabled={request_status === "Archived"}
          >
            Archived - 0%
          </option>
          <option value="Pending" name="Pending" disabled={index >= 1}>
            Pending - 5%
          </option>
          <option
            value="Planning"
            name="Planning"
            disabled={index >= 2 || request_status === "Archived" || !complete}
          >
            Planning - 10%
          </option>
          <option
            value="Design"
            name="Design"
            disabled={
              index >= 3 ||
              request_status === "Archived" ||
              request_status === "Pending"
            }
          >
            Design - 30%
          </option>
          <option
            value="Development"
            name="Development"
            disabled={
              index >= 4 ||
              request_status === "Archived" ||
              request_status === "Pending"
            }
          >
            Development - 50%
          </option>
          <option
            value="Testing"
            name="Testing"
            disabled={
              index >= 5 ||
              request_status === "Archived" ||
              request_status === "Pending"
            }
          >
            Testing - 70%
          </option>
          <option
            value="Review"
            name="Review"
            disabled={
              index >= 6 ||
              request_status === "Archived" ||
              request_status === "Pending"
            }
          >
            Review - 80%
          </option>
          <option
            value="Iteration"
            name="Iteration"
            disabled={
              index >= 7 ||
              request_status === "Archived" ||
              request_status === "Pending"
            }
          >
            Iteration - 90%
          </option>
          <option
            value="Documentation"
            name="Documentation"
            disabled={
              index >= 8 ||
              request_status === "Archived" ||
              request_status === "Pending"
            }
          >
            Documentation - 95%
          </option>
          <option
            value="Deployment"
            name="Deployment"
            disabled={
              index === 9 ||
              request_status === "Archived" ||
              request_status === "Pending"
            }
          >
            Deployment - 100%
          </option>
        </select>
        <br></br>
        <p>{explanation}</p>
        <a
          onClick={showAlert}
          style={{
            display: "block",
            width: "250px",
            height: "25px",
            background: "#2e78ba",
            padding: "10px",
            textAlign: "center",
            borderRadius: "5px",
            color: "white",
            lineHeight: "25px",
          }}
        >
          Change Progress
        </a>
        {showModal && (
          <div>
            <h2>Are you sure you want to change the project status?</h2>
            <p>
              You can move your project forward from pending once you have all
              of your fabricators
            </p>
            <p>
              if archive all fabricators are deleted and your project restarts.
            </p>
            <p>if you move it forward you cannot go back wards</p>
            <button onClick={hideAll}>Cancel</button>
            <input type="submit" value="Change Status"></input>
          </div>
        )}
      </form>
    </>
  );
}
