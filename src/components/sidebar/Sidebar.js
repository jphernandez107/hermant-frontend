import React, { useState } from 'react';
import "./Sidebar.scss"


const Sidebar = () => {
    const [isExpanded, setExpandState] = useState(false);
    const currentPath = window.location.pathname

    const menuItems = [
        {
            text: "Inicio",
            icon: "fa-solid fa-calendar-week fa-1x",
            url: "/"
        },
        {
            text: "Equipos",
            icon: "mdi mdi-bulldozer",
            url: "/equipment/list"
        },
        {
            text: "Obras",
            icon: "fa-solid fa-user-helmet-safety fa-1x",
            url: "/site/list"
        },
        {
            text: "Repuestos",
            icon: "fa-solid fa-wrench fa-1x",
            url: "/part/list"
        },
        {
            text: "Usuarios",
            icon: "fa-solid fa-users fa-1x",
            url: "/user/list"
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

    return (
        <div
            className={isExpanded ? "side-nav-container" : "side-nav-container side-nav-container-NX"}
            onMouseEnter={() => { setExpandState(true) }}
            onMouseLeave={() => { setExpandState(false) }} >
            <div className="nav-upper">

                <div className={isExpanded ? "nav-heading" : "nav-heading nav-heading-NX"}>
                    <a className="nav-brand" href='/'>
                        <img src="/dist/img/hermant-logo.png" alt="Hermant Logo" />
                        {isExpanded && (
                            <h2>Hermant</h2>
                        )}
                    </a>
                </div>

                <div className="nav-menu">
                    {menuItems.map(({ text, icon, url }) => (
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
                    ))}
                </div>
            </div>

            <div className='nav-middle'>

            </div>

            <div className={isExpanded ? "nav-footer" : "nav-footer-NX"}>
                <div className="nav-details">
                    <img
                        className="nav-footer-avatar"
                        src="/dist/img/hermant-logo.png"
                        alt=""
                    />
                    {isExpanded && (
                        <div className="nav-footer-info">
                            <p className="nav-footer-user-name">Juan Hernandez</p>
                            <p className="nav-footer-user-position">Ingeniero</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

}

export default Sidebar;