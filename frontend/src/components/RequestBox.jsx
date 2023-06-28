import React from "react";
import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import { useEffect, useState, useContext } from "react";

import { getRequest } from "../adapters/request-adapter.js";

import { Badge, Card, Grid, Text, Spacer, Avatar } from "@nextui-org/react";

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
    <Grid xs={7} sm={4}>
      <Card isPressable isHoverable variant="bordered">
        <Card.Header
          css={{
            position: "absolute",
            zIndex: "1",
            justifyItems: "flex-start",
          }}
        >
          <Avatar text="Primary" color="primary" textColor="white" src={pfp} />
          <Spacer x={0.5}></Spacer>
          <Badge enableShadow disableOutline color="primary" variant="flat">
            {request.category}
          </Badge>
          <Spacer x={0.5}></Spacer>
          <Badge enableShadow disableOutline color="secondary" variant="flat">
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
            <Text b>I Need Help With:</Text>
            <Text>{request.q1_disability_info}</Text>
            <Text b>This is What I Need:</Text>
            <Text>{request.q2_functional_requirements}</Text>
          </Card.Body>
          <Card.Footer css={{ justifyItems: "flex-start" }}>
            <ProgressBar request={request} size={"md"} />
          </Card.Footer>
        </a>
      </Card>
    </Grid>
  );
}
