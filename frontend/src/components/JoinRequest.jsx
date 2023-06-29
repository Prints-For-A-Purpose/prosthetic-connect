import { useState, useEffect } from "react";
import { canInviteThyself, sendInvite } from "../adapters/invites-adapter";
import { Button, Card, Row } from "@nextui-org/react";

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

  // if (!canInvite) return <h4>Already Requested to Join</h4>;

  return (
    <>
      <Card isHoverable>
        <Row css={{ justifyContent: "center" }}>
          <Button
            onPress={onClick}
            shadow
            flat
            color="secondary"
            aria-label="Send"
            disabled={!canInvite}
            css={{ width: "100%" }}
          >
            {canInvite ? "Send Invitation to Join" : "Invitation Already Sent"}
          </Button>
          {/* <p>{canInvite}</p> */}
        </Row>
      </Card>
    </>
  );
}
