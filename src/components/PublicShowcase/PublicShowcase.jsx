import { useEffect, useState } from "react";
import "./PublicShowcase.css";

const accomplishments = [
  "Finished 3 deep-work sessions today",
  "Focused for 2h 15m on a single mission",
  "Completed a mission after 7 days of consistency",
  "Built momentum for 5 days straight",
  "Hit a personal productivity record"
];

export default function PublicShowcase() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(i => (i + 1) % accomplishments.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="showcase-overlay">
      <div className="showcase-card">
        <h2>Mission Mode</h2>
        <p className="showcase-text">
          {accomplishments[index]}
        </p>

        <p className="showcase-sub">
          Sign in to start tracking your own wins.
        </p>
      </div>
    </div>
  );
}
