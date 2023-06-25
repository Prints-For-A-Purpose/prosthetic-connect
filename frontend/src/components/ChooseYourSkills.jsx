import React, { useState, useEffect } from "react";

const ChooseYourSkills = ({ role, selectedOptions, setSelectedOptions }) => {
  const [visible, setVisible] = useState(null);
  const [rec, setRec] = useState(null);
  const [exp, setExp] = useState(null);

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

  const handleSelectChange = (event) => {
    const options = Array.from(event.target.options);
    const selectedValues = options
      .filter((option) => option.selected)
      .map((option) => option.value);
    const s = new Set(selectedOptions);
    if (s.has(selectedValues[0])) {
      s.delete(selectedValues[0]);
      setSelectedOptions(Array.from(s));
    } else {
      setSelectedOptions([...selectedOptions, selectedValues[0]]);
    }
    setExp(explanations[selectedValues[0]]);
  };

  return (
    <>
      {visible && !rec && (
        <>
          <h4>Please select at least one skill to sign up!</h4>
          <select
            multiple
            value={selectedOptions}
            onChange={handleSelectChange}
            style={{ width: "100%" }}
          >
            <option value="3D Printing">3D Printing</option>
            <option value="Design and CAD">Design and CAD</option>
            <option value="Material Knowledge">Material Knowledge</option>
            <option value="Prototyping">Prototyping</option>
            <option value="Customization">Customization</option>
            <option value="Project Management">Project Management</option>
            <option value="CNC Machining">CNC Machining</option>
            <option value="Laser Cutting">Laser Cutting</option>
            <option value="Electronics">Electronics</option>
            <option value="3D Modeling">3D Modeling</option>
            <option value="Welding">Welding</option>
            <option value="Programming">Programming</option>
            <option value="Robotics">Robotics</option>
          </select>
          <p>{exp}</p>
          <p>Selected Options: {selectedOptions.join(", ")}</p>
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
