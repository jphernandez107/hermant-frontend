import React from "react";
import "./Select.scss";

const Select = ({ children, onChange, defaultValue, value }) => {
	return (
		<select
			className="select"
			onChange={onChange}
			defaultValue={defaultValue}
            value={value}
		>
			{children}
		</select>
	);
};

export default Select;
