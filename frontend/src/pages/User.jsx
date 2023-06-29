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
  Row,
  Button,
  Text,
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

  const otherSkills = [
    "3D Printing ",
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

  // What parts of state would change if we altered our currentUser context?
  // Ideally, this would update if we mutated it
  // But we also have to consider that we may NOT be on the current users page

  const profileUsername = isCurrentUserProfile
    ? currentUser.username
    : userProfile.username;

  const role = userProfile.is_fabricator ? "Fabricator" : "Recipient";

  return (
    <>
      <User
        zoomed
        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        name="Tony Reichert"
        size="500%"
      />
      {userProfile && userProfile.pfp_url && (
        <img src={userProfile.pfp_url} style={{ maxWidth: "5rem" }}></img>
      )}
      {userProfile && userProfile.bio && <p>{userProfile.bio}</p>}
      <h4>Role: {role}</h4>
      <h1>{profileUsername}</h1>
      <Container justify="center">
        <Card css={{ maxWidth: "80%", h: "600px" }}>
          <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
            <Col>
              <Text
                size={12}
                weight="bold"
                transform="uppercase"
                color="#ffffffAA"
              >
                New
              </Text>
              <Text h3 color="black">
                Acme camera
              </Text>
            </Col>
          </Card.Header>
          <Card.Body css={{ p: 0 }}>
            <Card.Image
              src="https://nextui.org/images/card-example-6.jpeg"
              width="100%"
              height="100%"
              objectFit="cover"
              alt="Card example background"
            />
          </Card.Body>
          <Card.Footer
            isBlurred
            css={{
              position: "absolute",
              bgBlur: "#ffffff66",
              borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
              bottom: 0,
              zIndex: 1,
            }}
          >
            <Row>
              <Col>
                <Text color="#000" size={12}>
                  Available soon.
                </Text>
                <Text color="#000" size={12}>
                  Get notified.
                </Text>
              </Col>
              <Col>
                <Row justify="flex-end">
                  <Button flat auto rounded color="secondary">
                    <Text
                      css={{ color: "inherit" }}
                      size={12}
                      weight="bold"
                      transform="uppercase"
                    >
                      Notify Me
                    </Text>
                  </Button>
                </Row>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Container>
      {skills && (
        <>
          <h3>Skills</h3>
          <div>
            {skills.map((s) => (
              <button
                className="button-33"
                key={s.id}
                value={s.id}
                onClick={isCurrentUserProfile && deleteSkill}
              >
                {isCurrentUserProfile && "X "}
                {s.skill_name}
              </button>
            ))}
            <br></br>
            <br></br>

            {isCurrentUserProfile && (
              <button className="button-33" onClick={showOther}>
                +
              </button>
            )}
          </div>
          <br></br>
          <br></br>
          {isCurrentUserProfile && modal && (
            <div>
              {rem.map((s, i) => (
                <button
                  className="button-33"
                  key={i}
                  value={s}
                  onClick={addSkill}
                >
                  + {s}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {!!isCurrentUserProfile && (
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
      )}
      <h2>{userProfile.is_fabricator ? "Working On" : "Needs Help With"}</h2>
      <div>
        {userRequests.map((request) => (
          <div key={request.id}>
            <RequestBox request={request} />
          </div>
        ))}
      </div>
    </>
  );
}
