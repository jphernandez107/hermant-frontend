import React from "react";
import "./Checkbox.scss"

const Checkbox = (props) => {
	const { id, name, isChecked, handleCheckboxSelected } = props;

	return (
		<label className="checkbox-container">
			<input
				id={id}
				className="checkbox"
				type={"checkbox"}
				name={name}
				checked={isChecked}
				onChange={(e) => {
					handleCheckboxSelected(name, e.target.checked);
				}}
			/>
			<div className="checkbox-checkmark"></div>
		</label>
	);
};

export default Checkbox;