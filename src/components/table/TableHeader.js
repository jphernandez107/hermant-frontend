import React, { useState } from 'react';
import "./TableHeader.scss"

import SearchBar from "components/searchBar/SearchBar"

const TableHeader = (
    {
        showSearchBar = true, 
        children, 
        button, 
        showBackButton = false,
        searchInput = '',
        setSearchInput,
        count
    }) => {

    const title = children ? children : ''
    const lowerCaseTitle = title.toLowerCase()
    const searchHint = `Buscar ${lowerCaseTitle}`

    return (
        <div className='table-header'>
            {getBackButton(showBackButton)}
            <h3>{title}</h3>
            {getSearchBar(showSearchBar)}
            {getButton(button)}
        </div>
    )

    function getSearchBar(showSearchBar) {
        return showSearchBar ? <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} count={count} >{searchHint}</SearchBar> : <></>
    }

    function getButton(button) {
        return button ? React.createElement(button) : <></>
    }

    function getBackButton(showBackButton) {
        return showBackButton ? <i className="far fa-arrow-left"></i> : <></>
    }

}

export default TableHeader;