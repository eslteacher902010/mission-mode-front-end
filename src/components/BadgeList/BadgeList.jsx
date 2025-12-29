
const BadgeList = ({ missions, handleSelect }) => {
  console.log(missions);

  return (
    <div className="badge-list">
      <h1>Badge List</h1>

      {!missions.length ? (
        <h2 className="empty-state">No Badges Yet!</h2>
      ) : (
        <ul className="badge-grid">
          {missions.map((badge) => (
            <li
              key={badge._id}
              className={`badge-card ${badge.earned ? "" : "locked"}`}
              onClick={() => handleSelect(badge)}
            >
              <span className="badge-name">{badge.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BadgeList;
