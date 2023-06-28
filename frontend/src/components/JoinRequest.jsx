import { useState, useEffect } from "react";
import { canInviteThyself, sendInvite } from "../adapters/invites-adapter";
import { User, Switch, Button, Card, Spacer, Row } from "@nextui-org/react";

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
      <Card isHoverable>
        <h3>Request to Join</h3>
        <div>
          <Button onPress={onClick} shadow color="secondary" aria-label="Send">
            Send Invite
          </Button>
        </div>
        <p>{canInvite}</p>
      </Card>
    </>
  );
}
