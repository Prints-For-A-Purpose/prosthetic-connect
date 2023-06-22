// import { useNavigate } from "react-router-dom";
import { moveStatusProgress } from "../adapters/request-adapter";
import { useState } from "react";

export default function ChangeStatus({ request_status, request_id }) {
  // const navigate = useNavigate();
  const [selectFormVisibility, setSelectFormVisibility] = useState({
    display: "none",
  });
  const [selectButtonVisibility, setSelectButtonVisibility] = useState({
    display: "inline-block",
  });

  const [newStatus, setNewStatus] = useState(request_status);

  const handleChange = async (event) => setNewStatus(event.target.value);

  const showSelect = () => {
    setSelectFormVisibility({ display: "block" });
    setSelectButtonVisibility({
      display: "none",
    });
  };

  const handleSelectSubmit = async (event) => {
    event.preventDefault();
    const results = await moveStatusProgress(request_id, newStatus);
    window.location.reload(false);
    // Progress bar does not use 'useState'
    // For right now in order to be able to changes we have to reload
    // Progress bar has to be refactored
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
          {/* <option>Archive</option> */}
        </select>
        <input type="submit" value="Change Status"></input>
      </form>
    </>
  );
}
