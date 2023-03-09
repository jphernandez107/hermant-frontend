import React from 'react';
import "./List.scss"

import Table from "components/table/Table"

const List = (props) => {
    return (
        <div className='list-wrapper'>
            {props.children && <div className='page-header'>
                {props.children}
            </div>}
            <Table style={['first-column-bold']} columns={props.table_columns} data={props.table_data} title={props.title} onRowClicked={props.onRowClicked} showSearchBar={props.showSearchBar}></Table>
        </div>
    )
}

export default List;