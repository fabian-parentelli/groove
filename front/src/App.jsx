import AlertProvider from "./context/AlertContext.jsx";
import LoginProvider from "./context/LoginContext.jsx";
import RadioProvider from "./context/RadioContext.jsx";
import WrapRoutes from "./routes/WrapRoutes.jsx";

const App = () => {

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