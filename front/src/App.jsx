import { useEffect } from "react";
import { initDB } from './utils/db.utils.js';
import WrapRoutes from "./routes/WrapRoutes.jsx";
import AlertProvider from "./context/AlertContext.jsx";
import LoginProvider from "./context/LoginContext.jsx";
import RadioProvider from "./context/RadioContext.jsx";

const App = () => {

    useEffect(() => { initDB() }, []);

    return (
        <>
            <AlertProvider>
                <LoginProvider>
                    <RadioProvider>
                        <WrapRoutes />
                    </RadioProvider>
                </LoginProvider>
            </AlertProvider>
        </>
    );
};

export default App;