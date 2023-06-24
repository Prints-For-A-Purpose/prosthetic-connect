import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getPendingInvites,
  updateInviteStatus,
  getActiveFabricators,
} from "../adapters/invites-adapter";

export default function PendingInvites({ request }) {
  const { id } = request;

  const [invitations, setInvitations] = useState([]);
  const [fabricators, setFabricators] = useState([]);
  const [statusChange, setStatusChange] = useState(0);

  useEffect(() => {
    const loadRequest = async () => {
      const [active, error1] = await getActiveFabricators(id);
      const [pending, error2] = await getPendingInvites(id);
      setInvitations(pending);
      setFabricators(active);
    };
    loadRequest();
  }, [statusChange]);

  const acceptOrReject = async (event) => {
    const status = event.target.getAttribute("status");
    const user_id = event.target.getAttribute("user_id");
    const updateInvite = await updateInviteStatus({
      status,
      user_id,
      id,
    });
    setStatusChange(statusChange + 1);
  };

  return (
    <>
      <h3>Pending Invites:</h3>
      <ul>
        {invitations.map((user) => (
          <li key={user.id} style={{ borderStyle: "dotted" }}>
            {user.pfp_url && (
              <img
                src={user.pfp_url}
                style={{ borderRadius: "100%", maxWidth: "3%" }}
              ></img>
            )}
            <Link to={`/users/${user.id}`}>{user.username}</Link>
            {"  "}
            <button
              name="Accept"
              status="accepted"
              user_id={user.id}
              onClick={acceptOrReject}
            >
              Accept Fabricator
            </button>
            {"  "}
            <button
              name="Decline"
              status="rejected"
              user_id={user.id}
              onClick={acceptOrReject}
            >
              Decline Fabricator
            </button>
          </li>
        ))}
      </ul>
      <h3>Active Fabricators:</h3>
      <ul>
        {fabricators.map((user) => (
          <li key={user.id} style={{ borderStyle: "dotted" }}>
            {user.pfp_url && (
              <img
                src={user.pfp_url}
                style={{ borderRadius: "100%", maxWidth: "3%" }}
              ></img>
            )}
            <Link to={`/users/${user.id}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
