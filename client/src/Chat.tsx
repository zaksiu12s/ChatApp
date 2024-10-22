// Chat.tsx
import React, { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { motion } from "framer-motion";

interface Message {
  senderUsername: string;
  value: string;
  createdAt?: Date;
  token?: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messageValue, setMessageValue] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  let username: string, token: string;

  if (
    typeof localStorage.getItem("username") == "string" &&
    typeof localStorage.getItem("token") == "string"
  ) {
    username = localStorage.getItem("username") as string;
    token = localStorage.getItem("token") as string;
  }

  useEffect(() => {
    const storedMessage = localStorage.getItem("message");
    if (storedMessage) {
      setMessageValue(storedMessage); // Load stored message into state
    }
  }, []);

  useEffect(() => {
    // Connect to the Socket.IO server
    const socket = io("http://localhost:8000");

    // Fetch messages when connected
    socket.on("connection", () => {
      console.log("Connected to the server");
    });

    // Listen for incoming messages
    socket.on("getMessages", (messages: Message[]) => {
      setMessages(() => [...messages]);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });

    // Set the socket instance to state
    setSocket(socket);

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (messageValue?.trim()) {
      const message: Message = {
        senderUsername: username,
        value: messageValue.trim(),
        token,
      };

      socket?.emit("sendMessage", { ...message });
      setMessageValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage(); // Call sendMessage when Enter is pressed
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (messageValue?.trim()) {
      localStorage.setItem("message", messageValue);
    }

    if (messageValue === "") {
      localStorage.removeItem("message");
    }
  }, [messageValue]);

  return (
    <motion.div
      className="h-full max-h-screen flex flex-col bg-green-700 text-white"
      drag
      whileTap={{ scale: 0.95 }}
      dragConstraints={{
        top: -window.innerHeight / 2,
        left: -window.innerWidth / 2,
        right: window.innerWidth / 2,
        bottom: window.innerHeight / 2,
      }}
    >
      <div className="flex flex-col w-full max-h-full overflow-y-scroll p-1 gap-1">
        {messages.map((msg, index) => (
          <p
            key={index}
            className={
              (msg.senderUsername === username
                ? "self-end bg-green-500 "
                : "bg-green-800 ") + "w-max p-1 px-2 rounded-full"
            }
          >
            <strong>{msg.senderUsername}</strong>: {msg.value}{" "}
            <em>({new Date(msg.createdAt || "").toLocaleString()})</em>
          </p>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex">
        <input
          className="flex-1 bg-green-600 placeholder-white p-1 px-2"
          type="text"
          placeholder="Type a message..."
          value={messageValue || ""}
          onChange={(e) => setMessageValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-green-500 p-2"
          type="button"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </motion.div>
  );
};

export default Chat;
