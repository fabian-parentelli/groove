import './navBar.css';
import { useEffect, useState } from 'react';
import NavBarCont from './NavBarCont/NavBarCont';

const NavBar = () => {

    const [startLocation, setStartLocation] = useState(0);
    const [showNav, setShowNav] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.pageYOffset;
            currentScroll > startLocation ? setShowNav(false) : setShowNav(true);
            setStartLocation(currentScroll);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [startLocation]);

    const navStyle = {
        transition: '0.3s',
        top: showNav ? '0' : '-100px',
        boxShadow: showNav && startLocation > 0 ? '1px 1px 3px rgba(0, 0, 0, 0.1)' : 'none'
    };

    return (
        <div className='navBar' style={navStyle}>
            <NavBarCont />
        </div>
    );
};

export default NavBar;