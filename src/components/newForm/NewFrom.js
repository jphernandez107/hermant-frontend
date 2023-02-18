import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../button/Button";
import "./NewForm.css";

const api = require("../../api/Api");

const NewForm = (props) => {
	const navigate = useNavigate();
	const location = useLocation();
	const { header_title, header_subtitle, action, rows } = props.form_data;

	const handleSubmit = (event) => {
		event.preventDefault();

		// Create an object to store the form data
		const formData = {};
		const formInputs = event.target.getElementsByTagName("input");
		const formTextAreas = event.target.getElementsByTagName("textarea");

		// Collect the form data from input fields
		for (let i = 0; i < formInputs.length; i++) {
			const input = formInputs[i];
			formData[input.name] = input.value;
		}

		// Collect the form data from input fields
		for (let i = 0; i < formTextAreas.length; i++) {
			const textArea = formTextAreas[i];
			formData[textArea.name] = textArea.value;
		}

		// Make the API call
		api.postNew(action, formData);
		if (location.state && location.state.from) {
			navigate(-1);
		} else {
			navigate("/");
		}
	};

	return (
		<div className="form-wrapper">
			<div className="form-header">
				<h2>{header_title}</h2>
				<h4>{header_subtitle}</h4>
			</div>
			<div className="new-form">
				<form
					className="form"
					method="POST"
					action={props.form_data.action}
					onSubmit={handleSubmit}
				>
					{rows.map((row, index) => (
						<FormRow key={index} columns={row.columns} />
					))}
					<div className="submit-button-container">
						<Button className="submit-button" type={"submit"}>
							Guardar
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

const FormRow = (props) => {
	const columns = props.columns.map((column, index) => (
		<FormColumn
			key={index}
			label={column.label}
			name={column.name}
			placeholder={column.placeholder}
			type={column.type}
			value={column.value}
			rows={column.rows}
			options={column.options}
		/>
	));

	return <div className="form-row">{columns}</div>;
};

const FormColumn = (props) => {
	const [value, setValue] = useState(props.value);

	const options = props.options || [];
	const optionElements = options.map((option, index) => (
		<option key={index} value={option} />
	));
	const { label, name, placeholder, type, rows } = props;
	const placeholderValue = placeholder || label;

	const handleInputChange = (e) => {
		setValue(e.target.value);
	};

	return (
		<div className="form-column">
			<label>{label}</label>
			<div className="form-input">
				{rows && rows > 1 ? (
					<textarea
						className="input"
						name={name}
						placeholder={placeholderValue}
						rows={rows}
						value={value}
						onChange={handleInputChange}
					/>
				) : (
					<>
						<input
							className="input"
							name={name}
							placeholder={placeholderValue}
							type={type}
							value={value}
							onChange={handleInputChange}
							list={name + "-options"}
						/>
						{options.length > 0 && (
							<datalist id={name + "-options"}>
								{optionElements}
							</datalist>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default NewForm;
