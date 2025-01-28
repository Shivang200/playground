import React from 'react';

const Message = ({message}) => {
  return (
    <div id="box" className=" ml-[150px] mb-1 p-2 break-words   min-h-9  min-w-72 max-w-2xl  text-white  bg-blue-800 rounded-md  ">
            
  <h6>{message}</h6>
     
      </div>
  );
};

export default Message;