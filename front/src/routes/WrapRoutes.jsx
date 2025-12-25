import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "@/components/utils/ScrollToTop.jsx";
import NavBar from "../containers/layout/NavBar/NavBar.jsx";
import User from "../containers/pages/User/User.jsx";
import { useLoginContext } from "../context/LoginContext.jsx";
import DashRouter from "./DashRouter.jsx";
import Radio from "../containers/layout/Radio/Radio.jsx";
import Body from "../containers/Body/Body.jsx";
import ListPage from "../containers/pages/ListPage/ListPage.jsx";
import NotFound from "../containers/layout/NotFound/NotFound.jsx";
import CategoryPage from "../containers/pages/CategoryPage/CategoryPage.jsx";
import Footer from "../containers/layout/Footer/Footer.jsx";
import OurNews from "../containers/pages/info/OurNews/OurNews.jsx";

const WrapRoutes = () => {

    const { user } = useLoginContext();

    return (
        <BrowserRouter>
            <ScrollToTop>

                <NavBar />

                <Routes>
                    <Route path="/" element={<Body />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/list" element={<ListPage />} />
                    <Route path="/category" element={<CategoryPage />} />
                    <Route path="/ournews" element={<OurNews />} />
                    
                    <Route path="*" element={<NotFound />} />

                    {user.logged &&
                        <>
                            {DashRouter()}
                        </>
                    }
                </Routes>

                <Radio />
                <Footer />

            </ScrollToTop>
        </BrowserRouter>
    );
};

export default WrapRoutes;