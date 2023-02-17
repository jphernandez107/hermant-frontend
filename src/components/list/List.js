import React from 'react';
import "./List.css"

import Table from '../table/Table'

const List = (props) => {
    return (
        <div className='list-wrapper'>
            <div className='page-header'>
                {props.children}
            </div>
            <Table columns={props.table_columns} data={props.table_data} title={props.title}></Table>
        </div>
    )
}

export default List;