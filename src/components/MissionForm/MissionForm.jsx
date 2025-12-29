import { useState } from "react";
// import "./hooks/WebReminders.jsx";
// import "./mobile/hooks/useDailyNotification.mobile.jsx";

const MissionForm = (props) => {
    // State to hold form data
    const initialState = {
        title: "",
        description: "",
        duration: "",
        status: "",
        missionType: null,
        remindDaily: false,
        isDaily: false, // New field to indicate if it's a daily mission
    }

    const [formData, setFormData] = useState(
        props.selected ? props.selected : initialState
    );

    //handle function to update form data state on input change
    const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (props.selected){
        props.handleUpdateMission(formData,props.selected._id);
        
    }else{
        props.handleAddMission(formData)
    }
    
  };
// JSX for the form
    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
            <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange} 
                required
            />
            <label htmlFor="description">Description:</label>
            <input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange} 
                required
            />
            <label>
                <input 
                type="radio"
                checked={formData.missionType === "daily"}
                onChange={(e)=>
                    setFormData({
                    ...formData,
                    missionType: "daily",
                    remindDaily: false,
                    isDaily: true,   
                })
            }
            /> 
            This is a daily mission
            </label>
              <label>
                <input 
                type="radio"
                checked={formData.missionType === "minutes"}
                onChange={(e)=>
                    setFormData({
                    ...formData,
                    missionType: "minutes",
                    remindDaily: false,
                    isDaily: false,   
                })
            }
            /> 
            This is a minutes-based mission
            </label>
            {formData.missionType === "minutes" && (
                <>
            <label htmlFor="duration">Duration (in minutes):</label>
            <input
            id="duration"
            name="duration"
            type="number"
            min="1"
            placeholder="Minutes"
            value={formData.duration}
            onChange={handleChange}
            required
            />
            </>
            )}
            {formData.missionType === "daily" && (
                <>
            <label htmlFor="duration">Duration (in days):</label>
            <input
            id="duration"
            name="duration"
            type="number"
            min="1"
            placeholder="Days"
            value={formData.duration}
            onChange={handleChange}
            required
             /> 
            </>
            )}
            <label htmlFor="status">Status</label>
            <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            >
            <option value="">Select a status</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            {/* <option value="completed">Completed</option> */}
            {/* <option value="cancelled">Cancelled</option> */}
            </select>
            <button type="submit">
                {props.selected ? "Update Mission" : "Add a New Mission"}
            </button>
            {formData.missionType === "daily" && (
            <label>
                  <input
                type="checkbox"
                value="Cancel"
                checked={formData.remindDaily}
                onChange={(e)=>
                    setFormData({
                    ...formData,
                    remindDaily: e.target.checked,
                })
            }
            /> 
            Remind me daily 
            </label>
            )}
        </form>
    </div>
    );
};

export default MissionForm;