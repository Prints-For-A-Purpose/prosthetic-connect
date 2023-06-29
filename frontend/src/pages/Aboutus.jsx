import React from "react";
import {
  Button,
  Row,
  Text,
  Card,
  Spacer,
  Avatar,
  Col,
  Badge,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import jackieImage from "./team-images/jackie.jpg";
import jaredImage from "./team-images/jared.jpg";
import julianImage from "./team-images/julian.jpg";
import natalieImage from "./team-images/natalie.jpg";
// const Component = () => <Button>Click me</Button>;

export default function AboutUs() {
  const navigate = useNavigate();

  const teamMembers = [
    {
      imageSrc: julianImage,
      name: "Julian Castro",
      title: "Project Manager",
    },
    {
      imageSrc: jaredImage,
      name: "Jared Knight",
      title: "Developer",
    },
    {
      imageSrc: jackieImage,
      name: "Jacqueline Lopez",
      title: "Developer",
    },
    {
      imageSrc: natalieImage,
      name: "Natalie Garcia",
      title: "Developer",
    },
  ];

  return (
    <>
      <Row css={{ justifyContent: "center" }}>
        <Text
          h1
          size={60}
          css={{
            textGradient: "45deg, $purple600 -20%, $pink600 100%",
            textAlign: "center",
          }}
          weight="bold"
        >
          About Us
        </Text>
      </Row>

      <Row css={{ justifyContent: "center" }}>
        <Card
          isHoverable
          variant="bordered"
          css={{
            "--nextui--cardColor": "var(--nextui-colors-purple300)",
            maxWidth: "60%",
          }}
        >
          <Card.Header css={{ justifyContent: "center" }}>
            <svg
              fill="#7827c8"
              viewBox="-6 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#7827c8"
              width={36}
              height={36}
            >
              <path d="M19.36 6.6c-.4-.4-.92-.56-1.48-.6-2.36 0-5.96 3.4-8.44 5.96l-.24.28c-.36.28-2.2.2-3.28.16-1.6-.08-3.12-.12-4.12.24-.52.2-1.16.92-1.56 1.48-.24.32-.24.76.04 1.08l2.76 3.28c-.44.56-.64 1.2-.64 1.88 0 .56.16 1.12.44 1.6l-.48.48a.87.87 0 000 1.2c.16.16.4.24.6.24s.44-.08.6-.24l.48-.48a3.226 3.226 0 003.44-.12l3.28 2.76c.16.12.36.2.56.2s.36-.04.52-.16c.56-.44 1.28-1.08 1.48-1.56.4-.96.32-2.48.24-4.12-.04-1.08-.12-2.92.16-3.28l.28-.28c2.56-2.52 5.96-6.12 5.96-8.44-.04-.64-.24-1.16-.6-1.56zm-6.6 8.76l-.28.28c-.76.76-.72 2.24-.64 4.56.04 1.28.12 2.72-.12 3.36-.04.08-.24.28-.44.44L8 21.24a.956.956 0 00-.56-.2h-.08c-.24 0-.44.12-.56.32-.04.04-.08.08-.08.12-.56.56-1.56.56-2.16 0a1.545 1.545 0 010-2.16c.04-.04.08-.08.12-.08.16-.16.28-.36.32-.56 0-.24-.04-.44-.2-.64l-2.76-3.28.44-.44c.64-.24 2.08-.2 3.36-.12 2.32.08 3.8.12 4.56-.64l.28-.28c4.64-4.76 6.52-5.44 7.24-5.48.2 0 .24.04.28.08s.08.08.08.28c-.04.64-.76 2.56-5.52 7.2z" />
            </svg>
            <Spacer x={0.5}></Spacer>

            <Text b h2>
              Our Mission
            </Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body>
            <Text css={{ textAlign: "center" }} h4>
              At Prints For A Purpose, we are committed to bridging the gap
              between individuals in need of assistive devices and a
              compassionate global community of skilled builders. By leveraging
              the capabilities of 3D printing technology, our aim is to create
              affordable and transformative solutions that empower independence
              and improve lives.
            </Text>
          </Card.Body>
        </Card>
      </Row>
      <Spacer y={1}></Spacer>
      <Row css={{ justifyContent: "center" }}>
        <Card
          isHoverable
          variant="bordered"
          css={{
            "--nextui--cardColor": "var(--nextui-colors-purple200)",
            maxWidth: "60%",
          }}
        >
          <Card.Header css={{ justifyContent: "center" }}>
            <svg
              width={32}
              height={32}
              fill="#7827c8"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M29.064 19.701a3.695 3.695 0 00-1.423-.28c-.577 0-1.123.13-1.611.362l.023-.01-5.778 2.595c.003-.047.026-.087.026-.134a2.502 2.502 0 00-2.706-2.468l.009-.001h-3.783l-4.76-1.395a.68.68 0 00-.207-.031H6.681v-.757a.75.75 0 00-.75-.75H2.048a.75.75 0 00-.75.75V29.79c0 .414.336.75.75.75h3.883a.75.75 0 00.75-.75v-1.005c1.818.284 3.445.742 4.987 1.367l-.149-.054c1.15.416 2.478.656 3.862.656h.021-.001.017c1.604 0 3.133-.319 4.528-.898l-.078.029a22.049 22.049 0 003.297-1.799l-.082.051c.338-.209.674-.418 1.014-.619 1.633-.967 2.945-1.816 4.129-2.672a16.919 16.919 0 001.563-1.253l-.014.013a3.11 3.11 0 00.871-1.116l.008-.019a.732.732 0 00.03-.431l.001.005a3.181 3.181 0 00-1.603-2.337l-.016-.008zm-23.883 9.34H2.798V18.332h2.383zm23.538-6.5a15.1 15.1 0 01-1.328 1.062l-.047.032c-1.143.826-2.418 1.65-4.014 2.596-.348.205-.691.418-1.037.631a20.16 20.16 0 01-2.864 1.586l-.13.053a10.3 10.3 0 01-3.892.748c-1.203 0-2.359-.203-3.436-.575l.074.022c-1.555-.648-3.363-1.145-5.248-1.407l-.117-.013V19.84h2.062l4.76 1.395a.68.68 0 00.207.031h3.894c.883 0 1.197.521 1.197.969s-.314.969-1.197.969h-6.809a.75.75 0 000 1.5H18.579c.11 0 .214-.024.307-.068l-.004.002 7.795-3.5a2.403 2.403 0 011.738-.087l-.017-.005c.383.23.658.604.752 1.046l.002.011a4.305 4.305 0 01-.429.435l-.005.004zM17 17.767a8.237 8.237 0 10-8.238-8.238 8.246 8.246 0 008.237 8.237zm-6.331-6.017h2.575a10.067 10.067 0 001.707 4.189l-.021-.032a6.757 6.757 0 01-4.246-4.111l-.015-.047zm8.291-5.486l-3.919-.019a7.75 7.75 0 011.956-3.23l.001-.001a7.801 7.801 0 011.947 3.195l.015.055zm.351 1.502c.092.528.146 1.138.148 1.761v.003c0 .255-.025.482-.04.721H14.58c-.015-.239-.04-.466-.04-.721.003-.633.057-1.25.16-1.852l-.009.066zm4.425 1.763a6.428 6.428 0 01-.078.759l.005-.038h-2.758c.014-.245.053-.462.053-.721a12.893 12.893 0 00-.139-1.826l.009.07 2.65.013c.155.52.249 1.119.257 1.738v.005zm-8.97 2.221h4.468A8.048 8.048 0 0117 16.046a8.016 8.016 0 01-2.227-4.247l-.007-.049zm-1.672-1.5h-2.759a6.314 6.314 0 01-.072-.706l-.001-.015c.01-.647.11-1.267.289-1.853l-.012.047 2.634.013c-.082.537-.13 1.158-.133 1.79v.003c0 .259.04.475.053.721zm5.976 5.657a9.972 9.972 0 001.678-4.098l.008-.059h2.574a6.755 6.755 0 01-4.213 4.143l-.047.014zm3.796-9.624l-2.349-.011a9.849 9.849 0 00-1.467-3.151l.021.031a6.76 6.76 0 013.778 3.097l.017.034zm-7.937-3.131a9.714 9.714 0 00-1.422 3.017l-.016.069-2.327-.011a6.762 6.762 0 013.718-3.061l.047-.014z" />
            </svg>
            <Spacer x={0.5}></Spacer>

            <Text b h2>
              Who We Serve
            </Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body>
            <Text css={{ textAlign: "center" }} h4>
              Our primary focus at Prints For A Purpose is to serve individuals
              who face disabilities or mobility limitations, especially those
              who encounter financial or physical obstacles. We are dedicated to
              reaching out to underprivileged communities, conflict-affected
              regions, and areas with limited healthcare infrastructure. By
              prioritizing these populations, our goal is to provide accessible
              assistive devices and comprehensive support, empowering
              individuals to overcome challenges, enhance their independence,
              and lead fulfilling lives.
            </Text>
          </Card.Body>
        </Card>
      </Row>
      <Spacer y={1}></Spacer>
      <Row css={{ justifyContent: "center" }}>
        <Card
          isHoverable
          variant="bordered"
          css={{
            "--nextui--cardColor": "var(--nextui-colors-purple300)",
            maxWidth: "60%",
          }}
        >
          <Card.Header
            css={{ justifyContent: "center", alignItems: "baseline" }}
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#000"
            >
              <g id="SVGRepo_iconCarrier">
                <defs>
                  <style>
                    {
                      ".cls-1{fill:none;stroke:#7827c8;stroke-miterlimit:10;stroke-width:1.92px}"
                    }
                  </style>
                </defs>
                <g id="roll_brush" data-name="roll brush">
                  <path
                    className="cls-1"
                    d="M8.14 17.8L5.26 14.92 8.14 12.04"
                  />
                  <path
                    className="cls-1"
                    d="M15.81 17.8L18.69 14.92 15.81 12.04"
                  />
                  <path className="cls-1" d="M10.06 17.8L13.89 12.04" />
                  <path className="cls-1" d="M1.43 1.49H22.53V22.59H1.43z" />
                  <path
                    className="cls-1"
                    d="M22.53 7.25L16.25 7.25 14.33 7.25 1.43 7.25 1.43 1.49 22.53 1.49 22.53 7.25z"
                  />
                  <path className="cls-1" d="M4.3 4.37L6.22 4.37" />
                  <path className="cls-1" d="M8.14 4.37L10.06 4.37" />
                  <path className="cls-1" d="M11.98 4.37L13.89 4.37" />
                </g>
              </g>
            </svg>
            <Spacer x={0.5}></Spacer>

            <Text b h2>
              Product Overview
            </Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body>
            <Text css={{ textAlign: "center" }} h4>
              At Prints For A Purpose, we offer a range of products that
              leverage technology and foster community collaboration to enhance
              the accessibility and affordability of assistive devices. We
              achieve this by establishing a platform that connects individuals
              in need with a network of skilled builders. These builders play a
              vital role in facilitating the creation and distribution of
              affordable, 3D-printed devices. By harnessing the potential of 3D
              printing technology and the collective knowledge and compassion of
              our community, we aim to remove barriers and ensure that essential
              assistive devices are readily available to those who require them.
            </Text>
          </Card.Body>
        </Card>
      </Row>
      <Spacer y={1}></Spacer>
      <Row css={{ justifyContent: "center" }}>
        <Card
          isHoverable
          variant="bordered"
          css={{
            "--nextui--cardColor": "var(--nextui-colors-purple200)",
            maxWidth: "80%",
          }}
        >
          <Card.Header
            css={{ justifyContent: "center", alignItems: "baseline" }}
          >
            <svg
              height={32}
              width={32}
              id="_x32_"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              fill="#7827c8"
            >
              <g id="SVGRepo_iconCarrier">
                <style>{".st0{fill:#7827c8}"}</style>
                <path
                  className="st0"
                  d="M435.95 287.525c32.51 0 58.87-26.343 58.87-58.853 0-32.51-26.361-58.871-58.87-58.871-32.502 0-58.863 26.361-58.863 58.871.001 32.51 26.361 58.853 58.863 58.853zM511.327 344.251c-2.623-15.762-15.652-37.822-25.514-47.677-1.299-1.306-7.105-1.608-8.673-.636-11.99 7.374-26.074 11.714-41.19 11.714-15.099 0-29.184-4.34-41.175-11.714-1.575-.972-7.373-.67-8.672.636-2.757 2.757-5.765 6.427-8.698 10.683 7.935 14.94 14.228 30.81 16.499 44.476 2.27 13.7 1.533 26.67-2.138 38.494 13.038 4.717 28.673 6.787 44.183 6.787 40.455 0 81.855-14.027 75.378-52.763zM254.487 262.691c52.687 0 95.403-42.716 95.403-95.402 0-52.67-42.716-95.386-95.403-95.386-52.678 0-95.378 42.716-95.378 95.386 0 52.686 42.699 95.402 95.378 95.402zM335.269 277.303c-2.07-2.061-11.471-2.588-14.027-1.006-19.448 11.966-42.271 18.971-66.755 18.971-24.466 0-47.3-7.005-66.738-18.971-2.555-1.583-11.956-1.055-14.026 1.006-16.021 16.004-37.136 51.782-41.384 77.288-10.474 62.826 56.634 85.508 122.148 85.508 65.532 0 132.639-22.682 122.165-85.508-4.248-25.506-25.363-61.284-41.383-77.288zM76.049 287.525c32.502 0 58.862-26.343 58.862-58.853 0-32.51-26.36-58.871-58.862-58.871-32.511 0-58.871 26.361-58.871 58.871 0 32.51 26.36 58.853 58.871 58.853zM115.094 351.733c2.414-14.353 9.225-31.253 17.764-46.88-2.38-3.251-4.759-6.083-6.955-8.279-1.299-1.306-7.097-1.608-8.672-.636-11.991 7.374-26.076 11.714-41.182 11.714-15.108 0-29.202-4.34-41.183-11.714-1.568-.972-7.382-.67-8.681.636-9.887 9.854-22.882 31.915-25.514 47.677-6.468 38.736 34.924 52.762 75.378 52.762 14.437 0 29.016-1.777 41.459-5.84-3.921-12.065-4.751-25.338-2.414-39.44z"
                />
              </g>
            </svg>
            <Spacer x={0.5}></Spacer>
            <Text b h2>
              Our Team
            </Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body>
            <Row css={{ justifyContent: "space-evenly", flexWrap: "wrap" }}>
              <Avatar
                size="lg"
                isClickable
                src={julianImage}
                color="gradient"
                zoomed
                bordered
                css={{ width: "25%", height: "auto" }}
                onClick={() =>
                  window.open("https://www.linkedin.com/in/castro-julian/")
                }
              />
              <Avatar
                size="lg"
                src={jaredImage}
                color="gradient"
                zoomed
                bordered
                css={{ width: "25%", height: "auto" }}
                onClick={() =>
                  window.open("https://www.linkedin.com/in/jaredknight0/")
                }
              />
              <Avatar
                size="lg"
                src={jackieImage}
                color="gradient"
                zoomed
                bordered
                css={{ width: "25%", height: "auto" }}
                onClick={() =>
                  window.open("https://www.linkedin.com/in/jackiegl/")
                }
              />
              <Avatar
                size="lg"
                src={natalieImage}
                color="gradient"
                zoomed
                bordered
                css={{ width: "25%", height: "auto" }}
                onClick={() =>
                  window.open("https://www.linkedin.com/in/natalie-garcia000/")
                }
              />
            </Row>
          </Card.Body>
        </Card>
      </Row>
      <Spacer y={1}></Spacer>
    </>
  );
}
