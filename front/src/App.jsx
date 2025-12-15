import AlertProvider from "./context/AlertContext.jsx";
import LoginProvider from "./context/LoginContext.jsx";
import WrapRoutes from "./routes/WrapRoutes.jsx";

const App = () => {

    return (
        <>
            <AlertProvider>
                <LoginProvider>
                    <WrapRoutes />
                </LoginProvider>
            </AlertProvider>
        </>
    );
};

export default App;