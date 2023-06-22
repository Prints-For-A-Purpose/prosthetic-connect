// import { useNavigate } from "react-router-dom";
import { moveStatusProgress } from "../adapters/request-adapter";
import { useState, useEffect } from "react";
import ProgressBar from "../components/ProgressBar";

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

  const progressStatus = {
    Active: {
      color: "#ff9800",
      progress: 30,
    },
    In_progress: {
      color: "#2196f3",
      progress: 50,
    },
    Done: {
      color: "#4caf50",
      progress: 100,
    },
  };

  const [newColor, setColor] = useState(progressStatus[request_status].color);
  const [newProgress, setNewProgress] = useState(
    progressStatus[request_status].progress
  );

  const handleSelectSubmit = async (event) => {
    event.preventDefault();
    const results = await moveStatusProgress(request_id, newStatus);
    setColor(progressStatus[newStatus].color);
    setNewProgress(progressStatus[newStatus].progress);
    window.location.reload(false);
  };

  return (
    <>
      <ProgressBar newColor={newColor} newProgress={newProgress} />
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
