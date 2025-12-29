import { useState } from "react";
import MissionTimer from "../MissionTimer/MissionTimer";
import * as missionService from "../../services/missionService";
import "./MissionList.css"; 
import DailyCheck from "../DailyCheck/DailyCheck";




const MissionList = ({ missions, fetchMissions, handleSelect, handleFormView, isFormOpen, closeForm, user, isDaily }) => {


 const handleComplete = async (missionId) => {
  await missionService.update(
    { markCompletedToday: true },
    missionId
  );

  fetchMissions();
};


const handlePauseMission = async (missionId) => {
  await missionService.update({ status: "paused" }, missionId);
  fetchMissions();
};

const handleResumeMission = async (missionId) => {
  await missionService.update({ status: "active" }, missionId);
  fetchMissions();
};


 
  return ( //this is the main JSX return for the MissionList componen, it returns a list of missions or an empty state message
  <div>
    <h1>Mission List</h1>

    {!missions.length ? (
      <h2 className="empty-state">No Missions Yet!</h2>
    ) : (
      <ul>
        {missions.map((mission) => (
          <li key={mission._id} className="mission-item">
            {console.log("MISSION FROM API:", mission)}

            {/* Top row: title + controls */}
            <div className="mission-actions">
              <span
                className="mission-title"
                onClick={() => handleSelect(mission)}
              >
                {mission.title}
              </span>

              {mission.status === "active" && (
                <button onClick={() => handlePauseMission(mission._id)}>
                  Pause
                </button>
              )}

              {mission.status === "paused" && (
                <button onClick={() => handleResumeMission(mission._id)}>
                  Resume
                </button>
              )}
            </div>

            {/* Second row: timer */}
            {mission.status === "active" && mission.startTime && (
              <div className="mission-timer-row">
                <MissionTimer mission={mission} />
              </div>
            )}

  {/* Third row: daily checkbox */}
  {mission.isDaily && (
      <div className="daily-check">

    <DailyCheck
      habit={mission}
      onComplete={handleComplete}
    />
  </div>
  )}
</li>

        ))}
      </ul>
    )}

    {user ? (
      <button 
      className="new-mission-btn"

      onClick={() => handleFormView(null)}>
        New Mission
      </button>
    ) : (
      <p className="text-sm opacity-80">
        Sign in to create missions.
      </p>
    )}
  </div>
);
};
export default MissionList;
