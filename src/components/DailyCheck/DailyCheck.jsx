function DailyCheck({ habit, onComplete }) {
  const totalDays = Math.ceil(habit.duration / (24 * 60)); // duration in minutes
  const completed = habit.checkCount || 0;

  return (
    <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
      {Array.from({ length: totalDays }).map((_, i) => {
        const isChecked = i < completed;

        return (
          <button
            key={i}
            disabled={isChecked}
            onClick={() => onComplete(habit._id)}
            style={{
              width: 20,
              height: 20,
              borderRadius: 4,
              border: "1px solid #ccc",
              background: isChecked ? "#4caf50" : "transparent",
              cursor: isChecked ? "default" : "pointer"
            }}
          />
        );
      })}
    </div>
  );
} 

export default DailyCheck;
