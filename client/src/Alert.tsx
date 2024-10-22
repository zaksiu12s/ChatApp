import { useEffect, useState } from "react";

interface AlertPopupProps {
  message: string;
  title: string;
  color: "red" | "green" | "blue";
}

const Alert: React.FC<AlertPopupProps> = ({ message, title, color }) => {
  const [showAlert, setShowAlert] = useState(true);

  const colorClasses = {
    red: "bg-red-100 border-red-400 text-red-700",
    green: "bg-green-100 border-green-400 text-green-700",
    blue: "bg-blue-100 border-blue-400 text-blue-700",
    yellow: "bg-yellow-100 border-yellow-400 text-yellow-700",
  };

  const toggleAlert = () => {
    setShowAlert(!showAlert);
  };

  return (
    <div
      className={`${colorClasses[color]} border rounded
        flex flex-col flex-wrap px-4 py-3 pr-14 top-3 gap-1 fixed w-full 
        sm:min-w-96 sm:w-auto sm:right-3 sm:max-w-xl z-50 ${
          showAlert === true
            ? " animate-slide-in-right"
            : " animate-slide-out-right"
        }`}
      role="alert"
    >
      <strong className="font-bold">{title}</strong>
      <span className="text-wrap">{message}</span>
      <span className="absolute right-0 top-1/2 -translate-y-1/2 mr-2">
        <svg
          className="fill-current h-6 w-6"
          role="button"
          onClick={toggleAlert}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
        </svg>
      </span>
    </div>
  );
};

export default Alert;
