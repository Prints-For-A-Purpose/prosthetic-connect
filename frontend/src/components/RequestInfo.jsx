import { useNavigate } from "react-router-dom";
import ChangeStatus from "./ChangeStatus";
import {
  deleteRequest,
  updateQuestionnaire,
} from "../adapters/request-adapter";
import { useState, useMemo } from "react";
import {
  Input,
  Dropdown,
  Spacer,
  Textarea,
  Row,
  Button,
  Collapse,
  Text,
  Grid,
  Avatar,
} from "@nextui-org/react";

export default function RequestInfo({
  request,
  currentUser,
  setStatus,
  setErrorText,
  complete,
  numOfActive,
}) {
  const navigate = useNavigate();
  const {
    q1_disability_info,
    q2_functional_requirements,
    q3_physical_specifications,
    q4_lifestyle_usage,
    q5_additional,
    fabricators_needed,
    category,
  } = request;
  const [edit, setEdit] = useState({
    q1_disability_info,
    q2_functional_requirements,
    q3_physical_specifications,
    q4_lifestyle_usage,
    q5_additional,
    fabricators_needed,
    category,
  });
  const [newContent, setNewContent] = useState({
    q1_disability_info,
    q2_functional_requirements,
    q3_physical_specifications,
    q4_lifestyle_usage,
    q5_additional,
    fabricators_needed,
    category,
  });

  const [exp, setExp] = useState(false);

  const [formVisibility, setFormVisibility] = useState({ display: "none" });
  const [buttonVisibility, setButtonVisibility] = useState({
    display: "inline-block",
  });

  const categoryDescriptions = {
    Prosthetics: "Prosthetic for various body parts.",
    "Assistive Devices":
      "Adaptive Tools that aid those with disabilities in their daily activities.",
    "Accessibility Modifications":
      "Improving and modifying existing objects or environments.",
    Orthotics: "Orthotic devices to support and protect body parts.",
    "Mobility Aids":
      "Enhance mobility such as wheelchair accessories or walking aids.",
    "Sensory Enhancements":
      "Enhance sensory experiences such as tactical maps, braille materials, or tools for those with visual or hearing impairments.",
    "Educational Resources":
      "3D-printed educational tools, models, or resources to support learning for individuals who need them.",
    "Customization and Personalization":
      "Personalized and custom solutions, including aesthetic modifications.",
    "Wearable Technology and Accessories":
      "Wearable smart accessories that regulate and guide those who need assistance.",
    "Medical Tools": "Instruments and tools used in healthcare settings",
    "Rehabilitation Aids":
      "Devices or tools used in physical therapy or rehabilitation programs. ",
    "Animal Prosthetics":
      "Prosthetics designed for animals, such as pets or wildlife. ",
    "Craniofacial Optics":
      "Glasses and other devices to support craniofacial deformities or conditions affecting the head and face. ",
    Miscellaneous:
      "For unique or less common requirements, also includes those unsure of which category their need falls into. ",
  };

  const difficultyTags = {
    1: "Beginner: Simple and suitable for beginners.",
    2: "Intermediate: Moderate complexity requires more prior knowledge and experience.",
    3: "Advanced: Intricate and challenging, for those with advanced skills and expertise.",
    4: "Expert: Highly complex and intricate designs, needing specialized techniques, materials and technology.",
  };

  const [difficulty, setDifficulty] = useState(
    difficultyTags[fabricators_needed]
  );

  const [s, setS] = useState(new Set([category]));

  const selectedValue = useMemo(
    () => Array.from(s).join(", ").replaceAll("_", " "),
    [s]
  );

  const deleteReq = async () => {
    await deleteRequest(request.id);
    return navigate(`/users/${currentUser.id}`);
  };

  const showForm = () => {
    setExp(true);
    setFormVisibility({ display: "block" });
    setButtonVisibility({
      display: "none",
    });
  };

  const handleChange = (event) => {
    if (
      event.target.name === "fabricators_needed" &&
      event.target.value.length > 1
    )
      event.target.value = event.target.value[1];
    if (
      (event.target.name === "fabricators_needed" && +event.target.value > 4) ||
      +event.target.value === 0
    )
      event.target.value = "";
    setEdit({
      ...edit,
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "fabricators_needed") {
      setDifficulty(difficultyTags[event.target.value]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = await new FormData(event.target);
    formData = Object.fromEntries(formData.entries());
    formData.id = request.id;
    formData.category = Array.from(s)[0];
    if (formData.fabricators_needed === undefined)
      formData.fabricators_needed = fabricators_needed;
    await updateQuestionnaire(formData);
    setFormVisibility({ display: "none" });
    setButtonVisibility({
      display: "inline-block",
    });
    setNewContent({
      ...edit,
    });
  };

  const authorized = currentUser && +currentUser.id === +request.user_id;

  return (
    <>
      <Row css={{ justifyContent: "center" }}>
        {authorized && (
          <ChangeStatus
            request={request}
            request_id={request.id}
            setStatus={setStatus}
            newContent={newContent}
            setErrorText={setErrorText}
            complete={complete}
            numOfActive={numOfActive}
          ></ChangeStatus>
        )}
      </Row>
      <Row css={{ justifyContent: "center" }}>
        <form onSubmit={handleSubmit} aria-label="form">
          <Grid.Container gap={2}>
            <Grid>
              <Collapse.Group shadow accordion={false}>
                <Collapse
                  expanded={exp}
                  title={
                    <Text h3 color="secondary">
                      Condition Description
                    </Text>
                  }
                  subtitle={
                    <Text h5>
                      Please provide a description of your specific disability,
                      condition, or need
                    </Text>
                  }
                  contentLeft={
                    <Avatar
                      size="lg"
                      src={request.pfp_url}
                      color="gradient"
                      bordered
                    />
                  }
                  arrowIcon={
                    <svg
                      width={40}
                      height={40}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1280.000000 1280.000000"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <g
                        transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                        fill="#000000"
                        stroke="none"
                      >
                        <path d="M8586 12784 c-442 -87 -787 -435 -871 -877 -19 -103 -19 -311 0 -414 84 -445 433 -794 878 -878 103 -19 311 -19 414 0 445 84 794 433 878 878 19 103 19 311 0 414 -84 445 -433 794 -878 878 -98 19 -326 18 -421 -1z" />
                        <path d="M8241 10384 c-83 -22 -173 -70 -236 -126 -50 -45 -3036 -3813 -3113 -3930 -60 -89 -85 -173 -90 -298 -7 -193 44 -328 172 -456 118 -119 259 -176 431 -175 166 0 293 50 405 159 38 37 646 796 1350 1687 705 891 1291 1625 1303 1632 38 21 76 15 108 -16 36 -36 38 -75 6 -122 -13 -19 -193 -249 -400 -512 l-377 -477 0 -1355 0 -1355 829 -2279 c456 -1253 843 -2305 860 -2338 95 -189 300 -349 515 -403 109 -28 284 -27 392 0 288 73 511 297 584 585 26 99 28 271 6 367 -8 36 -324 914 -701 1951 l-685 1885 2 1742 3 1742 197 -254 198 -253 0 -1039 c0 -910 2 -1046 16 -1099 54 -209 222 -377 431 -431 76 -20 230 -20 303 -1 165 44 308 162 389 322 64 128 61 54 61 1428 l0 1251 -760 980 c-459 591 -788 1005 -829 1044 -74 71 -160 119 -257 144 -88 23 -1029 23 -1113 0z" />
                        <path d="M3305 3078 c-808 -1332 -1523 -2509 -1587 -2616 l-118 -195 0 -65 c0 -82 31 -140 94 -177 86 -50 221 -25 271 52 25 37 3121 5137 3135 5162 9 18 2 24 -68 60 -82 43 -198 133 -226 176 -9 14 -20 25 -24 25 -4 0 -668 -1090 -1477 -2422z" />
                        <path d="M6832 3010 c-436 -1067 -802 -1974 -813 -2017 -27 -108 -27 -279 1 -388 57 -226 209 -417 415 -520 125 -63 220 -85 365 -85 139 0 236 21 355 79 142 68 285 204 352 335 15 28 233 555 485 1171 l458 1120 -407 1122 c-225 617 -410 1123 -413 1123 -3 -1 -362 -873 -798 -1940z" />
                      </g>
                    </svg>
                  }
                >
                  <Text style={buttonVisibility}>
                    {newContent.q1_disability_info}
                  </Text>
                  <div style={formVisibility}>
                    <Textarea
                      css={{ mw: "80%" }}
                      type="text"
                      maxLength="1000"
                      fullWidth="true"
                      className="form-input"
                      name="q1_disability_info"
                      initialValue={q1_disability_info}
                      onChange={handleChange}
                      required={request.request_status !== "Archived"}
                      status="secondary"
                      label={newContent.q1_disability_info}
                      aria-label="q1_disability_info"
                    />
                  </div>
                </Collapse>
                <Collapse
                  expanded={exp}
                  title={
                    <Text h3 color="secondary">
                      Desired Functionality
                    </Text>
                  }
                  subtitle={
                    <Text h5>
                      What are the desired functionalities or features you would
                      like the 3D-printed device to have?
                    </Text>
                  }
                  contentLeft={
                    <Avatar
                      size="lg"
                      src={request.pfp_url}
                      color="gradient"
                      bordered
                    />
                  }
                  arrowIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={40}
                      height={40}
                      viewBox="0 0 1280.000000 1280.000000"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <g
                        transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                        fill="#000000"
                        stroke="none"
                      >
                        <path d="M6455 12264 c-22 -2 -107 -8 -190 -14 -1353 -99 -2435 -640 -3137 -1566 -491 -648 -828 -1520 -983 -2543 l-18 -114 -98 -174 c-302 -530 -636 -1055 -980 -1538 -205 -286 -194 -269 -224 -359 -29 -87 -34 -217 -11 -302 34 -129 150 -277 264 -338 30 -15 259 -97 510 -180 l457 -153 0 -659 c1 -552 3 -688 18 -837 36 -366 91 -597 191 -813 227 -483 704 -766 1446 -859 69 -8 236 -21 373 -27 l247 -12 0 -401 c0 -338 3 -410 16 -456 43 -145 147 -271 275 -332 295 -141 626 -12 747 290 l27 68 0 535 c0 520 -1 537 -22 613 -109 383 -391 654 -773 743 -46 11 -163 18 -395 24 -459 12 -624 36 -775 116 -147 77 -211 169 -249 360 -38 189 -42 297 -47 1209 -3 581 -8 909 -15 945 -27 138 -147 294 -269 353 -30 14 -185 68 -345 118 -159 51 -292 93 -294 95 -2 2 44 76 102 166 378 588 632 1017 749 1267 81 173 107 260 144 485 144 869 404 1520 814 2036 106 134 345 374 475 476 514 406 1109 620 1925 695 190 18 700 15 920 -5 680 -61 1233 -212 1745 -475 342 -175 580 -345 839 -599 142 -140 253 -276 385 -472 326 -485 529 -1029 607 -1625 22 -161 25 -640 6 -855 -6 -80 -17 -211 -22 -291 -33 -455 -151 -894 -354 -1314 -138 -285 -256 -470 -486 -760 -652 -824 -848 -1215 -892 -1774 -19 -252 10 -566 88 -945 85 -412 119 -501 234 -610 108 -101 219 -146 366 -146 95 0 213 27 287 67 81 43 171 139 212 225 72 152 72 218 -4 524 -94 379 -121 537 -121 720 0 364 100 565 607 1216 466 599 638 863 798 1233 235 540 366 1312 366 2157 -1 837 -152 1533 -480 2213 -238 491 -523 890 -907 1265 -812 793 -1941 1247 -3314 1330 -147 9 -733 11 -835 4z" />
                        <path d="M7380 10375 c0 -11 -131 -579 -134 -582 -5 -5 -249 -103 -257 -103 -4 0 -117 70 -252 155 -135 85 -250 155 -257 155 -56 0 -480 -424 -480 -480 0 -7 67 -119 149 -249 81 -130 151 -242 155 -249 6 -11 -89 -272 -99 -272 -7 0 -580 -131 -582 -133 -1 -2 -8 -36 -14 -77 -17 -100 -17 -433 0 -540 l12 -85 287 -64 c158 -36 292 -69 298 -75 6 -6 33 -66 59 -133 l48 -122 -153 -241 c-84 -133 -154 -249 -157 -259 -15 -58 432 -506 486 -486 8 3 122 73 252 156 130 82 243 149 250 149 17 0 240 -88 252 -99 5 -5 137 -560 137 -578 0 -2 159 -3 353 -3 l353 0 64 283 c35 155 67 287 72 294 10 12 234 103 255 103 7 0 123 -70 259 -156 135 -85 251 -153 258 -151 27 11 177 137 257 216 79 80 205 230 216 257 2 7 -66 123 -151 258 -86 136 -156 252 -156 259 0 17 89 240 101 252 5 5 139 39 297 75 l287 65 12 80 c15 103 16 423 2 535 l-11 87 -232 52 c-127 29 -260 60 -295 69 l-65 17 -48 119 c-26 66 -48 126 -48 134 0 8 67 121 149 251 83 130 153 244 156 252 20 54 -428 501 -486 486 -10 -3 -126 -73 -259 -157 l-241 -153 -122 48 c-67 26 -127 53 -133 61 -5 7 -39 141 -75 298 l-64 286 -352 0 c-194 0 -353 -2 -353 -5z m495 -1600 c70 -18 171 -79 230 -139 159 -163 199 -390 104 -592 -128 -271 -458 -382 -723 -241 -122 64 -218 186 -260 326 -18 62 -21 193 -5 261 37 162 184 324 342 376 91 30 214 34 312 9z" />
                      </g>
                    </svg>
                  }
                >
                  <Text style={buttonVisibility}>
                    {newContent.q2_functional_requirements}
                  </Text>
                  <div style={formVisibility}>
                    <Textarea
                      css={{ mw: "80%" }}
                      type="text"
                      maxLength="1000"
                      fullWidth="true"
                      className="form-input"
                      name="q2_functional_requirements"
                      initialValue={q2_functional_requirements}
                      onChange={handleChange}
                      required={request.request_status !== "Archived"}
                      status="secondary"
                      label={newContent.q2_functional_requirements}
                      aria-label="q2_functional_requirements"
                    />
                  </div>
                </Collapse>
                <Collapse
                  expanded={exp}
                  title={
                    <Text h3 color="secondary">
                      Measurements
                    </Text>
                  }
                  contentLeft={
                    <Avatar
                      size="lg"
                      src={request.pfp_url}
                      color="gradient"
                      bordered
                    />
                  }
                  subtitle={
                    <Text h5>
                      What measurements or specifications are needed to ensure a
                      comfortable and secure fit of the item?
                    </Text>
                  }
                  arrowIcon={
                    <svg
                      fill="#000000"
                      width={40}
                      height={40}
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 48 48"
                      xmlSpace="preserve"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <g id="SVGRepo_iconCarrier">
                        <path
                          id="Layer_2_00000092431144745784285970000001917386071455724723_"
                          d="M39.4,22.6c-0.7-0.8-1.9-0.8-2.7-0.1 c0,0-0.1,0.1-0.1,0.1c-1.2,1.2-2.6,2.3-4.1,3.1l-3.9-9.2C30.8,15,32,12.6,32,10c0-4.4-3.6-8-8-8s-8,3.6-8,8c0,2.6,1.3,5.1,3.4,6.6 l-3.9,9.1c-1.5-0.8-2.9-1.9-4.1-3.1c-0.7-0.8-1.9-0.8-2.7-0.1c0,0-0.1,0.1-0.1,0.1c-0.8,0.8-0.8,2.1,0,2.9c1.6,1.6,3.3,2.9,5.3,4 l-3.2,7.4l-1.1,8.5c0,0.3,0.2,0.5,0.5,0.5c0.2,0,0.3-0.1,0.4-0.2l6.8-14.8c1.5,0.5,3.1,0.9,4.7,1V33c0,1.1,0.9,2,2,2s2-0.9,2-2v-1.1 c1.6-0.1,3.2-0.5,4.8-1l6.7,14.8c0.2,0.5,1,0.3,1-0.3l-1.2-8.6l-3.2-7.3c1.9-1.1,3.7-2.4,5.3-4C40.2,24.7,40.1,23.4,39.4,22.6z M24,6c2.2,0,4,1.8,4,4s-1.8,4-4,4s-4-1.8-4-4S21.8,6,24,6z M26,27.8V27c0-1.1-0.9-2-2-2s-2,0.9-2,2v0.8c-1-0.1-2-0.3-3-0.6l4.1-9.2 h1.8l4.2,9.3C28.1,27.6,27,27.7,26,27.8z"
                        />
                      </g>
                    </svg>
                  }
                >
                  <Text style={buttonVisibility}>
                    {newContent.q3_physical_specifications}
                  </Text>
                  <div style={formVisibility}>
                    <Textarea
                      css={{ mw: "80%" }}
                      type="text"
                      maxLength="1000"
                      fullWidth="true"
                      className="form-input"
                      name="q3_physical_specifications"
                      initialValue={q3_physical_specifications}
                      onChange={handleChange}
                      required={request.request_status !== "Archived"}
                      status="secondary"
                      label={newContent.q3_physical_specifications}
                      aria-label="q3_physical_specifications"
                    />
                  </div>
                </Collapse>
                <Collapse
                  expanded={exp}
                  title={
                    <Text h3 color="secondary">
                      Life Style
                    </Text>
                  }
                  contentLeft={
                    <Avatar
                      size="lg"
                      src={request.pfp_url}
                      color="gradient"
                      bordered
                    />
                  }
                  subtitle={
                    <Text h5>
                      Please provide relevant details about your daily routine,
                      lifestyle, or specific use cases for the device
                    </Text>
                  }
                  arrowIcon={
                    <svg
                      width={40}
                      height={40}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.5 11.5h-1l-1.5 3-2-6-1.5 3h-1m3.493-6.364c-2-2.338-5.333-2.966-7.838-.826s-2.858 5.719-.89 8.25c1.485 1.912 5.706 5.751 7.683 7.515.363.324.545.486.758.55.184.055.39.055.575 0 .212-.064.394-.226.757-.55 1.977-1.764 6.198-5.603 7.684-7.515 1.967-2.531 1.658-6.132-.89-8.25-2.549-2.118-5.84-1.512-7.839.826z"
                        stroke="#000"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                >
                  <Text style={buttonVisibility}>
                    {newContent.q4_lifestyle_usage}
                  </Text>
                  <div style={formVisibility}>
                    <Textarea
                      css={{ mw: "80%" }}
                      type="text"
                      maxLength="1000"
                      className="form-input"
                      fullWidth="true"
                      name="q4_lifestyle_usage"
                      initialValue={q4_lifestyle_usage}
                      onChange={handleChange}
                      required={request.request_status !== "Archived"}
                      status="secondary"
                      label={newContent.q4_lifestyle_usage}
                      aria-label="q4_lifestyle_usage"
                    />
                  </div>
                </Collapse>
                <Collapse
                  expanded={exp}
                  title={
                    <Text h3 color="secondary">
                      Additional Information
                    </Text>
                  }
                  subtitle={
                    <Text h5>
                      Do you have any requests, concerns, or preferences that
                      can help us create your item?
                    </Text>
                  }
                  arrowIcon={
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      width={40}
                      height={40}
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z"
                          stroke="#000000"
                          strokeWidth={2}
                        />
                        <path
                          d="M12 14V12C12 12 15 11.3667 15 9.5C15 7.63332 12.9231 7 12 7C11.0769 7 9 7.5 9 9.5"
                          stroke="#000000"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13.227 16.9535C13.227 17.6313 12.6775 18.1808 11.9997 18.1808C11.3219 18.1808 10.7725 17.6313 10.7725 16.9535C10.7725 16.2757 11.3219 15.7262 11.9997 15.7262C12.6775 15.7262 13.227 16.2757 13.227 16.9535Z"
                          fill="#000000"
                        />
                      </g>
                    </svg>
                  }
                  contentLeft={
                    <Avatar
                      size="lg"
                      src={request.pfp_url}
                      color="gradient"
                      bordered
                    />
                  }
                >
                  <Text style={buttonVisibility}>
                    {newContent.q5_additional}
                  </Text>
                  <div style={formVisibility}>
                    <Textarea
                      css={{ mw: "80%" }}
                      type="text"
                      maxLength="1000"
                      className="form-input"
                      fullWidth="true"
                      name="q5_additional"
                      initialValue={q5_additional}
                      onChange={handleChange}
                      status="secondary"
                      label={newContent.q5_additional}
                      aria-label="q5_additional"
                    />
                  </div>
                </Collapse>
                <Collapse
                  expanded={exp}
                  title={
                    <Text h3 color="secondary">
                      Category
                    </Text>
                  }
                  subtitle={
                    <Text h5>
                      What is the category of item do you think you need?
                    </Text>
                  }
                  contentLeft={
                    <Avatar
                      size="lg"
                      src={request.pfp_url}
                      color="gradient"
                      bordered
                    />
                  }
                  arrowIcon={
                    <svg
                      fill="#000000"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 512 512"
                      xmlSpace="preserve"
                      width={40}
                      height={40}
                      stroke="#000000"
                      strokeWidth={12.8}
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <g id="SVGRepo_iconCarrier">
                        <g>
                          <g>
                            <path d="M431.584,212.326v-55.131h-33.391v55.13h-32.041v-72.304H332.76v72.306h-32.041v-88.823h-33.391v88.823h-32.041v-72.306 h-33.391v72.306h-20.958v59.087l-24.026-15.895l-18.424,27.848l42.45,28.084v111.79h20.958V512h229.689v-88.761h20.958V212.326 H431.584z M398.192,478.609H235.286v-55.369h162.906V478.609z M419.15,389.848H214.328v-144.13H419.15V389.848z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <rect
                              x={77.304}
                              y={203.534}
                              transform="matrix(0.5518 -0.834 0.834 0.5518 -152.9406 183.2325)"
                              width={33.392}
                              height={60.74}
                            />
                          </g>
                        </g>
                        <g>
                          <g>
                            <rect
                              x={201.892}
                              y={32.725}
                              width={33.391}
                              height={73.606}
                            />
                          </g>
                        </g>
                        <g>
                          <g>
                            <rect
                              x={332.763}
                              y={32.725}
                              width={33.391}
                              height={73.606}
                            />
                          </g>
                        </g>
                        <g>
                          <g>
                            <rect x={267.327} width={33.391} height={89.155} />
                          </g>
                        </g>
                        <g>
                          <g>
                            <rect
                              x={398.188}
                              y={67.384}
                              width={33.391}
                              height={55.458}
                            />
                          </g>
                        </g>
                        <g>
                          <g>
                            <circle cx={360.612} cy={450.927} r={11.45} />
                          </g>
                        </g>
                      </g>
                    </svg>
                  }
                >
                  <Text>
                    <b>{Array.from(s)[0]}:</b>{" "}
                    {categoryDescriptions[Array.from(s)[0]]}
                  </Text>
                  <div style={formVisibility}>
                    <Dropdown>
                      <Dropdown.Button
                        flat
                        color="secondary"
                        css={{ tt: "capitalize" }}
                      >
                        {selectedValue}
                      </Dropdown.Button>
                      <Dropdown.Menu
                        aria-label="Single selection actions"
                        color="secondary"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={s}
                        onSelectionChange={setS}
                      >
                        <Dropdown.Item
                          key="Prosthetics"
                          value="Prosthetics"
                          name="Prosthetics"
                          description={categoryDescriptions["Prosthetics"]}
                        >
                          Prosthetics
                        </Dropdown.Item>
                        <Dropdown.Item
                          key="Assistive Devices"
                          value="Assistive Devices"
                          name="Assistive Devices"
                          description={
                            categoryDescriptions["Assistive Devices"]
                          }
                        >
                          Assistive Devices
                        </Dropdown.Item>
                        <Dropdown.Item
                          key="Orthotics"
                          value="Orthotics"
                          name="Orthotics"
                          description={categoryDescriptions["Orthotics"]}
                        >
                          Orthotics
                        </Dropdown.Item>
                        <Dropdown.Item
                          key="Mobility Aids"
                          value="Mobility Aids"
                          name="Mobility Aids"
                          description={categoryDescriptions["Mobility Aids"]}
                        >
                          Mobility Aids
                        </Dropdown.Item>
                        <Dropdown.Item
                          key="Wearable Technology and Accessories"
                          value="Wearable Technology and Accessories"
                          name="Wearable Technology and Accessories"
                          description={
                            categoryDescriptions[
                              "Wearable Technology and Accessories"
                            ]
                          }
                        >
                          Wearable Technology and Accessories
                        </Dropdown.Item>
                        <Dropdown.Item
                          key="Customization and Personalization"
                          value="Customization and Personalization"
                          name="Customization and Personalization"
                          description={
                            categoryDescriptions[
                              "Customization and Personalization"
                            ]
                          }
                        >
                          Customization and Personalization
                        </Dropdown.Item>
                        <Dropdown.Item
                          key="Medical Tools"
                          value="Medical Tools"
                          name="Medical Tools"
                          description={categoryDescriptions["Medical Tools"]}
                        >
                          Medical Tools
                        </Dropdown.Item>
                        <Dropdown.Item
                          key="Rehabilitation Aids"
                          value="Rehabilitation Aids"
                          name="Rehabilitation Aids"
                          description={
                            categoryDescriptions["Rehabilitation Aids"]
                          }
                        >
                          Rehabilitation Aids
                        </Dropdown.Item>
                        <Dropdown.Item
                          key="Animal Prosthetics"
                          value="Animal Prosthetics"
                          name="Animal Prosthetics"
                          description={
                            categoryDescriptions["Animal Prosthetics"]
                          }
                        >
                          Animal Prosthetics
                        </Dropdown.Item>
                        <Dropdown.Item
                          key="Craniofacial Optics"
                          value="Craniofacial Optics"
                          name="Craniofacial Optics"
                          description={
                            categoryDescriptions["Craniofacial Optics"]
                          }
                        >
                          Craniofacial Optics
                        </Dropdown.Item>
                        <Dropdown.Item
                          key="Miscellaneous"
                          value="Miscellaneous"
                          name="Miscellaneous"
                          description={categoryDescriptions["Miscellaneous"]}
                        >
                          Miscellaneous / Other
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Collapse>
                <Collapse
                  expanded={exp}
                  title={
                    <Text h3 color="secondary">
                      Complexity
                    </Text>
                  }
                  subtitle={
                    <Text h5>
                      How many Fabricators do you think you
                      need?ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
                      {/* need?ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ */}
                    </Text>
                  }
                  contentLeft={
                    <Avatar
                      size="lg"
                      src={request.pfp_url}
                      color="gradient"
                      bordered
                    />
                  }
                  arrowIcon={
                    <svg
                      width={40}
                      height={40}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      xmlSpace="preserve"
                      fill="#000"
                      stroke="#000000"
                      strokeWidth={12.8}
                    >
                      <path d="M480.707 256.004c0-10.099-6.711-18.528-15.889-21.353v-74.08c9.178-2.825 15.889-11.239 15.889-21.362 0-12.386-10.044-22.422-22.43-22.422-5.916 0-11.262 2.334-15.25 6.079l-64.06-36.993c.367-1.631.608-3.302.608-5.049 0-12.394-10.044-22.431-22.438-22.431-5.916 0-11.254 2.326-15.25 6.072l-64.059-36.977c.375-1.639.616-3.31.616-5.058C278.444 10.044 268.4 0 256.006 0c-12.386 0-22.43 10.044-22.43 22.43 0 1.748.242 3.419.601 5.058l-64.052 36.977c-4.011-3.746-9.35-6.072-15.25-6.072-12.386 0-22.446 10.037-22.446 22.431 0 1.748.234 3.418.617 5.049l-64.052 36.993c-4.011-3.746-9.358-6.079-15.273-6.079-12.386 0-22.43 10.036-22.43 22.422 0 10.123 6.719 18.536 15.889 21.362v74.08c-9.17 2.825-15.889 11.254-15.889 21.353 0 10.099 6.719 18.528 15.889 21.353v74.065c-9.17 2.809-15.889 11.246-15.889 21.361 0 12.386 10.044 22.43 22.43 22.43 5.916 0 11.262-2.318 15.273-6.063l64.052 36.969c-.383 1.647-.617 3.302-.617 5.065 0 12.379 10.037 22.415 22.431 22.415 5.916 0 11.254-2.326 15.265-6.064l64.052 36.97c-.375 1.654-.609 3.31-.609 5.073 0 12.378 10.029 22.422 22.423 22.422 12.409 0 22.453-10.044 22.453-22.422 0-1.764-.241-3.419-.624-5.073l64.052-36.97c4.011 3.738 9.35 6.064 15.265 6.064 12.394 0 22.438-10.036 22.438-22.415 0-1.764-.242-3.418-.624-5.065l64.052-36.969c4.011 3.746 9.358 6.063 15.273 6.063 12.386 0 22.43-10.044 22.43-22.43 0-10.115-6.711-18.552-15.889-21.361v-74.065c9.179-2.825 15.89-11.254 15.89-21.353zM176.683 75.79l64.067-36.993c4.003 3.746 9.342 6.079 15.258 6.079 5.916 0 11.254-2.334 15.25-6.079l64.067 36.993c-.374 1.615-.616 3.294-.616 5.034 0 1.748.242 3.418.616 5.049l-64.067 36.993c-4.003-3.746-9.342-6.079-15.25-6.079-5.916 0-11.254 2.334-15.265 6.079l-64.06-36.993c.374-1.631.616-3.302.616-5.049 0-1.741-.242-3.419-.616-5.034zm-28.362 334.026c-3.286 1.022-6.251 2.7-8.71 4.995l-64.067-36.978c.382-1.631.624-3.309.624-5.049 0-10.115-6.72-18.552-15.89-21.361v-74.065c3.293-1.015 6.259-2.716 8.717-5.011l64.052 37.01c-.383 1.623-.617 3.293-.617 5.041 0 10.099 6.704 18.528 15.89 21.353v74.065zm0-116.78c-3.286 1.022-6.251 2.693-8.71 4.987l-64.067-36.986c.382-1.616.624-3.301.624-5.034 0-10.099-6.72-18.528-15.89-21.353v-74.08c3.293-1.022 6.259-2.692 8.717-4.995l64.052 36.993c-.383 1.623-.617 3.302-.617 5.042 0 10.114 6.704 18.528 15.89 21.353v74.073zm-8.71-111.784l-64.067-36.994c.382-1.631.624-3.293.624-5.05 0-1.724-.242-3.418-.624-5.033l64.067-36.993c4.004 3.746 9.342 6.071 15.265 6.071 5.9 0 11.239-2.326 15.25-6.071l64.052 36.993c-.375 1.615-.609 3.309-.609 5.033 0 1.749.234 3.419.609 5.05l-64.059 36.994c-4.004-3.746-9.342-6.072-15.258-6.072-5.908 0-11.246 2.326-15.25 6.072zm109.841 286.973a22.188 22.188 0 00-8.709 4.964l-64.06-36.985c.374-1.6.616-3.302.616-5.019 0-10.114-6.72-18.551-15.882-21.368V335.75c3.286-1.014 6.251-2.708 8.71-5.003l64.052 37.002c-.375 1.608-.609 3.286-.609 5.034 0 10.099 6.696 18.535 15.882 21.361v74.081zm0-116.803c-3.285 1.014-6.251 2.708-8.709 5.01l-64.06-36.993c.374-1.623.616-3.31.616-5.042 0-10.114-6.72-18.544-15.882-21.361v-74.073c3.286-1.014 6.251-2.7 8.71-5.002l64.052 36.994c-.375 1.631-.609 3.293-.609 5.049 0 10.099 6.696 18.528 15.882 21.353v74.065zm6.541-117.848c-5.9 0-11.239 2.326-15.25 6.072l-64.06-36.994c.374-1.623.616-3.285.616-5.041 0-1.74-.242-3.419-.616-5.042l64.06-36.993c4.011 3.754 9.35 6.072 15.265 6.072 5.908 0 11.247-2.318 15.25-6.072l64.067 36.993c-.382 1.623-.624 3.302-.624 5.042 0 1.733.242 3.418.624 5.041l-64.067 36.978c-4.003-3.731-9.342-6.056-15.25-6.056h-.015zm94.606 176.242c-9.179 2.817-15.898 11.254-15.898 21.368 0 1.718.242 3.419.624 5.019l-64.067 36.985c-2.458-2.279-5.432-3.973-8.71-4.964v-74.08c9.162-2.826 15.897-11.262 15.897-21.361 0-1.748-.241-3.426-.624-5.034l64.052-37.002c2.458 2.294 5.424 3.989 8.726 5.003v74.066zm0-116.78c-9.179 2.817-15.898 11.246-15.898 21.361 0 1.732.242 3.419.624 5.042l-64.067 36.993c-2.458-2.302-5.416-3.996-8.71-5.01v-74.065c9.162-2.818 15.897-11.254 15.897-21.353 0-1.756-.241-3.418-.624-5.057l64.052-36.986c2.458 2.302 5.424 3.988 8.726 5.002v74.073zm-8.726-111.784l-64.052-36.994c.383-1.631.624-3.293.624-5.05 0-1.724-.241-3.418-.624-5.033l64.067-36.993c3.996 3.746 9.334 6.071 15.25 6.071s11.262-2.326 15.266-6.071l64.052 36.993c-.367 1.615-.624 3.309-.624 5.033 0 1.757.257 3.419.624 5.05l-64.052 36.994c-4.019-3.746-9.358-6.072-15.266-6.072-5.915 0-11.253 2.326-15.265 6.072zm109.864 170.17c-9.186 2.809-15.905 11.246-15.905 21.361 0 1.74.257 3.418.624 5.049l-64.052 36.978c-2.458-2.294-5.432-3.973-8.726-4.995V335.75c9.186-2.825 15.898-11.254 15.898-21.353 0-1.748-.242-3.418-.624-5.041l64.052-37.01c2.458 2.294 5.447 3.996 8.732 5.011v74.065zm0-116.771c-9.186 2.825-15.905 11.254-15.905 21.353 0 1.733.257 3.418.624 5.034l-64.052 36.986c-2.458-2.294-5.432-3.965-8.726-4.987v-74.073c9.186-2.825 15.898-11.238 15.898-21.353 0-1.74-.242-3.419-.624-5.042l64.076-36.993c2.435 2.302 5.424 3.972 8.709 4.995v74.08z" />
                    </svg>
                  }
                >
                  <Text style={buttonVisibility}>
                    <b>
                      {newContent.fabricators_needed} or More Fabricators Needed
                    </b>
                  </Text>
                  <div style={formVisibility}>
                    <Input
                      label={newContent.fabricators_needed}
                      type="number"
                      status="secondary"
                      className="form-input"
                      name="fabricators_needed"
                      min={1}
                      max={4}
                      onChange={handleChange}
                      disabled={request.request_status !== "Archived"}
                      defaultValue={fabricators_needed}
                      aria-label="fabricators_needed"
                    />
                  </div>
                  <Text>{difficulty}</Text>
                </Collapse>
                {authorized && (
                  <Collapse
                    title={
                      <Text h3 color="secondary">
                        Edit Or Delete Your Request
                      </Text>
                    }
                    expanded
                    contentLeft={
                      <Avatar
                        size="lg"
                        src={request.pfp_url}
                        color="gradient"
                        bordered
                      />
                    }
                    arrowIcon={
                      <svg
                        width={40}
                        height={40}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.99 16.854l-1.314 3.504a.75.75 0 00.966.965l3.503-1.314a3 3 0 001.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 00-.687 1.068zm12.249-12.63l1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z"
                          fill="#000"
                        />
                      </svg>
                    }
                  >
                    <Button
                      style={formVisibility}
                      color="secondary"
                      flat
                      type="submit"
                    >
                      Submit Edit
                    </Button>
                    <Spacer y={1}></Spacer>
                    <Row css={{ justifyContent: "space-between" }}>
                      {authorized && (
                        <>
                          <Spacer x={1}></Spacer>
                          <Button
                            color="secondary"
                            flat
                            auto
                            shadow
                            style={buttonVisibility}
                            onPress={showForm}
                            aria-label="Show"
                            iconRight={
                              <svg
                                width={30}
                                height={30}
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                              >
                                <path
                                  fill="#000"
                                  fillRule="evenodd"
                                  d="M15.198 3.52a1.612 1.612 0 012.223 2.336L6.346 16.421l-2.854.375 1.17-3.272L15.197 3.521zm3.725-1.322a3.612 3.612 0 00-5.102-.128L3.11 12.238a1 1 0 00-.253.388l-1.8 5.037a1 1 0 001.072 1.328l4.8-.63a1 1 0 00.56-.267L18.8 7.304a3.612 3.612 0 00.122-5.106zM12 17a1 1 0 100 2h6a1 1 0 100-2h-6z"
                                />
                              </svg>
                            }
                          ></Button>

                          <Spacer x={1}></Spacer>
                        </>
                      )}
                      {authorized && (
                        <>
                          <Button
                            auto
                            color="secondary"
                            flat
                            shadow
                            onClick={deleteReq}
                            style={buttonVisibility}
                            aria-label="Delete"
                            icon={
                              <svg
                                width={30}
                                height={30}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8 6h11a1 1 0 011 1v10a1 1 0 01-1 1H8l-6-6 3-3m11 0l-3 3m0 0l-3 3m3-3l-3-3m3 3l3 3"
                                  stroke="#000"
                                  strokeWidth={1.5}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            }
                          ></Button>
                          <Spacer x={1}></Spacer>
                        </>
                      )}
                    </Row>
                    <Spacer y={1}></Spacer>
                  </Collapse>
                )}
              </Collapse.Group>
            </Grid>
          </Grid.Container>
        </form>
      </Row>
    </>
  );
}
