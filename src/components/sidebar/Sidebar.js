import React, { useState, useContext } from 'react';
import { UserContext, verifyRole } from 'context/Context';
import "./Sidebar.scss"
import useOrientation from 'components/hooks/UseOrientation';


const Sidebar = () => {
    const [isExpanded, setExpandState] = useState(false);
    const currentPath = window.location.pathname
    const { user } = useContext(UserContext);
    const isPortrait = useOrientation();

    const menuItems = [
        {
            text: "Inicio",
            icon: "fa-solid fa-calendar-week fa-1x",
            url: "/",
            role: "Mechanic"
        },
        {
            text: "Equipos",
            icon: "mdi mdi-bulldozer",
            url: "/equipment/list",
            role: "Engineer"
        },
        {
            text: "Obras",
            icon: "fa-solid fa-helmet-safety fa-1x",
            url: "/site/list",
            role: "Engineer"
        },
        {
            text: "Repuestos",
            icon: "fa-solid fa-wrench fa-1x",
            url: "/part/list",
            role: "Mechanic"
        },
        {
            text: "Usuarios",
            icon: "fa-solid fa-users fa-1x",
            url: "/user/list",
            role: "Admin"
        },
    ];

    const menuItemSelected = (url, currentPath) => {
        const regex = /\/(\w+)/;
        const urlRegex = url.match(regex);
        const currentPathRegex = currentPath.match(regex);
        const urlStart = urlRegex ? urlRegex[1] : '';
        const currentPathStart = currentPathRegex ? currentPathRegex[1] : '';
        return urlStart === currentPathStart ? 'menu-item-selected' : ''
    }

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location = '/signin';
    }

    const menuItem = (text, icon, url) => {
        return (
            <a
                className={
                    `menu-item ${isExpanded ? "" : "menu-item-NX "} ${menuItemSelected(url, currentPath)}`
                }
                href={url}
                key={text}
            >
                <i className={`menu-item-icon ${icon}`}></i>
                {isExpanded && <p> {text}</p>}
            </a>
        )
    }

    return (
        <>
        {isPortrait ? <></> 
        : <div
            className={isExpanded ? "side-nav-container" : "side-nav-container side-nav-container-NX"}
            onMouseEnter={() => { setExpandState(true) }}
            onMouseLeave={() => { setExpandState(false) }} >
            <div className="nav-upper">

                <div className={isExpanded ? "nav-heading" : "nav-heading nav-heading-NX"}>
                    <a className="nav-brand" href='/'>
                        <img src="/dist/img/construct-care-logo.png" alt="ConstructCare Logo" />
                        {isExpanded && (
                            <h2>ConstructCare</h2>
                        )}
                    </a>
                </div>

                <div className="nav-menu">
                    {menuItems.map(({ text, icon, url, role }) => {
                        if (verifyRole(user?.role, role)) 
                            return menuItem(text, icon, url);
                    })}
                </div>
            </div>

            <div className='nav-middle'>

            </div>

            <div className={isExpanded ? "nav-footer" : "nav-footer-NX"}>
                <div className="nav-details">
                    <i className="fa-solid fa-right-from-bracket nav-footer-logout" onClick={handleLogout}/>
                    {isExpanded && user && (
                        <div className="nav-footer-info">
                            <p className="nav-footer-user-name">{user.first_name}</p>
                            <p className="nav-footer-user-position">{user.role}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>}
        </>
    )

}

export default Sidebar;