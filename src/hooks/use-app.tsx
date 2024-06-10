import { useContext } from "react";
import { AppContext, AppContextType } from "../providers/app-provider";

export const useApp = () => {
  return useContext(AppContext) as AppContextType
}