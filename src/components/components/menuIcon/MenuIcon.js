import React from 'react';
import './MenuIcon.scss';

const MenuIcon = ({ menuOpen, onClick }) => {
	return (
		<div className="menu-icon-background" onClick={onClick}>
			<button className={`menu-icon ${menuOpen ? 'open' : ''}`}>
				<span></span>
				<span></span>
				<span></span>
			</button>
		</div>
	);
}

export default MenuIcon;