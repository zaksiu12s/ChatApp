import { useState, useEffect } from "react";
import Chat from "./Chat";
import Logout from "./Logout";
import Alert from "./Alert";

const Login = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("username") && localStorage.getItem("token")) {
      setShowAlert(false);
      setIsVisible(false);
    }
  }, []);

  const sendMessage = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/users?username=${username?.trim()}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      localStorage.setItem("username", result.senderUsername);
      localStorage.setItem("token", result.token);
      setShowAlert(false);
      setUsername("");
      setIsVisible(false);
    } catch (error) {
      console.error("Post error:", error);
      setShowAlert(true);
    }
  };

  return (
    <>
      {showAlert && (
        <Alert
          message="Specify your username and password."
          title="Failed to log in."
          color="red"
        />
      )}

      <div className={isVisible ? "" : "hidden"}>
        <div className="bg-green-400 absolute left-0 top-0 w-full h-full z-30 flex flex-col justify-center items-center">
          <input
            type="text"
            placeholder="Enter your username..."
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="button" onClick={sendMessage}>
            Login
          </button>
        </div>
      </div>
      <div className={isVisible ? "hidden" : "max-w-[1000px] m-auto"}>
        <Chat />
        <Logout />
      </div>
    </>
  );
};

export default Login;
