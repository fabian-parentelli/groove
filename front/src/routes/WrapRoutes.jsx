import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "@/components/utils/ScrollToTop.jsx";
import NavBar from "../containers/layout/NavBar/NavBar.jsx";
import User from "../containers/pages/User/User.jsx";
import { useLoginContext } from "../context/LoginContext.jsx";
import DashRouter from "./DashRouter.jsx";
import Radio from "../containers/layout/Radio/Radio.jsx";
import NotFound from "../containers/layout/NotFound/NotFound.jsx";
import Footer from "../containers/layout/Footer/Footer.jsx";
import OurNews from "../containers/pages/info/OurNews/OurNews.jsx";
import Player from "../containers/pages/Player/Player.jsx";
import PreView from "../containers/pages/PreView/PreView.jsx";
import Search from "../containers/pages/Search/Search.jsx";
import BodyRouter from "./BodyRouter.jsx";

const WrapRoutes = () => {

    const { user, current } = useLoginContext();

    useEffect(() => { current() }, []);

    return (
        <BrowserRouter>
            <ScrollToTop>

                <Routes>

                    {BodyRouter()}

                    <Route path="/user" element={<User />} />
                    <Route path="/ournews" element={<OurNews />} />
                    <Route path="/player" element={<Player />} />
                    <Route path="/preview" element={<PreView />} />
                    <Route path="/search/:id" element={<Search />} />
                    
                    <Route path="*" element={<NotFound />} />

                    {user.logged &&
                        <>
                            {DashRouter()}
                        </>
                    }
                </Routes>

                <Radio />

            </ScrollToTop>
        </BrowserRouter>
    );
};

export default WrapRoutes;