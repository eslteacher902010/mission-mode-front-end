// src/components/MissionDetail/MissionDetail.jsx
import { useState } from "react";
import * as missionService from "../../services/missionService";
import BadgePopup from "../BadgePopup/BadgePopup";
import "../MissionForm/MissionForm";


const MissionDetail = (props) => {
  // return if props.selected is null
  const [earnedBadge, setEarnedBadge] = useState(null);  
 if (!props.selected) {
  return (
    <div className="details-container empty">
      <h1>Select a mission to see details</h1>
    </div>
  );
}


const handleCompleteMission = async () => {
    try {
      const updatedMission = await missionService.update(
        { status: "completed" },
        props.selected._id
      );

      // If backend populated rewardBadge → show popup
      if (updatedMission.rewardBadge) {
        setEarnedBadge(updatedMission.rewardBadge);
      }

      // update UI so the new status displays
      // (App already updates mission list and selected mission)
      props.handleFormView(null); 
    } catch (err) {
      console.error("Error completing mission:", err);
    }
  };



  const Timer = () => {
    return <div className="timer-box">
  Duration: {props.selected.duration} minutes
</div>

  };


return (
  <div className="details-container">
    <h1>{props.selected.title}</h1>
    <h2>
      <span className="detail-label">Description:</span>{" "}
      {props.selected.description}
    </h2>
    <h2>duration: {props.selected.duration}</h2>
   <h2>
    Status:
    <span className={`status-pill ${props.selected.status.toLowerCase()}`}>
      {props.selected.status}
    </span>
  </h2>


    <Timer />

    <h2>Status: {props.selected.status}</h2>

    <div className="button-container">
    <button className="edit-btn" onClick={() => props.handleFormView(props.selected)}>
  Edit Mission
</button>

    <button
      className="delete-btn"
      onClick={() => props.handleDeleteMission(props.selected._id)}
    >
      Delete Mission
    </button>

    {props.selected.status !== "completed" && (
      <button className="complete-btn" onClick={handleCompleteMission}>
        Complete Mission
      </button>
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
