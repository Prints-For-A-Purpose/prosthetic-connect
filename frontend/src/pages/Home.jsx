import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";

import { homePagination } from "../adapters/request-adapter";
import RequestBox from "../components/RequestBox";
import Pagination from "../components/Pagination";

export default function HomePage() {
  const { currentUser } = useContext(CurrentUserContext);
  let { id } = useParams();
  let page = id ? Number(id) : 1;

  const [requests, setRequests] = useState([]);

  // const fabFeed =
  //   currentUser && currentUser.is_fabricator === true ? true : false;

  useEffect(() => {
    const loadRequest = async () => {
      // if (fabFeed) {
      const newFeed = await homePagination(page);
      setRequests(newFeed);
      // } else {
      //   const newFeed = await homePaginationForRecipient(page);
      //   setRequests(newFeed);
      // }
    };
    loadRequest();
  }, [page]);

  return (
    <>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "3rem",
          marginBottom: "2rem",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        }}
      >
        Home
      </h1>
      <div className="homediv">
        {requests.map((request) => (
          <RequestBox key={request.id} request={request} />
        ))}
      </div>
      <Pagination></Pagination>
    </>
  );
}
