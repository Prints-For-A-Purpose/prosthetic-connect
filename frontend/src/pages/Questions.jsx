export default function QuestionsPage() {
  return (
    <>
      <h1>Disability or Need Information:</h1>
      <label htmlFor={"details"}>
        {
          "Can you provide a description of your specific disability, condition, or need for which the 3D-printed item is required?"
        }
      </label>
      <input type={"text"} id={"details"} name={"details"} />
      <br />
      <label htmlFor={"functional-limitations"}>
        {
          "Could you share some details about the functional limitations or challenges you face?"
        }
      </label>
      <input
        type={"text"}
        id={"functional-limitations"}
        name={"functional-limitations"}
        required
      />{" "}
      <br />
      <label htmlFor="limb-loss">
        {
          "Can you specify the level of limb loss, if applicable? (e.g., above or below the knee, above or below the elbow)"
        }
      </label>
      <input type={"text"} id={"limb-loss"} name={"limb-loss"} />
      <br />
      <h1>Functional Requirements:</h1>
      <label htmlFor={"requirement"}>
        {
          "What are the desired functionalities or features you would like the 3D-printed item to have? (e.g., grasping, gripping, specific movements)"
        }
      </label>
      <input type={"text"} id={"requirement"} name={"requirement"} required />
      <br />
      <label htmlFor={"specific-activities"}>
        {
          "Can you specify any specific activities or tasks the item should assist you with? (e.g., writing, typing, carrying objects)"
        }
      </label>
      <input
        type={"text"}
        id={"specific-activities"}
        name={"specific-activities"}
        required
      />
      <br />
      <h1>Physical Measurements or Specifications (If Applicable):</h1>
      <label htmlFor={"specifications"}>
        {
          "What measurements or specifications are needed to ensure a comfortable and secure fit of the 3D-printed item? (e.g., circumference, length)"
        }
      </label>
      <input
        type={"text"}
        id={"specifications"}
        name={"specifications"}
        required
      />
      <br />
      <label htmlFor={"physical-considerations"}>
        {
          "Are there any unique physical considerations that should be taken into account to ensure proper customization or adaptation of the 3D-printed item?"
        }
      </label>
      <input
        type={"text"}
        id={"physical-considerations"}
        name={"physical-considerations"}
        required
      />
      <br />
      <h1>Lifestyle and Usage:</h1>
      <label htmlFor={"daily-routine"}>
        {
          "Could you provide relevant details about your daily routine, lifestyle, or specific use cases for the 3D-printed item?"
        }
      </label>
      <input
        type={"text"}
        id={"daily-routine"}
        name={"daily-routine"}
        required
      />
      <br />
      <label htmlFor={"usage-frequency"}>
        {"How frequently and for how long do you expect to use the item?"}
      </label>
      <input
        type={"text"}
        id={"usage-frequency"}
        name={"usage-frequency"}
        required
      />
      <br />
      <h1>Aesthetic Preferences:</h1>
      <label htmlFor={"appearance"}>
        {
          "Do you have any preferred appearance, design features, or customization options in mind for the 3D-printed item? (e.g., color, texture)"
        }
      </label>
      <input type={"text"} id={"appearance"} name={"appearance"} required />
      <br />
      <label htmlFor={"personalization"}>
        {
          "Are there any specific requirements for personalization or branding, if desired?"
        }
      </label>
      <input
        type={"text"}
        id={"personalization"}
        name={"personalization"}
        required
      />
      <br />
      <h1>Medical History and Documentation:</h1>
      <label htmlFor="medical-history">
        Is there any relevant medical history, diagnoses, or professional
        recommendations related to the need for the 3D-printed item?
      </label>
      <input type="text" id="medical-history" name="medical-history" required />
      <br />
      <label htmlFor="supporting-documents">
        Have you been provided with any supporting documentation or references
        by healthcare professionals that you can share?
      </label>
      <input
        type="text"
        id="supporting-documents"
        name="supporting-documents"
      />
      <br />
      <label htmlFor="allergies">
        Do you have any known allergies or material sensitivities that should be
        considered when selecting the appropriate materials for the 3D-printed
        item? (e.g., latex, certain plastics or metals)
      </label>
      <input type="text" id="allergies" name="allergies" required />
      <br />
      <h1>Previous Experience:</h1>
      <label htmlFor="past-experience">
        Have you had any past experiences with prosthetics? If yes, could you
        share your likes, dislikes, and any areas for improvement based on those
        experiences?
      </label>
      <input type="text" id="past-experience" name="past-experience" required />
      <br />
      <h1>Additional Information:</h1>
      <label htmlFor="additional-requests">
        Do you have any other specific requests, concerns, or preferences that
        would help us create a tailored and suitable 3D-printed item for you?
      </label>
      <input
        type="text"
        id="additional-requests"
        name="additional-requests"
        required
      />
      <br />
      <button type="submit">Submit</button>
    </>
  );
}
