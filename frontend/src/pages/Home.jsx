import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getFirstThree } from "../adapters/request-adapter";
import RequestBox from "../components/RequestBox";
import Pagination from "../components/Pagination";

export default function HomePage() {
  // const navigate = useNavigate();
  let { id } = useParams();
  let page = id ? Number(id) : 1;

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getFirstThree(page).then(setRequests);
  }, [page]);

  return (
    <>
      <h1 style={{
  display: "flex",
  justifyContent: "center",
  fontSize: "3rem",
  marginBottom: "2rem",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)"
}}

>Home</h1>
      <div className="homediv">
        {requests.map((request) => (
          <RequestBox key={request.id} request={request} />
        ))}
      </div>
      <Pagination></Pagination>
    </>
  );
}
