import React, { useState } from 'react';
import "./TableHeader.css"

import SearchBar from '../searchBar/SearchBar'

const TableHeader = ({children}) => {

    const title = children
    const lowerCaseTitle = title.toLowerCase()
    const searchHint = `Buscar ${lowerCaseTitle}`

    return (
        <div className='table-header'>
            <h3>{title}</h3>
            <SearchBar>{searchHint}</SearchBar>
        </div>
    )

}

export default TableHeader;