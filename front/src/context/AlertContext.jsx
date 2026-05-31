import { createContext, useContext, useState, useEffect } from "react";
import { Snackbar, Loader } from 'fara-comp-react'

const AlertContext = createContext();
export const useAlertContext = () => useContext(AlertContext);

const AlertProvider = ({ children }) => {

    const [snack, setSnack] = useState({ open: false, message: '', status: 'success' });
    const [loading, setLoading] = useState(false);
    const [textLoader, setTextLoader] = useState(false);

    const [viewPlayList, setViewPlayList] = useState(window.innerWidth >= 767);
    const [changeList, setChangeList] = useState(0);

    useEffect(() => {
        const handleResize = () => setViewPlayList(window.innerWidth >= 767);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const showAlert = (message, status = 'success') => {
        setSnack({ open: true, message, status });
        setTimeout(() => { setSnack({ open: false, message: '', status: 'success' }) }, 4000);
    };

    return (
        <AlertContext.Provider value={{ showAlert, setLoading, setTextLoader, viewPlayList, 
            setViewPlayList, changeList, setChangeList
        }}>
            {children}

            <Snackbar snack={snack} />
            <Loader loading={loading} text={textLoader} />
        </AlertContext.Provider>
    );
};

export default AlertProvider;