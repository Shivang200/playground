import { useState, useMemo, useEffect } from "react"; // Importing hooks for state management and memoization
import { io } from "socket.io-client"; // Importing Socket.IO client for real-time communication
import React from "react"; // Importing React library
import Message from "./Message"; // Importing the Message component to display individual messages
import axios from "axios"; // Importing axios for making API calls

function Chat() {
  const [message, setmessage] = useState(""); // State to hold the current input message
  const [messages, setmessages] = useState([]); // State to hold the list of messages

  // Creating and memoizing the Socket.IO connection to avoid reconnecting on every render
  const socket = useMemo(() => io("http://localhost:5000"), []);

  // Register socket event listeners in a useEffect to ensure they are added only once
  useEffect(() => {
    // Listening for the "recieve" event from the server
    socket.on("recieve", (e) => {
      if (e.msg.trim() !== "") {
        setmessages((prevMessages) => [...prevMessages, e]); // Append new message to the list
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
    } catch (error) {
      console.error("Error fetching user details:", error); // Log error if API call fails
    }
  };

  return (
    <>
      <div id="main" className="w-screen h-screen">
        {/* Main container for the chat application */}
        <div
          id="page1"
          className="w-full h-full bg-gray-900 flex flex-col justify-between"
        >
          {/* Navigation bar */}
          <div id="nav">
            <nav className="bg-white w-screen flex border-gray-200 dark:bg-gray-900">
              <div className="max-w-screen-xl justify-end flex flex-wrap items-center p-4">
                {/* Brand/logo section */}
                <a
                  href="https://flowbite.com/"
                  className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                  <img
                    src="https://flowbite.com/docs/images/logo.svg"
                    className="h-8"
                    alt="Flowbite Logo"
                  />
                  <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                    Messenger
                  </span>
                </a>
              </div>
            </nav>
          </div>

          {/* Message display area */}
          <div id="msg" className="hide-scrollbar flex-1 overflow-y-auto p-4">
            <div className="flex flex-col ml-10 items-start justify-center text-white">
              {/* Mapping over the messages array to render each message using the Message component */}
              {messages.map((e, index) => (
                <Message
                  key={index}
                  message={e.msg} // Pass only the message text to Message
                  user={e.user} // Pass user info to Message
                />
              ))}
            </div>
          </div>
          {/* Input form for sending messages */}
          <form onSubmit={handleSubmit} id="chat" className="flex">
            <textarea
              className=" bg-slate-300 text-black h-10 w-2/3 ml-48 mb-11 rounded-md justify-end mt-auto resize-none text-center"
              value={message} // Bind textarea value to the message state
              onChange={(e) => {
                setmessage(e.target.value); // Update the message state on input change
              }}
            ></textarea>

            {/* Send button */}
            <button
              type="submit"
              className="h-10 rounded-md w-20 bg-blue-500 ml-4 border-transparent"
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
