// src/components/BadgeDetail/BadgeDetail.jsx

const BadgeDetail = (props) => {
  // return if props.selected is null
  if (!props.selected)
  return (
    <div className="details-container">
      <h1>NO DETAILS</h1>
    </div>
  );

return (
  <div className="details-container">
    <h1>{props.selected.title}</h1>
    <h2>description: {props.selected.description}</h2>
    <h2>duration: {props.selected.duration}</h2>
    <h2>
      Status: {props.selected.status}
    </h2>

    <div className="button-container">
    </div>
  </div>
);
};

export default BadgeDetail;