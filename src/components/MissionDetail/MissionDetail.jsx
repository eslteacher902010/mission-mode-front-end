// src/components/MissionDetail/MissionDetail.jsx
import { useState } from "react";
import * as missionService from "../../services/missionService";
import BadgePopup from "../BadgePopup/BadgePopup";
import "../MissionForm/MissionForm";

const MissionDetail = ({
  selected,
  handleFormView,
  handleDeleteMission,
  isDemo = false,
}) => {
  const [earnedBadge, setEarnedBadge] = useState(null);

  // return if selected is null
  if (!selected) {
    return (
      <div className="details-container empty">
        <h1>Select a mission to see details</h1>
      </div>
    );
  }

  const handleCompleteMission = async () => {
    if (isDemo) return; // 🚫 demo safety

    try {
      const updatedMission = await missionService.update(
        { status: "completed" },
        selected._id
      );

      if (updatedMission.rewardBadge) {
        setEarnedBadge(updatedMission.rewardBadge);
      }

      handleFormView(null);
    } catch (err) {
      console.error("Error completing mission:", err);
    }
  };

  const Timer = () => {
    return (
      <div className="timer-box">
        Duration: {selected.duration} minutes
      </div>
    );
  };

  return (
    <div className={`details-container ${isDemo ? "demo-details" : ""}`}>
      <h1>{selected.title}</h1>

      <h2>
        <span className="detail-label">Description:</span>{" "}
        {selected.description}
      </h2>

      <h2>
        Status:
        <span className={`status-pill ${selected.status.toLowerCase()}`}>
          {selected.status}
        </span>
      </h2>

      <Timer />

      <div className="button-container">
        {!isDemo ? (
          <>
            <button
              className="edit-btn"
              onClick={() => handleFormView(selected)}
            >
              Edit Mission
            </button>

            <button
              className="delete-btn"
              onClick={() => handleDeleteMission(selected._id)}
            >
              Delete Mission
            </button>

            {selected.status !== "completed" && (
              <button
                className="complete-btn"
                onClick={handleCompleteMission}
              >
                Complete Mission
              </button>
            )}
          </>
        ) : (
          <p className="demo-note">
            Demo mode — sign in to edit, complete, or save missions
          </p>
        )}
      </div>

      {earnedBadge && (
        <BadgePopup
          badge={earnedBadge}
          onClose={() => setEarnedBadge(null)}
        />
      )}
    </div>
  );
};

export default MissionDetail;
