import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
// import CurrentUserContext from "../contexts/current-user-context";

import { homePagination } from "../adapters/request-adapter";
import RequestBox from "../components/RequestBox";
import Pagination from "../components/Pagination";

export default function HomePage() {
  // const { currentUser } = useContext(CurrentUserContext);
  let { id } = useParams();
  let page = id ? Number(id) : 1;

  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const loadRequest = async () => {
      const newFeed = await homePagination(page);
      setRequests(newFeed);
    };
    loadRequest();
  }, [page]);

  useEffect(() => {
    if (searchKeyword) {
      const filtered = requests.filter((request) =>
        Object.values(request).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchKeyword.toLowerCase())
        )
      );
      setFilteredRequests(filtered);
    } else {
      setFilteredRequests(requests);
    }
  }, [searchKeyword, requests]);
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
      <div className="search-bar">
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <div className="homediv">
        {filteredRequests.map((request) => (
          <RequestBox key={request.id} request={request} />
        ))}
      </div>
      <Pagination></Pagination>
    </>
  );
}
