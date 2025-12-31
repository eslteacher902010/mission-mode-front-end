const API_BASE_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${API_BASE_URL}/missions`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};



const create = async (formData) => {
  try {
    const res = await fetch(BASE_URL, {
      // We specify that this is a 'POST' request
      method: 'POST',
      // We're sending JSON data, so we attach a Content-Type header
      // and specify that the data being sent is type 'application/json'
      headers: {
        'Content-Type': 'application/json',
      },
      // The formData, converted to JSON, is sent as the body
      // This will be received on the back-end as req.body
      body: JSON.stringify(formData),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};


// src/services/PetService.js

const update = async (formData, missionId) => {
  try {
    const token = localStorage.getItem('token');

    const res = await fetch(`${BASE_URL}/${missionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error(`Update failed with status ${res.status}`);
    }

    return res.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
};


const deleteMission = async (missionId) => {
  try {
    const res = await fetch(`${BASE_URL}/${missionId}`, {
      method: 'DELETE',
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};


export {
  index,
  create,
  update,
  deleteMission
};