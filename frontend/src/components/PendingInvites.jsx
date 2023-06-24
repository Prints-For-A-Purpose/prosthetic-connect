import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  getPendingInvites,
  updateInviteStatus,
  getActiveFabricators,
} from "../adapters/invites-adapter";
import CurrentUserContext from "../contexts/current-user-context";

export default function PendingInvites({
  request,
  authorized,
  active,
  setNumOfActive,
  numOfActive,
}) {
  const { id, request_status } = request;
  const { currentUser } = useContext(CurrentUserContext);
  const [invitations, setInvitations] = useState([]);
  const [fabricators, setFabricators] = useState([]);
  const [statusChange, setStatusChange] = useState(0);

  useEffect(() => {
    const loadRequest = async () => {
      const [active] = await getActiveFabricators(id);
      const [pending] = await getPendingInvites(id);
      setInvitations(pending);
      setFabricators(active);
    };
    loadRequest();
  }, [statusChange]);

  const acceptOrReject = async (event) => {
    const status = event.target.getAttribute("status");
    const user_id = event.target.getAttribute("user_id");
    await updateInviteStatus({
      status,
      user_id,
      id,
    });
    setStatusChange(statusChange + 1);
    setNumOfActive(numOfActive + 1);
  };

  return (
    <>
      {request_status === "Pending" && authorized && (
        <div>
          {numOfActive === request.fabricators_needed ? (
            <h4>
              Congrats!<br></br>
              <br></br>
              You now have have enough fabricators to begin. You may now change
              status to Planning and begin the project together
            </h4>
          ) : (
            <h3>Pending Invites:</h3>
          )}
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
                <button
                  name="Accept"
                  status="accepted"
                  user_id={user.id}
                  onClick={acceptOrReject}
                >
                  Accept Fabricator
                </button>
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
        </div>
      )}

      {request_status !== "Archived" && (
        <div>
          <h3>
            {!active
              ? "Active Fabricators:"
              : `Welcome ${currentUser.username}`}
          </h3>
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
        </div>
      )}
    </>
  );
}
