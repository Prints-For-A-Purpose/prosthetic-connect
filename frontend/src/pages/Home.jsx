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
      <h1>Home</h1>
      <div className="homediv">
        {requests.map((request) => (
          <RequestBox key={request.id} request={request} />
        ))}
      </div>
      <Pagination></Pagination>
    </>
  );
}
