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
  Container,
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
      {request_status !== "Archived" && (
        <>
          <Spacer y={1}></Spacer>
          <Container css={{ maxWidth: "85%" }}>
            {fabricators.map((user) => (
              <>
                <Card
                  isHoverable
                  variant="bordered"
                  key={user.id}
                  isPressable
                  onPress={() => navigate("/users/" + user.id)}
                  css={{ width: "100%" }}
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
                    <User
                      zoomed
                      src={user.pfp_url}
                      size="xl"
                      bordered
                      color="gradient"
                    >
                      <User.Link href={"/users/" + user.id}>
                        @{user.username}
                      </User.Link>
                    </User>
                    {currentUser && currentUser.id === user.id && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 1280.000000 1280.000000"
                        fill="#7827c8"
                      >
                        <path
                          d="M10815 12693c-357-31-818-163-1465-420-445-176-606-261-732-388-285-285-360-568-345-1305 4-157 11-321 17-365 35-254 143-490 294-641 143-143 246-203 1004-586 402-204 552-284 552-297 0-67-128-491-201-666-188-453-576-1049-1073-1650-234-282-402-467-795-877l-275-286-66 161c-76 185-106 246-194 395-215 361-562 707-928 924-131 77-222 121-413 198-179 73-182 75-190 158-4 37-20 132-35 212-94 475-297 908-609 1300-97 122-339 364-461 461-420 334-917 557-1420 636-149 23-758 26-910 4-233-33-562-133-819-250-356-161-603-341-933-680-226-231-322-367-479-673C118 7623 21 7256 4 6777c-20-541 102-1065 356-1531 454-832 1223-1376 2195-1552 108-19 134-27 151-47 11-13 48-106 83-206 144-423 338-790 608-1152 575-771 1332-1363 2236-1750 706-303 1401-452 2022-436 253 6 278 12 466 108 286 145 502 311 835 644 319 318 516 548 824 960 753 1008 1516 2352 2098 3695 388 898 674 1774 832 2553 73 363 75 381 75 957-1 532-8 682-46 960-103 748-306 1392-587 1859-107 177-207 306-347 446-321 321-612 441-990 408zm210-778c134-57 311-231 448-440 249-382 437-975 522-1650 46-369 46-1125-1-1445-40-271-177-801-324-1255-158-484-448-1222-649-1649l-46-98-115 83c-303 219-375 259-479 267-225 16-400-141-401-360 0-116 32-197 107-268 72-68 328-274 441-355 61-43 82-64 82-81 0-26-226-486-271-551-35-51-64-61-110-38-19 10-108 77-199 150-226 181-410 319-462 347-37 20-58 23-148 23-95 0-111-3-162-28-75-37-147-103-183-169-28-50-30-59-29-163 0-145 13-173 135-290 83-80 336-291 617-515 50-41 92-80 92-88 0-37-495-800-723-1114l-70-97-105 95c-135 123-275 215-464 308-298 145-448 179-808 178-249 0-362-13-543-61l-108-29-327 372c-423 479-1301 1483-1996 2281-302 347-563 645-579 662l-31 33 52 107c99 209 134 359 134 588 1 166-15 281-58 416-139 444-532 791-1016 896-113 24-349 24-471 0-677-135-1130-730-1076-1409 25-316 149-577 389-819 264-266 545-383 925-382 175 0 256 11 425 58l124 35 22-22c12-13 594-678 1295-1478 700-800 1322-1511 1383-1580 60-69 118-135 129-146 18-22 18-22-48-95-195-216-323-436-421-724l-47-137-31 6c-115 23-637 331-921 544-281 211-621 535-815 777-325 406-575 928-678 1411-32 151-53 203-109 272-73 90-159 117-468 147-203 20-264 30-401 65-319 84-669 269-929 492-375 322-649 809-732 1303-25 154-26 622 0 770 61 352 230 719 472 1020 77 97 254 274 350 352 249 200 530 340 840 418 474 120 989 77 1450-120 398-171 750-464 988-825 205-311 315-644 367-1116 32-285 52-355 122-420 52-49 125-81 291-125 175-47 308-94 421-151 449-225 788-616 956-1103 53-155 79-286 91-464 12-173 29-243 79-320 112-173 341-223 511-111 103 68 838 802 1294 1290 472 506 1025 1237 1319 1743 356 611 554 1203 573 1708l6 157-39 82c-61 131-62 132-769 495-941 483-988 511-1040 613-9 19-14 37-10 40 8 8 399 19 705 21 219 1 306 13 380 51 68 35 134 104 166 173 26 55 29 73 29 157 0 86-3 101-31 160-36 76-98 141-169 178l-50 26-385 7c-576 11-653 15-667 35-15 20-7 73 24 149 37 93 83 148 161 194 276 161 1152 475 1522 546 92 17 221 13 275-10zM3153 7215c187-49 336-196 392-389 22-74 21-209 0-284-65-222-242-382-461-414-254-37-503 121-591 373-88 253 18 537 244 657 125 66 293 89 416 57zm4862-5289c183-62 361-169 504-303l84-79-199-188c-308-292-511-444-642-482-136-40-591-3-957 76-123 27-172 46-180 70-8 25 10 123 35 188 137 359 432 631 775 713 128 30 210 38 360 35 120-3 151-7 220-30z"
                          transform="matrix(.1 0 0 -.1 0 1280)"
                        />
                      </svg>
                    )}
                  </Card.Header>
                </Card>
                <Spacer y={0.75}></Spacer>
              </>
            ))}
          </Container>
        </>
      )}
      <Spacer x={5}></Spacer>
      {request_status === "Pending" && authorized && authorized === true && (
        <Container css={{ maxWidth: "85%" }}>
          {invitations.map((user) => (
            <>
              <Card
                isHoverable
                variant="bordered"
                key={user.id}
                isPressable
                onPress={() => navigate("/users/" + user.id)}
                css={{ width: "100%" }}
              >
                <Card.Body>
                  <Row>
                    <User
                      zoomed
                      src={user.pfp_url}
                      size="xl"
                      bordered
                      color="gradient"
                    >
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
                              stroke="#7827c8"
                              fill="#7827c8"
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
                              width={28}
                              height={28}
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16 8l-8 8m0-8l8 8m5-4a9 9 0 11-18 0 9 9 0 0118 0z"
                                stroke="#7827c8"
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
              <Spacer y={0.75}></Spacer>
            </>
          ))}
        </Container>
      )}
    </>
  );
}
