import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation } from "react-icons/hi";

type Props = {
  message: string;
  type?: "success" | "error";
};

const CustomToast: React.FC<Props> = ({ message, type = "success" }) => {
  return (
    <Toast className="absolute top-5 right-5">
      <div
        role="alert"
        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg
          ${
            type === "success"
              ? "bg-green-100 text-green-500"
              : "bg-red-100 text-red-500"
          }
          `}
      >
        {
          type === "success" ? (
            <HiCheck className="h-5 w-5" />
          ) : (
            <HiExclamation className="h-5 w-5" />
          )
        }
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <Toast.Toggle />
    </Toast>
  );
};

export default CustomToast;
