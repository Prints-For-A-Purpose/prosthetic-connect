import React from "react";
import { Button } from "@nextui-org/react";

// const Component = () => <Button>Click me</Button>;

export default function AboutUs() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    //backgroundColor: '#081f37',
    padding: "2rem",
    // color: '#ffffff',
    fontFamily: "Arial, sans-serif",
  };

  const sectionStyle = {
    margin: "2rem 0",
    textAlign: "center",
  };

  const missionStyle = {
    backgroundColor: "#5fc9f3",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  };

  const whoWeServeStyle = {
    backgroundColor: "#2e79ba",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  };

  const productOverviewStyle = {
    backgroundColor: "#1e549f",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  };

  const teamSectionStyle = {
    backgroundColor: "#1e549f",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    margin: "2rem 0",
    // color: '#ffffff',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const teamMembers = [
    {
      imageSrc: "https://avesis.atauni.edu.tr/user/image/2596",
      name: "Julian Castro",
      title: "Developer",
    },
    {
      imageSrc: "https://avesis.atauni.edu.tr/user/image/2596",
      name: "Jared Knight",
      title: "Developer",
    },
    {
      imageSrc: "https://avesis.atauni.edu.tr/user/image/2596",
      name: "Jacqueline Lopez",
      title: "Developer",
    },
    {
      imageSrc: "https://avesis.atauni.edu.tr/user/image/2596",
      name: "Natalie Garcia",
      title: "Developer",
    },
  ];

  return (
    <div style={containerStyle}>
      <h1
        style={{
          fontSize: "3rem",
          marginBottom: "2rem",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        }}
      >
        About Us
      </h1>
      <Button css={{ backgroundColor: "Salmon" }}>Click me</Button>
      <div style={{ ...sectionStyle, ...missionStyle }}>
        <h3 style={{ fontSize: "2rem" }}>Our Mission</h3>
        <p>
          At Prints For A Purpose, we are committed to bridging the gap between
          individuals in need of assistive devices and a compassionate global
          community of skilled builders. By leveraging the capabilities of 3D
          printing technology, our aim is to create affordable and
          transformative solutions that empower independence and improve lives.
        </p>
      </div>

      <div style={{ ...sectionStyle, ...whoWeServeStyle }}>
        <h3 style={{ fontSize: "2rem" }}>Who We Serve</h3>
        <p>
          Our primary focus at Prints For A Purpose is to serve individuals who
          face disabilities or mobility limitations, especially those who
          encounter financial or physical obstacles. We are dedicated to
          reaching out to underprivileged communities, conflict-affected
          regions, and areas with limited healthcare infrastructure. By
          prioritizing these populations, our goal is to provide accessible
          assistive devices and comprehensive support, empowering individuals to
          overcome challenges, enhance their independence, and lead fulfilling
          lives.
        </p>
      </div>

      <div style={{ ...sectionStyle, ...productOverviewStyle }}>
        <h3 style={{ fontSize: "2rem" }}>Product Overview</h3>
        <p>
          At Prints For A Purpose, we offer a range of products that leverage
          technology and foster community collaboration to enhance the
          accessibility and affordability of assistive devices. We achieve this
          by establishing a platform that connects individuals in need with a
          network of skilled builders. These builders play a vital role in
          facilitating the creation and distribution of affordable, 3D-printed
          devices. By harnessing the potential of 3D printing technology and the
          collective knowledge and compassion of our community, we aim to remove
          barriers and ensure that essential assistive devices are readily
          available to those who require them.
        </p>
      </div>

      <div style={{ ...sectionStyle, ...teamSectionStyle }}>
        <h2
          style={{
            fontSize: "2.5rem",
            marginBottom: "2rem",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          Meet the Team
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          {teamMembers.map((member, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              <img
                src={member.imageSrc}
                alt={member.name}
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                }}
              />
              <h3 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
                {member.name}
              </h3>
              <h4 style={{ fontSize: "1.2rem", opacity: "0.8" }}>
                {member.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
