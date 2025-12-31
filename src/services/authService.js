// src/services/authService.js

const API_BASE_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${API_BASE_URL}/auth`;


const decodeToken = (token) => {
  return JSON.parse(atob(token.split('.')[1]));
};

const signUp = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.error) throw new Error(data.error);

    if (data.token) {
      const decoded = decodeToken(data.token);
      localStorage.setItem('token', data.token);
      return decoded;
    }

    throw new Error("Invalid response from server");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const signIn = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.error) throw new Error(data.error);

    if (data.token) {
      console.log("FRONTEND RECEIVED TOKEN:", data.token);

      const decoded = decodeToken(data.token);
      console.log("FRONTEND DECODED TOKEN:", decoded);

      localStorage.setItem("token", data.token);
      return decoded;
    }

    throw new Error("Invalid response from server");
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { signUp, signIn };
