import { moveStatusProgress } from "../adapters/request-adapter";
import { useState } from "react";

export default function ChangeStatus({
  request,
  setStatus,
  request_id,
  newContent,
  setErrorText,
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
      const results = await moveStatusProgress(request_id, newStatus);
      await setStatus(newStatus);
    }
  };

  return (
    <>
      <button style={selectButtonVisibility} onClick={showSelect}>
        Move Progress
      </button>
      <form style={selectFormVisibility} onSubmit={handleSelectSubmit}>
        <label>Pick a new Status:</label>
        <select onChange={handleChange} defaultValue={newStatus}>
          <option value="Archived" name="Archived">
            Archived - 0%
          </option>
          <option value="Pending" name="Pending">
            Pending - 5%
          </option>
          <option value="Planning" name="Planning">
            Planning - 10%
          </option>
          <option value="Design" name="Design">
            Design - 30%
          </option>
          <option value="Development" name="Development">
            Development - 50%
          </option>
          <option value="Testing" name="Testing">
            Testing - 70%
          </option>
          <option value="Review" name="Review">
            Review - 80%
          </option>
          <option value="Iteration" name="Iteration">
            Iteration - 90%
          </option>
          <option value="Documentation" name="Documentation">
            Documentation - 95%
          </option>
          <option value="Deployment" name="Deployment">
            Deployment - 100%
          </option>
        </select>
        <br></br>
        <p>{explanation}</p>
        <input type="submit" value="Change Status"></input>
      </form>
    </>
  );
}
