import { createContext, useState } from "react";
import CustomToast from "../components/ui/custom-toast";

export type ToastMessage = {
  message: string;
  type: "success" | "error";
};

export type AppContextType = {
  showToast: (message: ToastMessage) => void;
  toast: ToastMessage | null;
};

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (message: ToastMessage) => {
    setToast(message);
  };
  return (
    <AppContext.Provider value={{ showToast, toast }}>
      {toast && (
        <CustomToast
          message={toast.message}
          type={toast.type}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};