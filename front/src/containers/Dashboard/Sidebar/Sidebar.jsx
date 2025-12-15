import "./sidebar.css";
import { useState } from "react";
import { Icons } from "fara-comp-react";
import { useNavigate } from "react-router-dom";
import { dashModules } from "../../../utils/dashModules.utils.js";

const Sidebar = ({ user }) => {

    const navigate = useNavigate();
    const [active, setActive] = useState(1);

    const goto = (index, link) => {
        setActive(index);
        navigate( index === 1 ? '/dashboard' : `/dashboard/${link}`);
    };

    return (
        <aside className="sidebar-4">

            <div className="inner">

                <div className="header">
                    <img src={user?.img?.[0] ?? '/logo.png'} alt="img" />
                    <h2>{user?.name.toUpperCase()}</h2>
                </div>

                <nav
                    className="menu"
                    style={{ "--top": `${active === 0 ? 0 : active * 56}px` }}
                >
                    {dashModules.map((item, index) => (
                        <button
                            className={active === index ? "active" : ""}
                            key={index}
                            type="button"
                            onClick={() => goto(index, item.link)}
                        >
                            <span><Icons type={item.icon} color="gray" size="25px" /></span>
                            {(user.role === 'user' && item.icon === 'user') 
                                ? <p>Perfil</p>
                                : <p>{item.name}</p>
                            }
                        </button>
                    ))}
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;