import React, { useState, useEffect } from "react";
import "./Select.scss";

const Select = ({ children, onChange, defaultValue, value }) => {
	const [val, setValue] = useState(value || "");

	useEffect(() => {
		setValue(value);
	}, [value]);

	const onLocalChange = (e) => {
		setValue(e.target.value);
		if (onChange) onChange(e);
	};

	return (
		<select
			className="select"
			onChange={onLocalChange}
			defaultValue={defaultValue}
			value={val}
		>
			{children}
		</select>
	);
};

export default Select;
