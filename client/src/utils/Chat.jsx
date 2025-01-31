import { useState, useMemo, useEffect, useRef } from "react"; // Importing hooks for state management and memoization
import { io } from "socket.io-client"; // Importing Socket.IO client for real-time communication
import React from "react"; // Importing React library
import Message from "./Message"; // Importing the Message component to display individual messages
import axios from "axios"; // Importing axios for making API calls
import { Navbar } from "../components/Navbar";

function Chat() {
  const [message, setMessage] = useState(""); // State to hold the current input message
  const [messages, setMessages] = useState([]); // State to hold the list of messages

  // Reference for the last message to scroll into view
  const lastMessageRef = useRef(null);

  // Creating and memoizing the Socket.IO connection to avoid reconnecting on every render
  const socket = useMemo(() => io("http://localhost:5000"), []);

  // Register socket event listeners in a useEffect to ensure they are added only once
  useEffect(() => {
    // Listening for the "recieve" event from the server
    socket.on("recieve", (e) => {
      if (e.msg.trim() !== "") {
        setMessages((prevMessages) => [...prevMessages, e]); // Append new message to the list
      }
    });

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      socket.off("recieve");
    };
  }, [socket]);

  // Function to handle the form submission (sending a message)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (message.trim()) { // Ensure message is not empty
      try {
        // API call to fetch user details using axios
        const response = await axios.get("http://localhost:5000/user/getuser", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"), // Attaching token for authentication
          },
        });

        const userFirstname = response.data.firstname; // Extract user's first name from response
        console.log("User's firstname:", userFirstname); // Debugging user data

        // Emitting the message and user details to the server
        socket.emit("send", { msg: message, user: userFirstname });

        // Add the message to the local message list
        // setMessages((prevMessages) => [...prevMessages, { msg: message, user: userFirstname }]);

        // Clear the message input after sending
        setMessage('');
      } catch (error) {
        console.error("Error fetching user details:", error); // Log error if API call fails
      }
    }
  };

  // Handle Enter key press to send the message
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { // If Enter is pressed and Shift is not held
      e.preventDefault(); // Prevent the default action (like a new line in the textarea)
      handleSubmit(e); // Call handleSubmit to send the message
    }
  };

  // Scroll to the last message after the messages are updated
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the last message
    }
  }, [messages]); // This effect runs every time the messages change

  return (
    <>
      <div id="main" className="w-screen h-screen">
        {/* Main container for the chat application */}
        <div
          id="page1"
          className="w-full h-full bg-gradient-to-r from-black to-black flex flex-col justify-between"
        >
          {/* Navigation bar */}
          <Navbar/>

          {/* Message display area */}
          
          <div id="msg" className="hide-scrollbar flex-1 overflow-y-auto overflow-hidden p-4">
            <div className="flex flex-col ml-10 items-start justify-center text-white">
              {/* Mapping over the messages array to render each message using the Message component */}
              {messages.map((e, index) => (
                <Message
                  key={index}
                  message={e.msg} // Pass only the message text to Message
                  user={e.user} // Pass user info to Message
                />
              ))}
              {/* Reference the last message to scroll into view */}
              <div ref={lastMessageRef} />
            </div>
          </div>

          {/* Input form for sending messages */}
          <form onSubmit={handleSubmit} id="chat" className="flex">
            <textarea
              className="bg-slate-300 text-black h-10 w-2/3 ml-48 mb-11 rounded-md justify-end mt-auto resize-none text-center"
              value={message} // Bind textarea value to the message state
              onChange={(e) => setMessage(e.target.value)} // Update message state on input change
              onKeyDown={handleKeyDown} // Listen for the Enter key press
            ></textarea>

            {/* Send button */}
            <button
              type="submit" // Button will now trigger form submission
              className="h-10 rounded-md w-20 bg-purple-600 hover:bg-purple-500 ml-4 border-transparent"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Chat;
