import Input from "components/input/Input";
import React, { useState } from "react";
import "./SearchBar.scss";

const SearchBar = (
	{
		children,
		searchInput,
		setSearchInput,
		count
	}
	) => {

	const handleChange = (e) => {
		e.preventDefault();
		setSearchInput(e.target.value);
	};

	return (
		<div className="search-wrapper">
			<div className="icon-span">
				<i className="fas fa-search" aria-hidden="true"></i>
			</div>
			<Input 
				className={count ? `counter` : ``}
				type="search"
				placeholder={children}
				onBlur={handleChange}
				onChange={handleChange}
				value={searchInput}
			/>
			{count > 0 && <div className="count-span-container">
				<span className="count-span">{count}</span>
			</div>}	
		</div>
	);
};

export default SearchBar;
