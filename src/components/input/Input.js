import React, { useState } from "react";
import "./Input.css";

const Input = (props) => {
	const { name, onBlur, onChange, type, value } = props;

	const [val, setValue] = useState(value || '')

	const onLocalChange = (e) => {
		setValue(e.target.value)
	}

	return (
		<input
			type={type}
			name={name}
			onBlur={onBlur}
			onChange={onChange ? onChange : onLocalChange}
			value={val}
		/>
	);
};

export default Input;
