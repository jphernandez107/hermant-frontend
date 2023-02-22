import React from 'react';
import "./Select.css"

const Select = ({children, onChange}) => {

    return (
        <select className="select" onChange={onChange}>
            {children}
        </select>
    );
}

export default Select;