import React from "react";
import { Link } from "react-router-dom";
import NewProgressBar from "./NewProgressBar";
// import ProgressBar from "./ProgressBar";
import { Badge, Card, Grid, Text, Progress } from "@nextui-org/react";

export default function NewRequestBox({ request }) {
  return (
    <Grid xs={6} sm={4}>
      <Card isPressable isHoverable variant="bordered">
        <Card.Header
          css={{
            position: "absolute",
            zIndex: "1",
            justifyItems: "flex-start",
          }}
        >
          <Badge enableShadow disableOutline color="primary">
            {request.category}
          </Badge>
          <Badge enableShadow disableOutline color="secondary">
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
              height={140}
            />
          </Card.Body>
          <Card.Footer css={{ flexDirection: "column" }}>
            <Text b>I Need Help With:</Text>
            <Text>{request.q1_disability_info}</Text>
            <Text b>This is What I Need:</Text>
            <Text>{request.q2_functional_requirements}</Text>
          </Card.Footer>
          <Card.Footer css={{ justifyItems: "flex-start" }}>
            <NewProgressBar request={request} />
          </Card.Footer>
        </a>
      </Card>
    </Grid>
  );
}
