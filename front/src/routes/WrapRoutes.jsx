import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "@/components/utils/ScrollToTop.jsx";
import NavBar from "../containers/layout/NavBar/NavBar.jsx";
import User from "../containers/pages/User/User.jsx";
import { useLoginContext } from "../context/LoginContext.jsx";
import DashRouter from "./DashRouter.jsx";

const WrapRoutes = () => {

    const { user } = useLoginContext();

    return (
        <BrowserRouter>
            <ScrollToTop>

                <NavBar />

                <Routes>
                    <Route path="/" element={''} />
                    <Route path="/user" element={<User />} />

                    {user.logged &&
                        <>
                            {DashRouter()}
                        </>
                    }
                </Routes>

            </ScrollToTop>
        </BrowserRouter>
    );
};

export default WrapRoutes;