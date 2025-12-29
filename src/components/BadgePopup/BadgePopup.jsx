const BadgePopup= ({badge, onClose})=>{
  return (
    <div className="badge-display">
        <div className="badgePopup">
            <h2>You've Earned a Badge</h2>
            <h3>{badge.title}</h3>
            {badge.icon &&<img src={badge.icon} alt={badge.title} />}
            <p>{badge.description}</p>
            <button onClick={onClose}>Close</button>
        </div>
    </div>
    
  );


}

export default BadgePopup;