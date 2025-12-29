import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./SignOut.css";

const SignOut = ({ setUser }) => {
  useEffect(() => {
    setUser(null);          // clear user
    localStorage.removeItem("token"); // optional
  }, []);

  return <Navigate to="/" replace />;
};

export default SignOut;
