import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../button/Button";
import "./NewForm.scss";

const api = require("../../api/Api");

const NewForm = (props) => {
	const navigate = useNavigate();
	const location = useLocation();
	const { header_title, header_subtitle, action, rows, method, go_to_after_submit } = props.form_data;

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
		// TODO: Show an alert telling the user if everything was okay
		api.postNew(action, formData, method)
			.then(() => {
				navigate(go_to_after_submit);
			})
			.catch((error) => console.log(error));
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
	const columns = props.columns.map((column, index) => {
		return (
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
	)});

	return <div className="form-row">{columns}</div>;
};

const FormColumn = (props) => {
	const [value, setValue] = useState(defaultValue(props.value, props.type));

	const options = props.options || [];
	const optionElements = options.map((option, index) => (
		<option key={index} value={option} />
	));
	const { label, name, placeholder, type, rows } = props;
	const placeholderValue = placeholder || label;

	useEffect(() => {
		setValue(defaultValue(props.value, props.type));
	}, [props.value]);

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

const defaultValue = (value, type) => {
	if (value !== undefined || value !== null) return value
	else if (type === "number") return 0 
	else return ""
}

export default NewForm;
