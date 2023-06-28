import { moveStatusProgress } from "../adapters/request-adapter";
import { archiveRequest, startProject } from "../adapters/invites-adapter";

import { useState } from "react";

import { Modal, Input, Row, Checkbox, Button, Text } from "@nextui-org/react";

export default function ChangeStatus({
  request,
  setStatus,
  request_id,
  newContent,
  setErrorText,
  complete,
}) {
  const { request_status } = request;

  const statusDescriptions = {
    Pending: {
      color: "#ff1100",
      description:
        "The Recipient's request is currently waiting for enough Fabricators to join.",
    },
    Planning: {
      description:
        "This is the phase of defining goals, requirements, and project scope. It involves the understanding of the Recipient's situation and working together for brainstorming and researching ideas. The Recipient is welcomed to be as proactive as they want through the next coming phases. ",
      color: "#ff9222",
    },
    Design: {
      description:
        "This stage focuses on the specific design of the product. Mock-ups and visualization of the final outcome are reached here.",
      color: "#f8e03e",
    },
    Development: {
      description:
        "Now the construction of the device is set into motion. 3D printing, assembly, coding, and other technical requirements begin here.",
      color: "#5bee5b",
    },
    Testing: {
      description:
        "Testing phase is used to ensure functionality, quality, and compliance with the Recipient's exact specifications.",
      color: "#12a3a3",
    },
    Review: {
      description:
        "The review stage involves evaluation and feedback gathering. Here is where improvements and modifications are followed through with.",
      color: "#1c99c0",
    },
    Iteration: {
      description:
        "During iteration, multiple rounds of feedback and versions are required for continuous refinement until the instrument is up to par with the original intent.",
      color: "#ce00ce",
    },
    Documentation: {
      description:
        "Providing documentation in this stage is necessary to preserve knowledge for future fabricators and to serve as reference for device maintenance by the Recipient.",
      color: "#a12cf7",
    },
    Deployment: {
      description:
        "In the last phase, delivery and integration of the device from the Fabricator(s) finally reaches the Recipient who needs it. ",
      color: "#008080",
    },
    Archived: {
      description:
        "Archived requests are only visible to the Recipient. Drafts are also held as archived until the Recipient is ready to publish them publicly.",
      color: "#ff9089",
    },
  };

  const {
    q1_disability_info,
    q2_functional_requirements,
    q3_physical_specifications,
    q4_lifestyle_usage,
    fabricators_needed,
    category,
  } = newContent;

  const [newStatus, setNewStatus] = useState(request_status);
  const [explanation, setExplanation] = useState(
    statusDescriptions[request_status].description
  );
  const [buttonColor, setButtonColor] = useState(
    statusDescriptions[request_status].color
  );

  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const handleChange = (event) => {
    setNewStatus(event.target.value);
    setExplanation(statusDescriptions[event.target.value].description);
    setButtonColor(statusDescriptions[event.target.value].color);
  };

  const statusName = Object.keys(statusDescriptions);
  let index = statusName.findIndex((e) => e === request_status);

  const handleSelectSubmit = async (event) => {
    event.preventDefault();
    if (
      q1_disability_info === "" ||
      q2_functional_requirements === "" ||
      q3_physical_specifications === "" ||
      q4_lifestyle_usage === "" ||
      category === "" ||
      fabricators_needed === ""
    ) {
      setErrorText(
        "Please finish your questions before unarchiving this request."
      );
    } else {
      await moveStatusProgress(request_id, newStatus);
      await setStatus(newStatus);
      if (newStatus === "Archived") {
        await archiveRequest(request_id);
      } else if (newStatus === "Planning") {
        await startProject(request_id);
      }
    }
    closeHandler();
  };

  return (
    <>
      <div>
        <Button
          auto
          flat
          color="secondary"
          shadow
          onPress={handler}
          css={{ zIndex: "0" }}
        >
          Change Status
        </Button>
        <Modal
          closeButton
          blur
          aria-labelledby="modal-title"
          width="600px"
          scroll
          open={visible}
          onClose={closeHandler}
        >
          <form onSubmit={handleSelectSubmit} aria-label="form">
            <Modal.Header>
              <Text id="modal-title" size={18}>
                <b>You </b>Control The Request Status
              </Text>
            </Modal.Header>
            <Modal.Body>
              <label>Pick a new Status:</label>
              <select onChange={handleChange} defaultValue={newStatus}>
                <option value="Archived" name="Archived">
                  Archived - 0%
                </option>
                <option
                  value="Pending"
                  name="Pending"
                  disabled={
                    request_status === "Planning" ||
                    request_status === "Design" ||
                    q1_disability_info === "" ||
                    q2_functional_requirements === "" ||
                    q3_physical_specifications === "" ||
                    q4_lifestyle_usage === "" ||
                    category === "" ||
                    fabricators_needed === "" ||
                    (index > 3 && index !== 9)
                  }
                >
                  Pending - 5%
                </option>
                <option
                  value="Planning"
                  name="Planning"
                  disabled={index > 2 || !complete}
                >
                  Planning - 10%
                </option>
                <option
                  value="Design"
                  name="Design"
                  disabled={
                    index > 3 ||
                    request_status === "Archived" ||
                    request_status === "Pending"
                  }
                >
                  Design - 30%
                </option>
                <option
                  value="Development"
                  name="Development"
                  disabled={
                    index > 4 ||
                    request_status === "Archived" ||
                    request_status === "Pending"
                  }
                >
                  Development - 50%
                </option>
                <option
                  value="Testing"
                  name="Testing"
                  disabled={
                    index > 5 ||
                    request_status === "Archived" ||
                    request_status === "Pending"
                  }
                >
                  Testing - 70%
                </option>
                <option
                  value="Review"
                  name="Review"
                  disabled={
                    index > 6 ||
                    request_status === "Archived" ||
                    request_status === "Pending"
                  }
                >
                  Review - 80%
                </option>
                <option
                  value="Iteration"
                  name="Iteration"
                  disabled={
                    index > 7 ||
                    request_status === "Archived" ||
                    request_status === "Pending"
                  }
                >
                  Iteration - 90%
                </option>
                <option
                  value="Documentation"
                  name="Documentation"
                  disabled={
                    index > 8 ||
                    request_status === "Archived" ||
                    request_status === "Pending"
                  }
                >
                  Documentation - 95%
                </option>
                <option
                  value="Deployment"
                  name="Deployment"
                  disabled={
                    index === 8 ||
                    request_status === "Archived" ||
                    request_status === "Pending"
                  }
                >
                  Deployment - 100%
                </option>
              </select>
              <br></br>
              <p>{explanation}</p>
              <div>
                {request_status === "Deployment" && (
                  <p>
                    Congratulations on making it to deployment. If there is
                    something wrong with the product talk to your team to try to
                    solve it. If it really can't be resolved then you are
                    welcome to change the request status. Before making any
                    decisions please be certain your are making the most
                    informed choice.
                  </p>
                )}
                {newStatus === "Pending" &&
                  newStatus === request_status &&
                  !complete && (
                    <p>
                      Thank you for completing the questionnaire. Right now you
                      don't have the minimum required number of fabricators to
                      being working on your request. While you wait you can
                      continue to refine your answers or if you already have
                      some fabricators you can get to know each other in the
                      mean time.
                    </p>
                  )}

                {newStatus === request_status &&
                  request_status === "Archived" &&
                  (q1_disability_info === "" ||
                    q2_functional_requirements === "" ||
                    q3_physical_specifications === "" ||
                    q4_lifestyle_usage === "" ||
                    category === "" ||
                    fabricators_needed === "") && (
                    <p>
                      You've made excellent progress so far to your
                      questionnaire. When you are ready and have submitted all
                      your answers then you may move your project forward.
                    </p>
                  )}

                {newStatus === request_status &&
                  request_status === "Archived" &&
                  !(
                    q1_disability_info === "" ||
                    q2_functional_requirements === "" ||
                    q3_physical_specifications === "" ||
                    q4_lifestyle_usage === "" ||
                    category === "" ||
                    fabricators_needed === ""
                  ) && (
                    <p>
                      Great job on finishing your questionnaire. When you are
                      ready you can publish it by changing it to pending.
                    </p>
                  )}

                {newStatus !== request_status &&
                  newStatus === "Pending" &&
                  request_status !== "Planning" && (
                    <p>
                      Once you are satisfied with your answers to the
                      questionnaire you may move your project to pending. Once
                      pending your request will become public and fabricators
                      may find and join your request.
                    </p>
                  )}

                {request_status === "Pending" &&
                  newStatus === request_status &&
                  complete && (
                    <p>
                      Congrats, you completed the questionnaire, you have all
                      your fabricators ready, so now when you and your team are
                      ready you can start the planning phase.
                    </p>
                  )}

                {newStatus !== "Deployment" &&
                  newStatus === "Planning" &&
                  request_status === "Pending" &&
                  complete && (
                    <p>
                      When you're ready you can go ahead and move to planning.
                    </p>
                  )}

                {(request_status === "Documentation" ||
                  request_status === "Iteration" ||
                  request_status === "Review") &&
                  request_status === newStatus && (
                    <p>You are so close, keep going!</p>
                  )}

                {request_status !== "Deployment" &&
                  newStatus !== "Deployment" &&
                  request_status !== newStatus &&
                  complete && (
                    <p>
                      Carefully understand what this stage entails before
                      deciding to change {request_status} to {newStatus}.
                    </p>
                  )}

                {request_status === "Documentation" &&
                  request_status === newStatus && (
                    <p>
                      One more step to deployment, be proud of yourselves for
                      all the hard work to get here.
                    </p>
                  )}

                {request_status !== "Pending" &&
                  request_status !== "Archived" &&
                  request_status !== "Deployment" &&
                  request_status !== "Documentation" &&
                  newStatus === request_status &&
                  complete && (
                    <p>
                      Carefully understand what every stage means before
                      deciding to change it from {request_status}.
                    </p>
                  )}

                {request_status !== "Deployment" &&
                  request_status !== "Archived" &&
                  request_status !== "Pending" &&
                  newStatus === request_status &&
                  complete && (
                    <p>
                      Now that the request is being worked on you can move the
                      project forward. The time it take for each phase can vary
                      a lot, use the percentages as a reference for
                      understanding the development timeline of the phase. You
                      can now move your project forward to any point. But be
                      careful and proactively communicate with your whole team
                      to make sure you are all ready to move your project
                      forward. You can only move your project backwards one
                      phase at a time.
                    </p>
                  )}

                {newStatus !== request_status && newStatus === "Archived" && (
                  <p>
                    If you archive your request all pending and accepted
                    fabricators will be removed from this request. Your request
                    will now be visible only to you from your profile and
                    fabricators cannot join. Please take your time to complete
                    the questionnaire to the best of your abilities. When you
                    are ready to publish it you can change the status to
                    pending. If you no longer want to create a request you can
                    alternatively delete it.
                  </p>
                )}

                {request_status !== "Documentation" &&
                  request_status !== "Deployment" &&
                  newStatus !== "Planning" &&
                  newStatus === "Deployment" &&
                  complete && (
                    <p>Are you sure you want to move to deployment?</p>
                  )}

                {request_status === "Documentation" &&
                  request_status !== "Deployment" &&
                  newStatus !== "Planning" &&
                  newStatus === "Deployment" &&
                  complete && <p>Do you have what it takes?</p>}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button auto flat color="error" onPress={closeHandler}>
                Cancel
              </Button>
              <Button
                auto
                onPress={closeHandler}
                type="submit"
                style={{
                  background: buttonColor,
                }}
              >
                Change Status
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </>
  );
}
