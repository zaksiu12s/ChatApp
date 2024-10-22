import React from "react";

interface MessageProps {
  sender: string;
  text: string;
  // timestamp: string;
}

const Message: React.FC<MessageProps> = ({ sender, text /*, timestamp*/ }) => {
  return (
    <div
      className="relative 
      text-green-600 text-bold"
    >
      <div className="">{sender}</div>
      <div className="border-2 border-green-600">
        <div className="">{text}</div>
      </div>
    </div>
  );
};

export default Message;
