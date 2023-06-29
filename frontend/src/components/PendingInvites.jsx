import { useState, useEffect, useContext } from "react";
import {
  getPendingInvites,
  updateInviteStatus,
  getActiveFabricators,
} from "../adapters/invites-adapter";
import CurrentUserContext from "../contexts/current-user-context";
import { useNavigate } from "react-router-dom";

import {
  Card,
  User,
  Row,
  Grid,
  Button,
  Spacer,
  Badge,
} from "@nextui-org/react";

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
  const navigate = useNavigate();

  useEffect(() => {
    const loadRequest = async () => {
      const [active] = await getActiveFabricators(id);
      setFabricators(active);
      if (authorized && authorized === true) {
        const [pending] = await getPendingInvites(id);
        setInvitations(pending);
      }
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
      <Card>
        {request_status !== "Archived" && (
          <Card>
            <h3>
              {currentUser && active === true
                ? `Welcome ${currentUser.username}`
                : "Active Fabricators"}
            </h3>

            {fabricators.map((user) => (
              <Card
                isHoverable
                variant="bordered"
                key={user.id}
                isPressable
                onPress={() => navigate("/users/" + user.id)}
              >
                <Card.Header>
                  <Badge
                    enableShadow
                    css={{
                      "--nextui--badgeBackgroundColor":
                        "linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)",
                      "--nextui--badgeTextColor":
                        "var(--nextui-colors-neutralSolidContrast)",
                      "--nextui--badgeShadowColor":
                        "var(--nextui-colors-secondaryShadow)",
                    }}
                  >
                    {"Fabricator"}
                  </Badge>
                  <User src={user.pfp_url}>
                    <User.Link href={"/users/" + user.id}>
                      @{user.username}
                    </User.Link>
                  </User>
                </Card.Header>
              </Card>
            ))}
          </Card>
        )}
        <Spacer x={5}></Spacer>
        {request_status === "Pending" && authorized && authorized === true && (
          <>
            {invitations.map((user) => (
              <Card
                isHoverable
                variant="bordered"
                css={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "right",
                }}
                key={user.id}
              >
                <Card.Body>
                  <Row>
                    <User src={user.pfp_url}>
                      <User.Link href={"/users/" + user.id}>
                        @{user.username}
                      </User.Link>
                    </User>
                    <Spacer x={10}></Spacer>
                    <Grid.Container
                      gap={0.5}
                      css={{ paddingTop: "0px", justify: "flex-end" }}
                    >
                      <Row justify="flex-end">
                        <Button
                          onPress={acceptOrReject}
                          status="accepted"
                          name="Accept"
                          user_id={user.id}
                          aria-label="Accept"
                          color="secondary"
                          flat
                          auto
                          shadow
                          iconRight={
                            <svg
                              width={24}
                              height={24}
                              viewBox="0 0 32 32"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M16 0C7.164 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 30.032C8.28 30.032 2 23.72 2 16S8.28 2 16 2s14 6.28 14 14-6.28 14.032-14 14.032zm6.386-19.886l-9.388 9.446-4.228-4.227c-.39-.39-1.024-.39-1.415 0s-.391 1.023 0 1.414l4.95 4.95a1.002 1.002 0 001.534-.145l9.962-10.024a1.001 1.001 0 00-1.415-1.415z" />
                            </svg>
                          }
                        ></Button>
                        <Spacer x={1} />
                        <Button
                          onPress={acceptOrReject}
                          status="rejected"
                          name="Decline"
                          user_id={user.id}
                          aria-label="Reject"
                          auto
                          color="secondary"
                          flat
                          shadow
                          icon={
                            <svg
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16 8l-8 8m0-8l8 8m5-4a9 9 0 11-18 0 9 9 0 0118 0z"
                                stroke="#000"
                                strokeWidth={1.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          }
                        ></Button>
                      </Row>
                    </Grid.Container>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </>
        )}
      </Card>
    </>
  );
}
