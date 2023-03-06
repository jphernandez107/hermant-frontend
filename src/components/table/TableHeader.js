import React, { useState } from 'react';
import "./TableHeader.scss"

import SearchBar from "components/searchBar/SearchBar"

const TableHeader = ({showSearchBar = true, children, button}) => {

    const title = children ? children : ''
    const lowerCaseTitle = title.toLowerCase()
    const searchHint = `Buscar ${lowerCaseTitle}`

    return (
        <div className='table-header'>
            <h3>{title}</h3>
            {getSearchBar(showSearchBar)}
            {getButton(button)}
        </div>
    )

    function getSearchBar(showSearchBar) {
        return showSearchBar ? <SearchBar>{searchHint}</SearchBar> : <></>
    }

    function getButton(button) {
        return button ? React.createElement(button) : <></>
    }

}

export default TableHeader;