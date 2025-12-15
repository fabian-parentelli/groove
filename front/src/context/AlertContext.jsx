import { createContext, useContext, useState } from "react";
import { Snackbar, Loader } from 'fara-comp-react'

const AlertContext = createContext();
export const useAlertContext = () => useContext(AlertContext);

const AlertProvider = ({ children }) => {

    const [snack, setSnack] = useState({ open: false, message: '', status: 'success' });
    const [loading, setLoading] = useState(false);
    const [textLoader, setTextLoader] = useState(false);

    const showAlert = (message, status = 'success') => {
        setSnack({ open: true, message, status });
        setTimeout(() => { setSnack({ open: false, message: '', status: 'success' }) }, 4000);
    };

    return (
        <AlertContext.Provider value={{ showAlert, setLoading, setTextLoader }}>
            {children}

            <Snackbar snack={snack} />
            <Loader loading={loading} text={textLoader} />
        </AlertContext.Provider>
    );
};

export default AlertProvider;