import React from "react";
import "./Checkbox.scss"

const Checkbox = (props) => {
	const { name, isChecked, handleCheckboxSelected } = props;

	return (
		<input
			className="checkbox"
			type={"checkbox"}
			name={name}
			checked={isChecked}
			onChange={(e) => {
				handleCheckboxSelected(name, e.target.checked);
			}}
		></input>
	);
};

export default Checkbox;