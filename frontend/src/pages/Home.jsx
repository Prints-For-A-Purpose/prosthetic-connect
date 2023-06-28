import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { homePagination } from "../adapters/request-adapter";
import RequestBox from "../components/RequestBox";
// import Pagination from "../components/Pagination";
import { Input, Grid, Text, Row, Spacer, Pagination } from "@nextui-org/react";

export default function HomePage() {
  let { id } = useParams();
  id = id ? Number(id) : 1;

  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const loadRequest = async () => {
      const newFeed = await homePagination(id);
      setRequests(newFeed);
    };
    loadRequest();
  }, [id]);

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
      <Spacer y={1}></Spacer>
      <Row css={{ justifyContent: "center" }}>
        <Text
          h1
          size={60}
          css={{
            textGradient: "45deg, $purple600 -20%, $pink600 100%",
          }}
          weight="bold"
        >
          Search For Requests
        </Text>
      </Row>
      <Spacer y={1}></Spacer>
      <Row css={{ justifyContent: "center" }}>
        <Input
          labelPlaceholder="Search"
          aria-label="Search"
          status="secondary"
          type="text"
          autoFocus={true}
          value={searchKeyword}
          clearable
          css={{ width: "80%" }}
          // css={{ display: "block", marginLeft: "3rem", marginRight: "3rem" }}
          contentLeft={
            <svg fill="none" height={16} viewBox="0 0 24 24" width={16}>
              <path
                d="M11.5 21a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19ZM22 22l-2-2"
                stroke={"var(--nextui-colors-accents6)"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          }
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </Row>
      <Spacer y={2}></Spacer>
      <Row>
        <Spacer x={2}></Spacer>
        <Grid.Container gap={2} justify="flex-start">
          {filteredRequests.map((request) => (
            <RequestBox request={request} key={request.id} />
          ))}
        </Grid.Container>
        <Spacer x={2}></Spacer>
      </Row>
      <Spacer y={2}></Spacer>
      <Row css={{ justifyContent: "center" }}>
        <Pagination
          total={20}
          initialPage={id ? Number(id) : 1}
          color="secondary"
          size="xl"
          shadow
          onChange={async (page) => {
            const newFeed = await homePagination(page);
            setRequests(newFeed);
          }}
          siblings={2}
        />
      </Row>
      <Spacer y={2}></Spacer>
    </>
  );
}
