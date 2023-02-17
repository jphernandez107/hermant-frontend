import React, { useState } from 'react';
import "./TableHeader.css"

import SearchBar from '../searchBar/SearchBar'

const TableHeader = ({showSearchBar = true, children}) => {

    const title = children ? children : ''
    const lowerCaseTitle = title.toLowerCase()
    const searchHint = `Buscar ${lowerCaseTitle}`

    return (
        <div className='table-header'>
            <h3>{title}</h3>
            {getSearchBar(showSearchBar)}
        </div>
    )

    function getSearchBar(showSearchBar) {
        return showSearchBar ? <SearchBar>{searchHint}</SearchBar> : <></>
    }

}

export default TableHeader;