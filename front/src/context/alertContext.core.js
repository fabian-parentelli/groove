import { createContext, useContext } from "react";

const AlertContext = createContext();
export const useAlertContext = () => useContext(AlertContext);
export { AlertContext };
