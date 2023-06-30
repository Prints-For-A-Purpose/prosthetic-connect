import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import {
  getUser,
  getUserRequests,
  getFabRequests,
} from "../adapters/user-adapter";
import { homePagination } from "../adapters/request-adapter";
import { logUserOut } from "../adapters/auth-adapter";
import {
  getSkillsByUserID,
  deleteSkillById,
  createSkill,
} from "../adapters/skills-adapter";
import UpdateUsernameForm from "../components/UpdateUsernameForm";
import RequestBox from "../components/RequestBox";
import DonationForm from "../components/DonationForm";
import DonateButton from "../components/DonateButton";
import UploadFile from "../components/UploadFile";

import {
  Card,
  Col,
  Grid,
  Row,
  Button,
  Text,
  Tooltip,
  Spacer,
  Badge,
  User,
  Container,
} from "@nextui-org/react";

export default function UserPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [userRequests, setUserRequests] = useState([]);
  const [payment, setPayment] = useState("");
  const [errorText, setErrorText] = useState(null);
  const [skills, setSkills] = useState(null);
  const [rem, setRem] = useState(null);
  const [count, setCount] = useState(0);
  const [modal, setModal] = useState(false);
  const [pfp, setPFP] = useState(false);
  const { id } = useParams();
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

  const explanations = {
    "3D Printing":
      "Experience in operating and calibrating 3D printers, and understanding the printing process.",
    "Design and CAD":
      "Computer-aided design skills capable of creating and modifying 2D and 3D designs.",
    "Material Knowledge":
      "Knowledgeable of material properties, requirements, and suitable applications.",
    Prototyping:
      "Vigilant testers with rapid prototyping and iterative design processes.",
    Customization:
      "Adapters for individual needs and incorporation of personalized features. ",
    "Project Management":
      "Capable of organizing and coordinating projects while managing timelines, resources and collaboration.",
    "CNC Machining":
      "Competent at milling, cutting, or drilling with CNC equipment and tooling software.",
    "Laser Cutting": "Proficiency in laser cutting and engraving techniques.",
    Electronics:
      "Knowledge of electronic components, wiring, soldering, PCB designs, and microcontrollers. ",
    "3D Modeling":
      "Intricate sculpting and artistic modeling for 3D printers. ",
    Welding:
      "Proficiency in welding techniques for combining metal structures or frames.",
    Programming:
      "Knowledge of programming languages and software development. ",
    Robotics:
      "Experienced in creating mechanical components with structural integrity and ergonomics.",
  };

  const otherSkills = [
    "3D Printing",
    "Design and CAD",
    "Material Knowledge",
    "Prototyping",
    "Customization",
    "Project Management",
    "CNC Machining",
    "Laser Cutting",
    "Electronics",
    "3D Modeling",
    "Welding",
    "Programming",
    "Robotics",
  ];

  useEffect(() => {
    const loadUser = async () => {
      const [user, error] = await getUser(id);
      if (error) return setErrorText(error.statusText);
      setUserProfile(user);
      setPayment(user.payment_url);
      if (user && user.is_fabricator) {
        const listOfSkills = await getSkillsByUserID(user.id);
        setSkills(listOfSkills);
        let res = listOfSkills.map((x) => Object.values(x)[2]);
        setRem(otherSkills.filter((x) => !res.includes(x)));
      }
    };
    loadUser();
  }, [id, count]);

  useEffect(() => {
    const loadRequest = async () => {
      const profRequests =
        currentUser && currentUser.is_fabricator
          ? await getFabRequests(id)
          : await getUserRequests(id);
      setUserRequests(profRequests);
    };
    loadRequest();
  }, [id]);

  const handleLogout = async () => {
    logUserOut();
    localStorage.clear();
    setCurrentUser(null);
    await homePagination(1);
    return navigate("/");
  };

  const deleteSkill = async (event) => {
    const { value } = event.target;
    await deleteSkillById(value);
    setCount(count + 1);
  };

  const addSkill = async (event) => {
    const { value } = event.target;
    await createSkill(id, value);
    setCount(count + 1);
  };

  const showOther = async (event) => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

  if (!userProfile && !errorText) return null;
  if (errorText) return <p>{errorText}</p>;

  const profileUsername = isCurrentUserProfile
    ? currentUser.username
    : userProfile.username;

  return (
    <>
      <Spacer y={1}></Spacer>
      <Row css={{ justifyContent: "center" }}>
        <Card
          css={{
            justifyContent: "center",
            maxWidth: "60%",
            "--nextui--cardColor": "var(--nextui-colors-purple300)",
          }}
        >
          <Spacer y={1}></Spacer>
          <Row>
            <User
              zoomed
              src={userProfile.pfp_url}
              size="100%"
              css={{ maxWidth: "450px" }}
              bordered
              color="gradient"
            />
            <Spacer x={1}></Spacer>
            <Spacer y={1}></Spacer>
            <Col>
              <Text
                h1
                size={60}
                css={{
                  textGradient: "45deg, $purple600 -20%, $pink600 100%",
                  textAlign: "center",
                }}
                weight="bold"
              >
                @{profileUsername}
              </Text>
              <Button
                auto
                type="submit"
                color="gradient"
                isFocusVisible={false}
                css={{ width: "100%" }}
              >
                {userProfile.is_fabricator ? "Fabricator" : "Recipient"}
              </Button>
              <Text blockquote css={{ textAlign: "center" }}>
                {userProfile && userProfile.bio && <p>{userProfile.bio}</p>}
              </Text>
            </Col>
            <Spacer x={1}></Spacer>
          </Row>
          {skills && (
            <>
              <Row css={{ justifyContent: "center" }}>
                <Text h2>Skills</Text>
              </Row>
              <Spacer y={0.5}></Spacer>
              <Row
                css={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-evenly",
                  gap: "30px",
                }}
              >
                {console.log(skills)}
                {skills.map((s) => (
                  <Tooltip
                    content={explanations[`${s.skill_name}`]}
                    color="secondary"
                  >
                    <Button
                      className="button-33"
                      key={s.id}
                      value={s.id}
                      onClick={isCurrentUserProfile && deleteSkill}
                      flat
                      shadow
                      color="secondary"
                      size="lg"
                      rounded
                      icon={
                        isCurrentUserProfile && (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="#7827c8"
                            width={24}
                            height={24}
                          >
                            <path
                              d="M8 12h8m-4 9a9 9 0 110-18 9 9 0 010 18z"
                              stroke="#7827c8"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )
                      }
                    >
                      {s.skill_name}
                    </Button>
                  </Tooltip>
                ))}
              </Row>
              {isCurrentUserProfile && (
                <>
                  <Spacer y={1.5}></Spacer>
                  <Row css={{ justifyContent: "center" }}>
                    <Button
                      className="button-33"
                      onClick={showOther}
                      flat
                      shadow
                      color="secondary"
                      rounded
                      size="lg"
                      icon={
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                        >
                          <g
                            stroke="#7827c8"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M7 12h5m0 0h5m-5 0V7m0 5v5" />
                            <circle cx={12} cy={12} r={9} />
                          </g>
                        </svg>
                      }
                    ></Button>
                  </Row>
                  <Spacer y={1.5}></Spacer>
                </>
              )}
              {isCurrentUserProfile && modal && (
                <>
                  <Row
                    css={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-evenly",
                      gap: "30px",
                    }}
                  >
                    {rem.map((s, i) => (
                      <>
                        <Tooltip
                          content={explanations[`${s}`]}
                          color="secondary"
                        >
                          <Button
                            className="button-33"
                            key={i}
                            value={s}
                            onClick={addSkill}
                            flat
                            shadow
                            color="secondary"
                            size="lg"
                            rounded
                            icon={
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                              >
                                <g
                                  stroke="#7827c8"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M7 12h5m0 0h5m-5 0V7m0 5v5" />
                                  <circle cx={12} cy={12} r={9} />
                                </g>
                              </svg>
                            }
                          >
                            {s}
                          </Button>
                        </Tooltip>
                      </>
                    ))}
                  </Row>
                </>
              )}
              <Spacer y={1}></Spacer>
            </>
          )}
        </Card>
      </Row>

      {/* {!!isCurrentUserProfile && (
        <button onClick={handleLogout}>Log Out</button>
      )}
      {!!isCurrentUserProfile && (
        <UpdateUsernameForm
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      )}
      {!!isCurrentUserProfile && (
        <UploadFile imagesOnly={true} crop={true}></UploadFile>
      )}
      {!!isCurrentUserProfile && role === "Fabricator" && (
        <DonationForm
          id={id}
          setUserProfile={setUserProfile}
          payment={userProfile.payment_url ? true : false}
          count={count}
          setCount={setCount}
        ></DonationForm>
      )}
      {userProfile.is_fabricator && userProfile.payment_url && (
        <DonateButton
          url={userProfile.payment_url}
          userProfile={userProfile}
          payment={payment}
        ></DonateButton>
      )} */}
      <Spacer y={1}></Spacer>
      <Row css={{ justifyContent: "center" }}>
        <Text h2>
          {userProfile.is_fabricator
            ? "Currently Helping On: "
            : "I Need Help With:"}
        </Text>
      </Row>
      <Grid.Container gap={4} justify="center">
        {userRequests.map((request) => (
          <RequestBox
            request={request}
            key={request.id}
            css={{ justifyContent: "center" }}
          />
        ))}
      </Grid.Container>
      <Spacer y={2}></Spacer>
    </>
  );
}
