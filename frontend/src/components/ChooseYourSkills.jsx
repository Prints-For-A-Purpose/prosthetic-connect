import React, { useState, useEffect, useMemo } from "react";

import { Dropdown, Spacer } from "@nextui-org/react";

const ChooseYourSkills = ({ role, selected, setSelected }) => {
  const [visible, setVisible] = useState(null);
  const [rec, setRec] = useState(null);

  const selectedValue = useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  useEffect(() => {
    setVisible(role === "fabricator" ? true : false);
    setRec(role === "recipient" ? true : false);
  }, [role]);

  const explanations = {
    "3D Printing":
      "Experience in operating and calibrating 3D printers, and understanding the printing process.",
    "Design and CAD":
      "Computer-aided design skills capable of creating and modifying 2D and 3D designs.",
    "Material Knowledge":
      "Knowledgeable of material properties, requirements, and suitable applications.",
    Prototyping:
      "Vigilant testers with rapid prototyping and iterative design processes.",
    Customization:
      "Adapters for individual needs and incorporation of personalized features. ",
    "Project Management":
      "Capable of organizing and coordinating projects while managing timelines, resources and collaboration.",
    "CNC Machining":
      "Competent at milling, cutting, or drilling with CNC equipment and tooling software.",
    "Laser Cutting": "Proficiency in laser cutting and engraving techniques.",
    Electronics:
      "Knowledge of electronic components, wiring, soldering, PCB designs, and microcontrollers. ",
    "3D Modeling":
      "Intricate sculpting and artistic modeling for 3D printers. ",
    Welding:
      "Proficiency in welding techniques for combining metal structures or frames.",
    Programming:
      "Knowledge of programming languages and software development. ",
    Robotics:
      "Experienced in creating mechanical components with structural integrity and ergonomics.",
  };

  return (
    <>
      {visible && !rec && (
        <>
          <Spacer y={0.5}></Spacer>
          <h4>Fabricator please select at least one skill to sign up!</h4>
          <p>
            {
              explanations[
                Array.from(selected)[Array.from(selected).length - 1]
              ]
            }
          </p>
          <Spacer y={0.5}></Spacer>
          <Dropdown placement="left-bottom">
            <Dropdown.Button
              flat
              color="secondary"
              css={{ tt: "capitalize", height: "auto", whiteSpace: "normal" }}
            >
              {selectedValue}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Multiple selection actions"
              color="secondary"
              disallowEmptySelection
              selectionMode="multiple"
              selectedKeys={selected}
              onSelectionChange={setSelected}
            >
              <Dropdown.Item key="3D Printing">3D Printing</Dropdown.Item>
              <Dropdown.Item key="Design and CAD">Design and CAD</Dropdown.Item>
              <Dropdown.Item key="Material Knowledge">
                Material Knowledge
              </Dropdown.Item>
              <Dropdown.Item key="Prototyping">Prototyping</Dropdown.Item>
              <Dropdown.Item key="Customization">Customization</Dropdown.Item>
              <Dropdown.Item key="Project Management">
                Project Management
              </Dropdown.Item>
              <Dropdown.Item key="CNC Machining">CNC Machining</Dropdown.Item>
              <Dropdown.Item key="Laser Cutting">Laser Cutting</Dropdown.Item>
              <Dropdown.Item key="Electronics">Electronics</Dropdown.Item>
              <Dropdown.Item key="3D Modeling">3D Modeling</Dropdown.Item>
              <Dropdown.Item key="Welding">Welding</Dropdown.Item>
              <Dropdown.Item key="Programming">Programming</Dropdown.Item>
              <Dropdown.Item key="Robotics">Robotics</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Spacer y={0.5}></Spacer>

          <p>
            Welcome, fabricators! By joining our community, you become an
            essential part of our mission to make a positive impact through 3D
            printing and fabrication. As a fabricator, your expertise in design,
            3D printing, and craftsmanship can help create customized solutions
            for individuals with unique needs. You'll have the opportunity to
            collaborate with recipients, bringing their visions to life and
            making a real difference. From prosthetics to assistive devices and
            more, your skills will empower others, improve lives, and inspire
            hope. Sign up now and be a part of this incredible community!
          </p>
        </>
      )}
      {rec && !visible && (
        <p>
          Hello, recipients! We're here to support you in finding the perfect
          solutions for your specific needs. By joining our platform, you'll
          connect with skilled fabricators who are passionate about creating
          customized 3D-printed items. Whether you need a prosthetic, assistive
          device, or something unique, our fabricators are here to make it
          happen. Through collaboration and communication, you'll guide the
          process and receive a personalized solution tailored to your
          requirements. Join us now and become a part of our growing community
          of individuals benefiting from innovative technology and
          accessibility. Let's create together!
        </p>
      )}
    </>
  );
};

export default ChooseYourSkills;
