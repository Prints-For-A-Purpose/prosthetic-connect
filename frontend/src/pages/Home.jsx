import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
// import CurrentUserContext from "../contexts/current-user-context";

import { homePagination } from "../adapters/request-adapter";
import RequestBox from "../components/RequestBox";
import Pagination from "../components/Pagination";

export default function HomePage() {
  let { id } = useParams();
  let page = id ? Number(id) : 1;

  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const searchBy = ['Users','Requests'];

  const userSkills = ["3D Printing ", "Design and CAD", "Material Knowledge", 
  "Prototyping", "Customization", "Project Management", "CNC Machining",
   "Laser Cutting", "Electronics", "3D Modeling", "Welding", 
   "Programming", "Robotics"];

  const requestCats  = ["Prosthetics", "Assistive Devices", "Accessibility Modifications", 
  "Orthotics", "Mobility Aids", "Sensory Enhancements", "Educational Resources", "Wearable Technology and Accessories",
   "Customization and Personalization", "Medical Tools", "Rehabilitation Aids", "Animal Prosthetics", "Craniofacial Optics", "Miscellaneous"]

  const requestComplexity =  ["Beginner", "Intermediate", "Advanced", "Expert"];

  const requestStatus = ["Pending", "Planning", "Design", "Development", "Testing", "Review", "Iteration", "Documentation", "Deployment"]

  const reqOpts = ['Complexity','Status','Categories']
  
  const [activeChoice1, setActiveChoice1] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const [showUsers, setShowUsers] = useState(false)

  const handleButtonClick = (button) => {
    setActiveChoice1(button);
  };

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };

  const nameSearch = [];

  useEffect(() => {
    const loadRequest = async () => {
      const newFeed = await homePagination(page);
      setRequests(newFeed);
    };
    loadRequest();
  }, [page]);

  useEffect(() => {
    if (searchKeyword && (!activeChoice1 || activeChoice1 === "Requests")) {
      const filtered = requests.filter((request) =>
        Object.values(request).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchKeyword.toLowerCase())
        )
      );
      console.log(filtered,activeChoice1)
      setFilteredRequests(filtered);
    } else{
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
          style={{color:"black"}}
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="Search..."
        />
      </div>
      
      <button onClick={toggleButtons}>
        {showButtons ? 'Hide Options' : 'More Options'}
      </button>

      {showButtons && (
        <div>
          {searchBy.map((opt, idx) => (
            <button key={idx} onClick={() => {
              handleButtonClick(opt)
            }}
            style={{ color: activeChoice1 === opt ? 'red' : 'inherit' }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      <div className="homediv">
        {filteredRequests.map((request) => (
          <RequestBox key={request.id} request={request} />
        ))}
      </div>
      <Pagination></Pagination>
    </>
  );
}
