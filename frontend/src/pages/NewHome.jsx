import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { homePagination } from "../adapters/request-adapter";
import NewRequestBox from "../components/NewRequestBox";
import NewPagination from "../components/NewPagination";
import { Input, Grid, Text, Pagination } from "@nextui-org/react";

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
      <Text
        h1
        size={60}
        css={{
          textGradient: "45deg, $purple600 -20%, $pink600 100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
        weight="bold"
      >
        Search For Requests
      </Text>
      <Input
        labelPlaceholder="Search"
        status="secondary"
        type="text"
        value={searchKeyword}
        clearable
        css={{ display: "block", margin: "3rem" }}
        contentRight={
          <svg
            viewBox="0 -0.5 21 21"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <title>search_left [#1506]</title>{" "}
              <desc>Created with Sketch.</desc> <defs> </defs>{" "}
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="Dribbble-Light-Preview"
                  transform="translate(-219.000000, -280.000000)"
                  fill="#000000"
                >
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    <path
                      d="M184,138.586 L182.5153,140 L176.57545,134.343 L178.06015,132.929 L184,138.586 Z M170.35,132 C167.45515,132 165.1,129.757 165.1,127 C165.1,124.243 167.45515,122 170.35,122 C173.24485,122 175.6,124.243 175.6,127 C175.6,129.757 173.24485,132 170.35,132 L170.35,132 Z M170.35,120 C166.2907,120 163,123.134 163,127 C163,130.866 166.2907,134 170.35,134 C174.4093,134 177.7,130.866 177.7,127 C177.7,123.134 174.4093,120 170.35,120 L170.35,120 Z"
                      id="search_left-[#1506]"
                    ></path>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        }
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <Grid.Container
        gap={2}
        justify="flex-start"
        css={{ padding: "50px !important" }}
      >
        {filteredRequests.map((request) => (
          <NewRequestBox request={request} key={request.id} />
        ))}
      </Grid.Container>
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
    </>
  );
}
