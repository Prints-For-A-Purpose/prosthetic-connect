import { useState, useEffect } from "react";
import { canInviteThyself, sendInvite } from "../adapters/invites-adapter";
import { Button } from "@nextui-org/react";

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

  return (
    <Button
      onPress={onClick}
      shadow
      flat
      color="secondary"
      aria-label="Send"
      disabled={!canInvite}
      css={{ width: "100%" }}
      iconRight={
        <svg
          width={30}
          height={30}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.33 3.67a1.45 1.45 0 00-1.47-.35L4.23 8.2A1.44 1.44 0 004 10.85l6.07 3 3 6.09a1.44 1.44 0 001.29.79h.1a1.43 1.43 0 001.26-1l4.95-14.59a1.41 1.41 0 00-.34-1.47zM4.85 9.58l12.77-4.26-7.09 7.09-5.68-2.83zm9.58 9.57l-2.84-5.68 7.09-7.09-4.25 12.77z"
            fill="#7827c8"
          />
        </svg>
      }
    >
      {canInvite ? "Send Invitation to Join" : "Invitation Already Sent"}
    </Button>
  );
}
