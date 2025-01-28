import { useState, useMemo } from "react";
import { io } from "socket.io-client";
// import "./App.css";
import Message from "./Message";

function Chat() {
  const [message, setmessage] = useState("");
  const [messages, setmessages] = useState([]);

  const socket = useMemo(() => io("http://localhost:5000"), []);

  socket.on("recieve", (e) => {
    if (e.trim() !== "") {
      setmessages([...messages, e]);
      setmessage("");
    }
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("send", message);
    // if(message.trim()!== ""){
    //   setmessages([...messages,message]);
    // }
  };

  socket.on("welcome", (s) => {
    // <Message  message={{s}  } />
  });

  return (
    <>
      <div id="main" className="w-screen h-screen">
        <div
          id="page1"
          className="w-full h-full bg-gray-900 flex flex-col justify-between"
        >
          <div id="nav">
            <nav className="bg-white w-screen flex border-gray-200 dark:bg-gray-900">
              <div className="max-w-screen-xl justify-end flex flex-wrap items-center p-4">
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

          <div id="msg" className="hide-scrollbar flex-1  overflow-y-auto  p-4">
            <div className="flex flex-col ml-10 items-start justify-center text-white ">
              {messages.map((msg, index) => (
                <Message key={index} message={msg} />
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} id="chat" className="flex">
            <textarea
              className="bg-slate-300 text-black h-10 w-2/3 ml-48 mb-11 rounded-md justify-end mt-auto resize-none text-center"
              value={message}
              onChange={(e) => {
                setmessage(e.target.value);
              }}
              // onKeyDown={(e) => {
              //   if (e.key === "Enter" && !e.shiftKey) {
              //     e.preventDefault(); // Prevent default newline behavior
              //     handleSubmit(e); // Trigger message sending
              //   }
              // }}
              name=""
              id=""
            ></textarea>

            <button
              type="submit"
              className="h-10 rounded-md w-20 bg-blue-500  ml-4 border-transparent"
              onClick={function () {
                console.log();
              }}
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
