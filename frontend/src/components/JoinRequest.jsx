import { useState, useEffect } from "react";
import { canInviteThyself, sendInvite } from "../adapters/invites-adapter";

export default function JoinRequest({ request }) {
  const { id } = request;

  const [canInvite, setInvite] = useState(null);
  const [statusChange, setStatusChange] = useState(0);

  useEffect(() => {
    const loadRequest = async () => {
      const [sent] = await canInviteThyself(id);
      setInvite(sent);
    };
    loadRequest();
  }, [statusChange]);

  const onClick = async (event) => {
    await sendInvite({ id });
    setStatusChange(statusChange + 1);
  };

  if (!canInvite) return <h4>Already Requested to Join</h4>;

  return (
    <>
      <h1>Request to Join</h1>
      <button onClick={onClick}>Send Invite</button>
      <p>{canInvite}</p>
    </>
  );
}
