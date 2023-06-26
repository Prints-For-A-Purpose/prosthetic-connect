// import { useContext, useState } from "react";
import { Button } from "@nextui-org/react";

export default function NextUISandbox() {
  return (
    <>
      <Button
        as="a"
        href="https://www.google.com/"
        css={{ backgroundColor: "#ff9089" }}
      >
        Click me
      </Button>
      <Button
        css={{
          borderRadius: "0",
          "&:hover": {
            backgroundColor: "black",
            color: "white",
          },
        }}
      >
        Button
      </Button>
      <Button css={{ backgroundColor: "#ff9089" }}>Click me</Button>
      <Button
        css={{
          borderRadius: "0",
          color: "white",
          "&:hover": { backgroundColor: "$blue9" },
          "@bp1": { backgroundColor: "$green9" },
          "@bp2": { backgroundColor: "$purple9" },
        }}
      >
        Button
      </Button>
    </>
  );
}
