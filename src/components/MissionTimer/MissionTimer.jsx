import "./MissionTimer.css";
import { useEffect, useState } from "react";

// MissionTimer component to display countdown timer for a mission
function MissionTimer({mission, onFinish}) {
  const [timeLeft, setTimeLeft] = useState(0);


function formatTime(ms) {
  const totalSeconds= Math.floor(ms / 1000);// convert milliseconds to total seconds

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600); // 86400 seconds in a day and 3600 seconds in an hour
  const minutes = Math.floor((totalSeconds % 3600) / 60); // 3600 seconds in an hour and 60 seconds in a minute
  const seconds = totalSeconds % 60;// 60 seconds in a minute

  if (days > 0) return `${days}d ${hours}h`;//d=days, h=hours because more than a day left
  if (hours > 0) return `${hours}h ${minutes}m`;//h=hours, m=minutes because more than an hour left
  return `${minutes}m ${seconds}s`;//m=minutes, s=seconds because less than an hour left
}

  // Function to calculate remaining time
  const calc = () => {
   if (mission.remainingMs == null) return null;

      if (mission.status !== "active") {
        return mission.remainingMs;
  }

  if (!mission.lastResumedAt) return mission.remainingMs;

  const elapsed =
    Date.now() - new Date(mission.lastResumedAt).getTime();

  const remaining = mission.remainingMs - elapsed;
  return remaining > 0 ? remaining : 0;
};


  useEffect(() => {
  if (mission.status !== "active") return;


  const intervalId = setInterval(() => {
    const newRemaining = calc();
    setTimeLeft(newRemaining);


    if (newRemaining <= 0) {
      clearInterval(intervalId);
      if (onFinish) onFinish();
    }
  }, 1000);

  return () => clearInterval(intervalId);
}, [mission.status, mission.remainingMs, mission.lastResumedAt]);


useEffect(() => {
  const initial = calc();
  setTimeLeft(initial);
}, [mission.status, mission.remainingMs]);


// const minutes = Math.floor(timeLeft / 1000 / 60);
// const seconds = Math.floor((timeLeft / 1000) % 60)
//     .toString()
//     .padStart(2, "0");
//this formatted the time as MM:SS


  if (timeLeft === null) return null;

  if (timeLeft <= 0) {
    return <div className="mission-timer-container">⏱️ Time’s up!</div>;
  }




  return (
    <div className={`mission-timer-container`}>
    <div style={{ fontSize: "2rem", margin: "1rem 0" }}>
      Time Left: {formatTime(timeLeft)}
    </div>
    </div>
  );

}


export default MissionTimer;
