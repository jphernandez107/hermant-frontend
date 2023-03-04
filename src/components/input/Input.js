import React, { useState } from "react";
import "./Input.css";

const Input = (props) => {
	const { name, onBlur, onChange, type, value, min, max, placeholder } = props;

	const [val, setValue] = useState(value || '')

	const onLocalChange = (e) => {
		const value = getValue(e.target.value, type, min, max)
		setValue(value)
	}

	const onLocalBlur = (e) => {
		onBlur(e)
		const value = getValue(e.target.value, type, min, max)
		setValue(value)
	}

	return (
		<input
			type={type}
			name={name}
			onBlur={onLocalBlur}
			onChange={onChange ? onChange : onLocalChange}
			value={val}
			placeholder={placeholder}
		/>
	);

	function getValue(value, type, min, max) {
		if (type !== 'number' || value === '') return value
		else if (min !== undefined && value <= min) value = min
		else if (max !== undefined && value >= max) value = max
		return value
	}
};

export default Input;
