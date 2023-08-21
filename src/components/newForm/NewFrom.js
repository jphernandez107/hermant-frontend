import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "components/button/Button";
import "./NewForm.scss";
import Input from "components/input/Input";
import Select from "components/select/Select";
import { toast } from "sonner";

const api = require("api/Api").default;

const NewForm = (props) => {
	const navigate = useNavigate();
	const {
		header_title,
		header_subtitle,
		action,
		rows,
		is_editing,
		go_to_after_submit,
	} = props.form_data;

	const handleSubmit = (event) => {
		event.preventDefault();

		// Create an object to store the form data
		const formData = {};
		const formInputs = event.target.getElementsByTagName("input");
		const formTextAreas = event.target.getElementsByTagName("textarea");
		const formSelects = event.target.getElementsByTagName("select");

		const allColumns = rows.flatMap(row => row.columns);

		// Collect the form data from input fields
		for (let i = 0; i < formInputs.length; i++) {
			const input = formInputs[i];
			formData[input.name] = input.value;
			if (!checkEmptyRequiredFieldByName(allColumns, input.name, input.value)) return;
		}

		// Collect the form data from input fields
		for (let i = 0; i < formTextAreas.length; i++) {
			const textArea = formTextAreas[i];
			formData[textArea.name] = textArea.value;
			if (!checkEmptyRequiredFieldByName(allColumns, textArea.name, textArea.value)) return;
		}

		// Collect the form data from select fields
		for (let i = 0; i < formSelects.length; i++) {
			const select = formSelects[i];
			formData[select.name] = select.value;
			if (!checkEmptyRequiredFieldByName(allColumns, select.name, select.value)) return;
		}

		// Make the API call
		if (is_editing) {
			api.putEdit(action, formData)
				.then(() => navigate(go_to_after_submit))
				.catch((error) => console.error(error));
		} else {
			api.postNew(action, formData)
				.then(() => navigate(go_to_after_submit))
				.catch((error) => console.error(error));
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
							<i className={"fa-solid fa-floppy-disk"} />
							{" Guardar"}
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
		);
	});

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
			{getFieldByType(type)}
		</div>
	);

	function getFieldByType(type) {
		switch (type) {
			case "select":
				return (
					<div className="form-input">
						<Select
							className="type-select"
							onChange={(e) => setValue(e.target.value)}
							name={name}
						>
							{options.map(option => {
								const lowerCaseOption = option.toLowerCase();
								const formattedOption = lowerCaseOption.charAt(0).toUpperCase() + lowerCaseOption.slice(1);
								return (
									<option value={formattedOption} key={formattedOption}>
										{formattedOption}
									</option>
								)
							})}
						</Select>
					</div>
				)
			default:
				return (
					<div className="form-input">
						<Input
							className="input"
							name={name}
							placeholder={placeholderValue}
							type={type}
							value={value}
							onBlur={handleInputChange}
							list={name + "-options"}
							isTextArea={rows && rows > 0}
							rows={rows}
						/>
						{options.length > 0 && (
							<datalist id={name + "-options"}>{optionElements}</datalist>
						)}
					</div>
				)
		}
	}
};

const defaultValue = (value, type) => {
	if (value !== undefined || value !== null) return value;
	else if (type === "number") return 0;
	else return "";
};

function checkEmptyRequiredFieldByName(columns, name, value) {
	const col = columns.find(col => col.name === name);
	if (col && col.required === true && value === "") {
		toast.error(`El campo ${col.label} no debe estar vacio.`);
		return false;
	}
	return true;
}

export default NewForm;
