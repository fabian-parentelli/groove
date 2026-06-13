import { Snackbar, Loader, Modal } from 'fara-comp-react'
import { createContext, useContext, useState, useEffect } from "react";
import ModSettings from '../components/modals/ModSettings/ModSettings';

const AlertContext = createContext();
export const useAlertContext = () => useContext(AlertContext);

const AlertProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);
    const [textLoader, setTextLoader] = useState(false);
    const [modal, setModal] = useState({ open: false, data: null, type: null });
    const [snack, setSnack] = useState({ open: false, message: '', status: 'success' });

    const [changeList, setChangeList] = useState(0);
    const [viewPlayList, setViewPlayList] = useState(window.innerWidth >= 767);

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
        <AlertContext.Provider value={{
            showAlert, setLoading, setTextLoader, viewPlayList,
            setViewPlayList, changeList, setChangeList, setModal
        }}>
            {children}

            <Snackbar snack={snack} />
            <Loader loading={loading} text={textLoader} />

            <Modal open={modal.open} onClose={() => setModal({ open: false, data: null, type: null })}
                backgroundColor='#1B263B'
            >
                <ModSettings modal={modal} setModal={setModal} />
            </Modal>

        </AlertContext.Provider>
    );
};

export default AlertProvider;