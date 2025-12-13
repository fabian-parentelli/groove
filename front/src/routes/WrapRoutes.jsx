import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "@/components/utils/ScrollToTop.jsx";
import NavBar from "../containers/layout/NavBar/NavBar.jsx";
import User from "../containers/pages/User/User.jsx";

const WrapRoutes = () => {

    return (
        <BrowserRouter>
            <ScrollToTop>

                <NavBar />

                <Routes>
                    <Route path="/user" element={<User />} />

                </Routes>

            </ScrollToTop>
        </BrowserRouter>
    );
};

export default WrapRoutes;