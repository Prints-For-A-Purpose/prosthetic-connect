import { useEffect, useState } from "react";
import { getAllRequests } from "../adapters/request-adapter";
import RequestBox from "../components/RequestBox";

export default function HomePage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getAllRequests().then(setRequests);
  }, []);

  return (
    <>
      <h1>Home</h1>
      <div className="homediv">
        {requests.map((request) => (
          <RequestBox key={request.id} request={request} />
        ))}
      </div>
    </>
  );
}
