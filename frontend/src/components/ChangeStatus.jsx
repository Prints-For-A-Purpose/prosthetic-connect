import { moveStatusProgress } from "../adapters/request-adapter";
import { archiveRequest, startProject } from "../adapters/invites-adapter";

import { useState, useMemo, useEffect } from "react";

import {
  Modal,
  Input,
  Row,
  Dropdown,
  Spacer,
  Button,
  Text,
  Container,
  Loading,
} from "@nextui-org/react";
import confetti from "canvas-confetti";

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
      color: "hsl(4, 100%, 80%)",
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
  const [s, setS] = useState(new Set([newStatus]));

  const selectedValue = useMemo(
    () => Array.from(s).join(", ").replaceAll("_", " "),
    [s]
  );

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

  useEffect(() => {
    setNewStatus(Array.from(s)[0]);
    setExplanation(statusDescriptions[Array.from(s)[0]].description);
    setButtonColor(statusDescriptions[Array.from(s)[0]].color);
  }, Array.from(s));

  const handleConfetti = () => {
    closeHandler();
    if (newStatus === "Deployment") {
      let duration = 15 * 1000;
      let animationEnd = Date.now() + duration;
      let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      let interval = setInterval(function () {
        let timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        let particleCount = 50 * (timeLeft / duration);

        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          })
        );
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          })
        );
      }, 250);
    } else if (
      newStatus === "Pending" ||
      newStatus === "Planning" ||
      newStatus === "Design" ||
      newStatus === "Development" ||
      newStatus === "Testing" ||
      newStatus === "Review" ||
      newStatus === "Iteration" ||
      (newStatus === "Documentation" && newStatus !== request_status)
    ) {
      let duration = 1.5 * 1000;
      let animationEnd = Date.now() + duration;
      let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      let interval = setInterval(function () {
        let timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        let particleCount = 50 * (timeLeft / duration);

        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          })
        );
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          })
        );
      }, 250);
    }
  };
  const statusName = Object.keys(statusDescriptions);
  let index = statusName.findIndex((e) => e === request_status);

  const disabled = [];
  if (
    request_status === "Planning" ||
    request_status === "Design" ||
    q1_disability_info === "" ||
    q2_functional_requirements === "" ||
    q3_physical_specifications === "" ||
    q4_lifestyle_usage === "" ||
    category === "" ||
    fabricators_needed === "" ||
    (index > 3 && index !== 9)
  ) {
    disabled.push("Pending");
  }
  if (index > 2 || !complete) {
    disabled.push("Planning");
  }
  if (
    index > 3 ||
    request_status === "Archived" ||
    request_status === "Pending"
  ) {
    disabled.push("Design");
  }
  if (
    index > 4 ||
    request_status === "Archived" ||
    request_status === "Pending"
  ) {
    disabled.push("Development");
  }
  if (
    index > 5 ||
    request_status === "Archived" ||
    request_status === "Pending"
  ) {
    disabled.push("Testing");
  }
  if (
    index > 6 ||
    request_status === "Archived" ||
    request_status === "Pending"
  ) {
    disabled.push("Review");
  }
  if (
    index > 7 ||
    request_status === "Archived" ||
    request_status === "Pending"
  ) {
    disabled.push("Iteration");
  }
  if (
    index > 8 ||
    request_status === "Archived" ||
    request_status === "Pending"
  ) {
    disabled.push("Documentation");
  }
  if (
    index === 8 ||
    request_status === "Archived" ||
    request_status === "Pending"
  ) {
    disabled.push("Deployment");
  }

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

  const colors =
    newStatus !== "Deployment"
      ? {
          background: buttonColor,
        }
      : {};

  return (
    <>
      <Container css={{ maxWidth: "50%" }}>
        <Button
          auto
          flat
          color="secondary"
          shadow
          onPress={handler}
          css={{ zIndex: "0", width: "100%" }}
        >
          Change Status
          <Spacer x={1}></Spacer>
          <Loading type="points" color="secondary" />
        </Button>
        <Spacer y={1}></Spacer>
      </Container>
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
              <Text b color="secondary">
                You{" "}
              </Text>
              Control The Request Status
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Text>Pick A New Status</Text>
            <Dropdown placement="right-top">
              <Dropdown.Button
                flat
                color="secondary"
                css={{ tt: "capitalize" }}
              >
                {selectedValue}
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="Single selection actions"
                color="secondary"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={s}
                onSelectionChange={setS}
                disabledKeys={[...disabled]}
              >
                <Dropdown.Item key="Archived" value="Archived" name="Archived">
                  Archived - 0%
                </Dropdown.Item>
                <Dropdown.Item
                  key="Pending"
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
                </Dropdown.Item>
                <Dropdown.Item key="Planning" value="Planning" name="Planning">
                  Planning - 10%
                </Dropdown.Item>
                <Dropdown.Item key="Design" value="Design" name="Design">
                  Design - 30%
                </Dropdown.Item>
                <Dropdown.Item
                  key="Development"
                  value="Development"
                  name="Development"
                >
                  Development - 50%
                </Dropdown.Item>
                <Dropdown.Item key="Testing" value="Testing" name="Testing">
                  Testing - 70%
                </Dropdown.Item>
                <Dropdown.Item key="Review" value="Review" name="Review">
                  Review - 80%
                </Dropdown.Item>
                <Dropdown.Item
                  key="Iteration"
                  value="Iteration"
                  name="Iteration"
                >
                  Iteration - 90%
                </Dropdown.Item>
                <Dropdown.Item
                  key="Documentation"
                  value="Documentation"
                  name="Documentation"
                >
                  Documentation - 95%
                </Dropdown.Item>
                <Dropdown.Item
                  key="Deployment"
                  value="Deployment"
                  name="Deployment"
                >
                  Deployment - 100%
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <br></br>
            <p>{explanation}</p>
            <div>
              {request_status === "Deployment" && (
                <>
                  <Text color="warning">
                    Congratulations on making it to deployment. If there is
                    something wrong with the product talk to your team to try to
                    solve it. If it really can't be resolved then you are
                    welcome to change the request status. Before making any
                    decisions please be certain your are making the most
                    informed choice.
                  </Text>
                  <Spacer y={0.5}></Spacer>
                </>
              )}
              {newStatus === "Pending" &&
                newStatus === request_status &&
                !complete && (
                  <>
                    <Text color="warning">
                      Thank you for completing the questionnaire. Right now you
                      don't have the minimum required number of fabricators to
                      being working on your request. While you wait you can
                      continue to refine your answers or if you already have
                      some fabricators you can get to know each other in the
                      mean time.
                    </Text>
                    <Spacer y={0.5}></Spacer>
                  </>
                )}

              {newStatus === request_status &&
                request_status === "Archived" &&
                (q1_disability_info === "" ||
                  q2_functional_requirements === "" ||
                  q3_physical_specifications === "" ||
                  q4_lifestyle_usage === "" ||
                  category === "" ||
                  fabricators_needed === "") && (
                  <>
                    <Text color="success">
                      You've made excellent progress so far to your
                      questionnaire. When you are ready and have submitted all
                      your answers then you may move your project forward.
                    </Text>
                    <Spacer y={0.5}></Spacer>
                  </>
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
                  <>
                    <Text color="success">
                      Great job on finishing your questionnaire. When you are
                      ready you can publish it by changing it to pending.
                    </Text>
                    <Spacer y={0.5}></Spacer>
                  </>
                )}

              {newStatus !== request_status &&
                newStatus === "Pending" &&
                request_status !== "Planning" && (
                  <>
                    <Text color="green">
                      Once you are satisfied with your answers to the
                      questionnaire you may move your project to pending. Once
                      pending your request will become public and fabricators
                      may find and join your request.
                    </Text>{" "}
                    <Spacer y={0.5}></Spacer>
                  </>
                )}

              {request_status === "Pending" &&
                newStatus === request_status &&
                complete && (
                  <>
                    <Text color="success">
                      Congrats, you completed the questionnaire, you have all
                      your fabricators ready, so now when you and your team are
                      ready you can start the planning phase.
                    </Text>
                    <Spacer y={0.5}></Spacer>
                  </>
                )}

              {newStatus !== "Deployment" &&
                newStatus === "Planning" &&
                request_status === "Pending" &&
                complete && (
                  <>
                    <Text color="success">
                      When you're ready you can go ahead and move to planning.
                    </Text>
                    <Spacer y={0.5}></Spacer>
                  </>
                )}

              {(request_status === "Documentation" ||
                request_status === "Iteration" ||
                request_status === "Review") &&
                request_status === newStatus && (
                  <>
                    <Text color="secondary">You are so close, keep going!</Text>
                    <Spacer y={0.5}></Spacer>
                  </>
                )}

              {request_status !== "Deployment" &&
                newStatus !== "Deployment" &&
                request_status !== newStatus &&
                complete && (
                  <>
                    <Text color="warning">
                      Carefully understand what this stage entails before
                      deciding to change {request_status} to {newStatus}.
                    </Text>
                    <Spacer y={0.5}></Spacer>
                  </>
                )}

              {request_status === "Documentation" &&
                request_status === newStatus && (
                  <>
                    <Text color="secondary">
                      One more step to deployment, be proud of yourselves for
                      all the hard work to get here.
                    </Text>
                    <Spacer y={0.5}></Spacer>
                  </>
                )}

              {request_status !== "Pending" &&
                request_status !== "Archived" &&
                request_status !== "Deployment" &&
                request_status !== "Documentation" &&
                newStatus === request_status &&
                complete && (
                  <>
                    <Text color="warning">
                      Carefully understand what every stage means before
                      deciding to change it from {request_status}.
                    </Text>
                    <Spacer y={0.5}></Spacer>
                  </>
                )}

              {request_status !== "Deployment" &&
                request_status !== "Archived" &&
                request_status !== "Pending" &&
                newStatus === request_status &&
                complete && (
                  <>
                    <Text>
                      Now that the request is being worked on you can move the
                      project forward. The time it take for each phase can vary
                      a lot, use the percentages as a reference for
                      understanding the development timeline of the phase. You
                      can now move your project forward to any point. But be
                      careful and proactively communicate with your whole team
                      to make sure you are all ready to move your project
                      forward. You can only move your project backwards one
                      phase at a time.
                    </Text>
                    <Spacer y={0.5}></Spacer>
                  </>
                )}

              {newStatus !== request_status && newStatus === "Archived" && (
                <>
                  <Text color="error">
                    If you archive your request all pending and accepted
                    fabricators will be removed from this request. Your request
                    will now be visible only to you from your profile and
                    fabricators cannot join. Please take your time to complete
                    the questionnaire to the best of your abilities. When you
                    are ready to publish it you can change the status to
                    pending. If you no longer want to create a request you can
                    alternatively delete it.
                  </Text>
                  <Spacer y={0.5}></Spacer>
                </>
              )}

              {request_status !== "Documentation" &&
                request_status !== "Deployment" &&
                newStatus !== "Planning" &&
                newStatus === "Deployment" &&
                complete && (
                  <>
                    <Text color="warning">
                      Are you sure you want to move to deployment?
                    </Text>
                    <Spacer y={0.5}></Spacer>
                  </>
                )}

              {request_status === "Documentation" &&
                request_status !== "Deployment" &&
                newStatus !== "Planning" &&
                newStatus === "Deployment" &&
                complete && (
                  <>
                    <Text color="secondary">Do you have what it takes?</Text>
                    <Spacer y={0.5}></Spacer>
                  </>
                )}
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
              color="gradient"
              style={colors}
              onClick={handleConfetti}
            >
              Change Status
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
