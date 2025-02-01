import { useState, useMemo, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import NavbarForChat from "./NavbarForChat";
import { useNavigate, useParams } from "react-router-dom";
import Message from "./Message"; // Import the Message component

function Chat() {
  const { roomId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [createdRoom, setCreatedRoom] = useState(null);
  const [roomInput, setRoomInput] = useState("");
  const lastMessageRef = useRef(null); // Reference for the last message
  const socket = useMemo(() => io(`${import.meta.env.VITE_APP_URL}`), []);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear messages when a new room is created or joined
    setMessages([]);

    socket.on("recieve", (e) => {
      if (e.msg.trim() !== "") {
        setMessages((prevMessages) => [...prevMessages, e]);
      }
    });

    socket.on("room-created", (data) => {
      setCreatedRoom(data);
      navigate(`/chat/${data.roomId}`); // Redirect to the new room
      setTimeout(() => setCreatedRoom(null), 15000); // Clear the room creation message after 15 seconds
    });

    socket.on("joined-room", (data) => {
      console.log(`Joined room: ${data.roomId}`);
    });

    if (roomId) {
      socket.emit("join-room", roomId);
    }

    return () => {
      socket.off("recieve");
      socket.off("room-created");
      socket.off("joined-room");
    };
  }, [socket, roomId]);

  // Scroll to the last message whenever messages change
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/user/getuser`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const userFirstname = response.data.firstname;
        socket.emit("send", { msg: message, user: userFirstname, roomId });
        setMessage("");
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
  };

  const createRoom = () => {
    socket.emit("create-room"); // Emit room creation request
  };

  const joinRoom = () => {
    if (roomInput.trim()) {
      socket.emit("join-room", roomInput); // Emit join-room event
    }
  };

  return (
    <div id="main" className="w-screen h-screen flex flex-col overflow-hidden">
      <div
        id="page1"
        className="w-full h-full bg-gradient-to-r from-black to-black flex flex-col justify-between"
      >
        <NavbarForChat />

        <div className="room-section fixed top-16 left-0 right-0 z-50 text-white text-center md:absolute md:top-4 md:right-4 md:left-auto md:text-right">
          <button
            onClick={createRoom}
            className="h-10 rounded-md w-full md:w-28 bg-purple-600 hover:bg-purple-500 mb-4 md:mb-0 border-transparent text-white"
          >
            Create Room
          </button>

          {createdRoom && (
            <div className="bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
              <p>
                Room Created:`${import.meta.env.VITE_APP_URL}/chat/{createdRoom.roomId}`
              </p>
              <p>
                Share this URL to invite others (ensure they are signed up).
              </p>
            </div>
          )}
        </div>

        <div
          id="msg"
          className="hide-scrollbar flex-1 overflow-y-auto p-4 mt-32 md:mt-20"
        >
          <div className="flex flex-col items-start justify-center text-white space-y-2 break-words">
            {messages.map((e, index) => (
              <Message key={index} message={e.msg} user={e.user} /> // Use your Message component here
            ))}
            <div ref={lastMessageRef} />{" "}
            {/* This will scroll to the last message */}
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          id="chat"
          className="flex flex-col md:flex-row items-center justify-center mb-4 md:mb-11 px-4 md:px-0"
        >
          <div className="flex justify-center items-center w-full">
            <textarea
              className="bg-slate-300 text-black h-10 w-full md:w-2/3 rounded-md resize-none text-center"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && handleSubmit(e)
              }
            ></textarea>

            <button
              type="submit"
              className="h-10 px-4 py-2 rounded-md w-auto md:w-20 bg-purple-600 hover:bg-purple-500 md:ml-4 border-transparent text-white"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chat;
