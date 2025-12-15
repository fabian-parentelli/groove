import { useAlertContext } from "./AlertContext.jsx";
import { createContext, useContext, useState } from "react";
import { logoutApi } from "../helpers/session/logout.api.js";
// import { putUserApi } from "../helpers/users/putUser.api.js";
import { currentApi } from "../helpers/session/current.api.js";
import { postSessionApi } from "../helpers/session/postSession.api.js";

const LoginContext = createContext();
export const useLoginContext = () => useContext(LoginContext);

const LoginProvider = ({ children }) => {

    const { showAlert } = useAlertContext();
    const [user, setUser] = useState({ data: null, logged: false });

    const postUserContext = async (values) => {
        const response = await postSessionApi(values);
        if (response.status === 'success') {
            if (response.result) setUser({ data: response.result, logged: true });
            return 'success'
        } else showAlert(response.error, 'error');
    };

    const current = async () => {
        const response = await currentApi();
        if (response?.status === 'success') setUser({ data: response.result, logged: true });
        else if (user.logged) setUser({ data: null, logged: false });
    };

    const logout = async () => {
        const response = await logoutApi();
        if (response.status === 'success') {
            setUser({ data: null, logged: false });
            showAlert('Hasta la próxima....', 'info');
        } else showAlert(response.error, 'error');
    };

    const updateUser = async (user, fd = false) => {
        // const response = await putUserApi(user, fd);
        // if (response.status === 'success') {
        //     setUser(prev => ({ ...prev, data: { ...prev.data, ...response.result } }));
        //     return true;
        // } else if (response.status === 'pending') showAlert(response.message, 'warning');
        // else showAlert(response.error, 'error');
    };

    return (
        <LoginContext.Provider
            value={{ user, postUserContext, current, logout, updateUser }}
        >
            {children}
        </LoginContext.Provider>
    );
};

export default LoginProvider;