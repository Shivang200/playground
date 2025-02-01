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
  const socket = useMemo(() => io("http://localhost:5000"), []);
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
        const response = await axios.get("http://localhost:5000/user/getuser", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const userFirstname = response.data.firstname;
        socket.emit("send", { msg: message, user: userFirstname, roomId });
        setMessage('');
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
    <div id="main" className="w-screen h-screen">
      <div id="page1" className="w-full h-full bg-gradient-to-r from-black to-black flex flex-col justify-between">
        
        <NavbarForChat />

    
        <div id="msg" className="hide-scrollbar flex-1 overflow-y-auto overflow-hidden p-4">
          <div className="flex flex-col ml-10 items-start justify-center text-white">
            {messages.map((e, index) => (
              <Message key={index} message={e.msg} user={e.user} /> // Use your Message component here
            ))}
            <div ref={lastMessageRef} /> {/* This will scroll to the last message */}
          </div>
        </div>

        <form onSubmit={handleSubmit} id="chat" className="flex">
          <textarea
            className="bg-slate-300 text-black h-10 w-2/3 ml-48 mb-11 rounded-md justify-end mt-auto resize-none text-center"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSubmit(e)}
          ></textarea>

          <button type="submit" className="h-10 rounded-md w-20 bg-purple-600 hover:bg-purple-500 ml-4 border-transparent text-white">
            Send
          </button>
        </form>
       
        <div className="room-section absolute top-4 right-4 z-50">
          {/* <h2 className="text-white">Create or Join a Room</h2> */}
          <button onClick={createRoom} className="create-room-button h-10 rounded-md w-28 bg-purple-600 hover:bg-purple-500  border-transparent text-white">
            Create Room
          </button>

          {createdRoom && (
            <div className="text-transparent bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-500 bg-clip-text drop-shadow-[0_0_20px_rgba(120,80,255,1)]">
              <p>Room Created: http://localhost:5173/chat/{createdRoom.roomId}</p>
              <p>Share this URL to invite others (ensure they are signed up).</p>

            </div>
          )}

          {/* <div>
          join room and label not working and no need of ot as of now
            <input
              type="text"
              value={roomInput}
              onChange={(e) => setRoomInput(e.target.value)}
              placeholder="Enter Room ID to Join"
              className="p-2 rounded-md text-black"
            />
            <button onClick={joinRoom} className="join-room-button text-white bg-green-600 hover:bg-green-500 p-2 rounded-md">
              Join Room
            </button>
          </div> */}
        </div>
        
      </div>
    </div>
  );
}

export default Chat;
