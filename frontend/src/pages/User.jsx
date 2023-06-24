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
import UpdateUsernameForm from "../components/UpdateUsernameForm";
import RequestBox from "../components/RequestBox";
import DonationForm from "../components/DonationForm";
import DonateButton from "../components/DonateButton";
import UploadFile from "../components/UploadFile";

export default function UserPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [userRequests, setUserRequests] = useState([]);
  const [payment, setPayment] = useState("");
  const [errorText, setErrorText] = useState(null);
  const { id } = useParams();
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);
  useEffect(() => {
    const loadUser = async () => {
      const [user, error] = await getUser(id);
      if (error) return setErrorText(error.statusText);
      setUserProfile(user);
      setPayment(user.payment_url);
    };
    loadUser();
  }, [id]);

  console.log();
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
    setCurrentUser(null);
    await homePagination(1);
    return navigate("/");
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
      <h4>Role: {role}</h4>
      <h1>{profileUsername}</h1>
      {!!isCurrentUserProfile && (
        <button onClick={handleLogout}>Log Out</button>
      )}
      <p>If the user had any data, here it would be</p>
      <p>Fake Bio or something</p>
      {!!isCurrentUserProfile && (
        <UpdateUsernameForm
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      )}
      {!!isCurrentUserProfile && <UploadFile></UploadFile>}
      {!!isCurrentUserProfile && role === "Fabricator" && (
        <DonationForm
          id={id}
          setUserProfile={setUserProfile}
          payment={userProfile.payment_url ? true : false}
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
