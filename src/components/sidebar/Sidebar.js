import React, { useState } from 'react';
import "./Sidebar.css"


const Sidebar = () => {
    const [isExpanded, setExpandState] = useState(false);
    const currentPath = window.location.pathname

    const menuItems = [
        {
            text: "Inicio",
            icon: "mdi mdi-calendar",
            url: "/"
        },
        {
            text: "Equipos",
            icon: "mdi mdi-bulldozer",
            url: "/equipment/list"
        },
        {
            text: "Obras",
            icon: "mdi mdi-worker",
            url: "/site/list"
        },
        {
            text: "Repuestos",
            icon: "mdi mdi-wrench",
            url: "/part/list"
        },
        {
            text: "Usuarios",
            icon: "mdi mdi-account-multiple",
            url: "/user/list"
        },
    ];

    return (
        <div
            className={isExpanded ? "side-nav-container" : "side-nav-container side-nav-container-NX"}
            onMouseEnter={() => { setExpandState(true) }}
            onMouseLeave={() => { setExpandState(false) }} >
            <div className="nav-upper">

                <div className={isExpanded ? "nav-heading" : "nav-heading nav-heading-NX"}>
                    <a className="nav-brand" href='/'>
                        <img src="/dist/img/hermant-logo.svg" alt="Hermant Logo" />
                        {isExpanded && (
                            <h2>Hermant</h2>
                        )}
                    </a>
                </div>

                <div className="nav-menu">
                    {menuItems.map(({ text, icon, url }) => (
                        <a
                            className={
                                `menu-item ${isExpanded ? "" : "menu-item-NX "} ${url === currentPath ? 'menu-item-selected' : ''}`
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
                        src="/dist/img/hermant-logo.svg"
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