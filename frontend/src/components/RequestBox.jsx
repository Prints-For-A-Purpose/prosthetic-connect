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
            zoomed
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
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    xmlSpace="preserve"
                    width={40}
                    height={40}
                    stroke="#7827c8"
                    strokeWidth={12.8}
                  >
                    <path d="M431.584 212.326v-55.131h-33.391v55.13h-32.041v-72.304H332.76v72.306h-32.041v-88.823h-33.391v88.823h-32.041v-72.306h-33.391v72.306h-20.958v59.087l-24.026-15.895-18.424 27.848 42.45 28.084v111.79h20.958V512h229.689v-88.761h20.958V212.326h-20.959zm-33.392 266.283H235.286V423.24h162.906v55.369zm20.958-88.761H214.328v-144.13H419.15v144.13z" />
                    <path
                      transform="rotate(-56.509 94.003 233.9)"
                      d="M77.304 203.534H110.696V264.274H77.304z"
                    />
                    <path d="M201.892 32.725H235.283V106.33099999999999H201.892z" />
                    <path d="M332.763 32.725H366.154V106.33099999999999H332.763z" />
                    <path d="M267.327 0H300.718V89.155H267.327z" />
                    <path d="M398.188 67.384H431.579V122.842H398.188z" />
                    <circle cx={360.612} cy={450.927} r={11.45} />
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
