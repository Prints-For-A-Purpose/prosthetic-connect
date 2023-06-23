import { moveStatusProgress } from "../adapters/request-adapter";
import { useState } from "react";

export default function ChangeStatus({
  request_status,
  request_id,
  setStatus,
  newContent,
  setErrorText,
}) {
  const [selectFormVisibility, setSelectFormVisibility] = useState({
    display: "none",
  });
  const [selectButtonVisibility, setSelectButtonVisibility] = useState({
    display: "inline-block",
  });
  const [newStatus, setNewStatus] = useState(request_status);

  const {
    q1_disability_info,
    q2_functional_requirements,
    q3_physical_specifications,
    q4_lifestyle_usage,
  } = newContent;

  const handleChange = async (event) => setNewStatus(event.target.value);

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
      setStatus(newStatus);
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
          <option value="Active" name="Active">
            Active
          </option>
          <option value="In_progress" name="In Progress">
            In Progress
          </option>
          <option value="Done" name="Done">
            Done
          </option>
          <option value="Archived" name="Archived">
            Archive
          </option>
        </select>
        <input type="submit" value="Change Status"></input>
      </form>
    </>
  );
}
