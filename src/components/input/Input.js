import React, { useState, useEffect } from "react";
import "./Input.scss";

const Input = (props) => {
	const {
		className,
		name,
		onBlur,
		onChange,
		type,
		value,
		min,
		max,
		placeholder,
		isTextArea,
		rows,
		onPaste,
		list,
	} = props;

	const [val, setValue] = useState(value || "");

	useEffect(() => {
		setValue(value);
	}, [value]);

	const onLocalChange = (e) => {
		const value = getValue(e.target.value, type, min, max);
		setValue(value);
	};

	const onLocalBlur = (e) => {
		onLocalChange(e)
		if (!onBlur) return
		onBlur(e);
		const value = getValue(e.target.value, type, min, max);
		setValue(value);
	};

	return (
		<div className={`input-container ${className}`}>
			{isTextArea ? (
				<textarea
					className={`input ${className}`}
					name={name}
					placeholder={placeholder}
					rows={rows}
					value={val}
					onBlur={onLocalBlur}
					onChange={onChange ? onChange : onLocalChange}
					onPaste={onPaste}
				/>
			) : (
				<input
					className={`input ${className}`}
					type={type}
					name={name}
					onBlur={onLocalBlur}
					onChange={onChange ? onChange : onLocalChange}
					value={val}
					placeholder={placeholder}
					onPaste={onPaste}
					list={list}
				/>
			)}
		</div>
	);

	function getValue(value, type, min, max) {
		if (type !== "number" || value === "") return value;
		else if (min !== undefined && value <= min) value = min;
		else if (max !== undefined && value >= max) value = max;
		return value;
	}
};

export default Input;
