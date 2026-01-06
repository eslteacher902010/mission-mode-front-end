import { useState, useEffect } from "react";
import MissionDetail from "../MissionDetail/MissionDetail";
import { demoMission } from "../../data/demoMission";
import "./DemoMission.css";

export default function DemoMission() {
  const TOTAL_SECONDS = demoMission.duration * 60;

  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);

  // countdown logic (demo-only)
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // helpers
  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const humanTime = (seconds) => {
    const minutes = Math.ceil(seconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  };

  return (
    <div className="demo-mission-card max-w-md mx-auto mt-10 p-6">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Try a Demo Mission
      </h2>

      <MissionDetail
        selected={{
          ...demoMission,
          status: secondsLeft === 0
            ? "completed"
            : isRunning
            ? "active"
            : "paused",
        }}
        isDemo={true}
      />

      {/* TIME DISPLAY */}
      <div className="mt-6 text-center">
        {!isRunning && secondsLeft === TOTAL_SECONDS && (
          <p className="text-gray-600">
            {humanTime(secondsLeft)} of focused work
          </p>
        )}

        {isRunning && (
          <>
            <p className="text-sm text-gray-500 mb-1">
              Focus time remaining
            </p>
            <p className="text-4xl font-mono">
              {formatTime(secondsLeft)}
            </p>
          </>
        )}

        {secondsLeft === 0 && (
          <p className="text-green-600 font-semibold text-lg">
            Demo complete 🎉 Nice work!
          </p>
        )}
      </div>

      {/* CONTROLS */}
      <div className="mt-6">
        {!isRunning && secondsLeft > 0 && (
          <button
            className="w-full bg-black text-white py-2 rounded"
            onClick={() => setIsRunning(true)}
          >
            Start Timer
          </button>
        )}

        {isRunning && (
          <button
            className="w-full bg-gray-600 text-white py-2 rounded"
            onClick={() => setIsRunning(false)}
          >
            Pause
          </button>
        )}
      </div>

      {/* SIGN IN CTA */}
      <button
        disabled
        className="mt-4 w-full bg-gray-300 py-2 rounded cursor-not-allowed"
      >
        Save Mission (Sign in required)
      </button>
    </div>
  );
}
