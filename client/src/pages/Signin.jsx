import Heading from "../components/Heading.jsx";
import Subheading from "../components/Subheading.jsx";
import Inputbox from "../components/Inputbox.jsx";
import Btn from "../components/Button.jsx";
import BottomWarning from "../components/BottomWarning.jsx";
import { useNavigate , useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Signin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 const [error , setError] = useState("")



 const redirectPath = new URLSearchParams(location.search).get("redirect") || "/";
 const handleSignin = async () => {
  try {
    // Make the API call to sign in
    
    const resp = await axios.post(`${import.meta.env.VITE_APP_URL}/user/signin`, {
     username: username,
     password:password
    });

    // Save the token to 
   
    localStorage.setItem("token",resp.data.token);
    navigate('/')
    navigate(redirectPath); 

  
  } catch (err) {
    // Log error and show a user-friendly message
    console.error("Sign-in error:", err.response?.data || err.message);
    setError("Invalid credentials or server error. Please try again.");
  }
};

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-evenly h-screen">
        <div>
          <Heading label="Sign In" />
        </div>

        <div>
          <Subheading label={"Enter your information to access your account"} />

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
          <Btn label={"Sign In"} onClick={handleSignin} />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <BottomWarning
            label={"Don't have an account? "}
            to={"/signup"}
            Bottomtext={"Sign Up"}
          />
        </div>
      </div>
    </>
  );
}