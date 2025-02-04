import Heading from "../components/Heading.jsx";
import Subheading from "../components/Subheading.jsx";
import Inputbox from "../components/Inputbox.jsx";
import Btn from "../components/Button.jsx";
import BottomWarning from "../components/BottomWarning.jsx";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    // Basic validation to ensure fields are not empty
    if (!username || !password || !firstName || !lastName) {
      setError("All fields are required.");
      return; // Don't proceed with the API request if any field is empty
    }

    try {
      // Create user object with the entered data
      const user = {
        username: username,
        passwords: password,  // Assuming 'passwords' is the field in the backend
        firstname: firstName,
        lastname: lastName,
      };

      // Make the API request to sign up
      const response = await axios.post(`${import.meta.env.VITE_APP_URL}/user/signup`, user);

      // Save the token to local storage
      localStorage.setItem("token", response.data.token);
      
      // Navigate to the home page or wherever you want
      navigate("/");

    } catch (err) {
      // Log error and show a user-friendly message
      console.error("Sign-up error:", err.response?.data || err.message);
      setError("Sign-up failed. Please try again.");
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-evenly h-screen">
        <div className="">
          <Heading label="Sign Up" />
        </div>

        <div>
          <Subheading label="Enter your information to create your account" />
          
          {/* Input Fields */}
          <Inputbox
            label={"Email"}
            onchange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Inputbox
            label={"Password"}
            onchange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Inputbox
            label={"First Name"}
            onchange={(e) => {
              setFirstname(e.target.value);
            }}
          />
          <Inputbox
            label={"Last Name"}
            onchange={(e) => {
              setLastname(e.target.value);
            }}
          />
          
          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Sign Up Button */}
          <Btn
            label={"Sign Up"}
            onClick={handleSignUp}
          />

          {/* Redirect to Signin */}
          <BottomWarning
            label={"Already have an account?"}
            to={"/Signin"}
            Bottomtext={"Signin"}
          />
        </div>
      </div>
    </>
  );
}
