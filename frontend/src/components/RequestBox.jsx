import React from "react";
import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import { useEffect, useState, useContext } from "react";

import { getRequest } from "../adapters/request-adapter.js";

import {
  Badge,
  Card,
  Grid,
  Text,
  Spacer,
  Avatar,
  Row,
  Col,
} from "@nextui-org/react";

export default function RequestBox({ request }) {
  const [pfp, setPfp] = useState("");

  useEffect(() => {
    const loadRequest = async () => {
      const [{ pfp_url }] = await getRequest(request.id);
      setPfp(pfp_url);
    };
    loadRequest();
  });

  return (
    <Grid xs={12} sm={5}>
      <Card isPressable isHoverable variant="bordered">
        <Card.Header
          css={{
            position: "absolute",
            zIndex: "1",
            justifyItems: "flex-start",
          }}
        >
          <Avatar
            text="Primary"
            color="gradient"
            textColor="white"
            bordered
            src={pfp}
            size="xl"
          />
          <Spacer x={0.5}></Spacer>
          <Badge
            enableShadow
            disableOutline
            color="primary"
            variant="flat"
            size="md"
          >
            {request.category}
          </Badge>
          <Spacer x={0.5}></Spacer>
          <Badge
            enableShadow
            disableOutline
            color="secondary"
            variant="flat"
            size="md"
          >
            {request.fabricators_needed === 4
              ? "Expert"
              : request.fabricators_needed === 3
              ? "Advanced"
              : request.fabricators_needed === 2
              ? "Intermediate"
              : "Beginner"}
          </Badge>
        </Card.Header>
        <a href={`/requests/${request.id}/`}>
          <Card.Body css={{ p: 0 }}>
            <Card.Image
              src={request.image_url}
              objectFit="cover"
              width="100%"
              height={225}
            />
          </Card.Body>
          <Card.Body css={{ flexDirection: "column" }}>
            <Row>
              <Col>
                <Row>
                  <svg
                    width={40}
                    height={40}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.5 11.5h-1l-1.5 3-2-6-1.5 3h-1m3.493-6.364c-2-2.338-5.333-2.966-7.838-.826s-2.858 5.719-.89 8.25c1.485 1.912 5.706 5.751 7.683 7.515.363.324.545.486.758.55.184.055.39.055.575 0 .212-.064.394-.226.757-.55 1.977-1.764 6.198-5.603 7.684-7.515 1.967-2.531 1.658-6.132-.89-8.25-2.549-2.118-5.84-1.512-7.839.826z"
                      stroke="#7827c8"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <Spacer x={0.5}></Spacer>
                  <Text color="secondary" b size="$lg">
                    {"I Have Trouble With This:"}
                  </Text>
                </Row>
                <Spacer x={0.5}></Spacer>
                <Text size="$lg">{request.q1_disability_info}</Text>
              </Col>
              <Col>
                <Row
                  css={{ justifyContent: "center", alignItems: "flex-start" }}
                >
                  <svg
                    fill="#7827c8"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512 512"
                    xml:space="preserve"
                    width="40"
                    height="40"
                    stroke="#7827c8"
                    stroke-width="12.8"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <g>
                        <g>
                          <path d="M431.584,212.326v-55.131h-33.391v55.13h-32.041v-72.304H332.76v72.306h-32.041v-88.823h-33.391v88.823h-32.041v-72.306 h-33.391v72.306h-20.958v59.087l-24.026-15.895l-18.424,27.848l42.45,28.084v111.79h20.958V512h229.689v-88.761h20.958V212.326 H431.584z M398.192,478.609H235.286v-55.369h162.906V478.609z M419.15,389.848H214.328v-144.13H419.15V389.848z"></path>
                        </g>
                      </g>
                      <g>
                        <g>
                          <rect
                            x="77.304"
                            y="203.534"
                            transform="matrix(0.5518 -0.834 0.834 0.5518 -152.9406 183.2325)"
                            width="33.392"
                            height="60.74"
                          ></rect>
                        </g>
                      </g>
                      <g>
                        <g>
                          <rect
                            x="201.892"
                            y="32.725"
                            width="33.391"
                            height="73.606"
                          ></rect>
                        </g>
                      </g>
                      <g>
                        <g>
                          <rect
                            x="332.763"
                            y="32.725"
                            width="33.391"
                            height="73.606"
                          ></rect>
                        </g>
                      </g>
                      <g>
                        <g>
                          <rect
                            x="267.327"
                            width="33.391"
                            height="89.155"
                          ></rect>
                        </g>
                      </g>
                      <g>
                        <g>
                          <rect
                            x="398.188"
                            y="67.384"
                            width="33.391"
                            height="55.458"
                          ></rect>
                        </g>
                      </g>
                      <g>
                        <g>
                          <circle cx="360.612" cy="450.927" r="11.45"></circle>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <Spacer x={0.5}></Spacer>
                  <Text color="secondary" b size="$lg">
                    {"Could You Make Me This?"}
                  </Text>
                </Row>
                <Text size="$lg">{request.q2_functional_requirements}</Text>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer css={{ justifyItems: "flex-start" }}>
            <ProgressBar request={request} size={"md"} />
          </Card.Footer>
        </a>
      </Card>
    </Grid>
  );
}
