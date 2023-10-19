import React, { useContext, useState } from 'react';
import './Navbar.scss';
import { UserContext, verifyRole } from 'context/Context';
import MenuIcon from '../menuIcon/MenuIcon';

function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const { user } = useContext(UserContext);

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
		{
			text: "Cerrar Sesión",
			icon: "fa-solid fa-sign-out fa-1x",
			url: "/signin",
			role: "Mechanic"
		}
	];

	const toggleMenu = () => {
		setMenuOpen(prevMenuOpen => !prevMenuOpen);
	}

	const handleLogout = (url) => {
		if (url !== '/signin') return;
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		window.location = '/signin';
	}

	const menuItem = (text, icon, url) => {
		return (
			<li className="navbar-menu-item" key={url} onClick={() => handleLogout(url)}>
				<a href={url} className="navbar-menu-link">
					<i className={icon}></i>
					{text}
				</a>
			</li>
		)
	}

	return (
		<nav className="navbar">
			<MenuIcon menuOpen={menuOpen} onClick={toggleMenu}/>
			{(
				<ul className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
					{menuItems.map(({ text, icon, url, role }) => {
						if (verifyRole(user?.role, role)) 
							return menuItem(text, icon, url);
					})}
				</ul>
			)}
			<div className="navbar-icon">
				<img src="/dist/img/construct-care-logo.png" alt="ConstructCare Logo" />
			</div>
			<button className="navbar-button navbar-button-search">
				<i className="fas fa-search"></i>
			</button>
		</nav>
	);
}

export default Navbar;
