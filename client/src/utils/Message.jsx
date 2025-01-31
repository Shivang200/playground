import React from "react";

const Message = ({ message, user }) => {
  return (
    <div className="flex items-center ml-[150px] mb-1 p-1 break-words min-h-9  min-w-72 max-w-2xl  text-white  rounded-md ">
      {/* Circle showing the user's first name initial */}
      <div className="w-10 h-10 flex items-center justify-center bg-purple-500 text-white font-bold rounded-full mr-3">
        {user.charAt(0).toUpperCase()} {/* First letter of the user's name */}
      </div>
      {/* Display the username and message */}
      <div>
        <div className="text-purple-500 font-bold">{user}</div> {/* Username */}
        <div className="bg-gray-700 text-white p-2 rounded-lg min-w-32">{message}</div> {/* Message */}
      </div>
    </div>
  );
};

export default Message;



// import React from 'react';

// const Message = ({message}) => {
//   return (
//     <div id="box" className=" ml-[150px] mb-1 p-2 break-words   min-h-9  min-w-72 max-w-2xl  text-white  bg-blue-800 rounded-md  ">
            
//   <h6>{message}</h6>
     
//       </div>
//   );
// };

// export default Message;