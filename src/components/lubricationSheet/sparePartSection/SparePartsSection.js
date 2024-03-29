import React, { useState } from "react";
import Button from "components/button/Button";
import Select from "components/select/Select";
import Checkbox from "components/checkbox/Checkbox";
import Input from "components/input/Input";
import "./SparePartsSection.scss"

const SparePartsSection = (props) => {
	const { title, type, icon, subtypes } = props.section;
	const parts = props.parts;
	const frequencies = props.frequencies;
	const { sparePartRows, setSparePartRows } = props;

	const [showSection, setShowSection] = useState(true);

	const toggleSection = () => {
		setShowSection(!showSection);
	}

	const handleAddButton = (e, type, subtype) => {
		e.preventDefault();
		const rows = [...sparePartRows];
		const subtypeRows = rows.filter(
			(row) => row.subtype === subtype && row.type === type
		);
		const lastRowId = subtypeRows.length ? subtypeRows.reduce((prev, current) =>
			prev.rowId > current.rowId ? prev : current
		) : 1;
		const nextRowId = lastRowId.rowId ? lastRowId.rowId + 1 : 1;
		rows.push({
			type: type,
			subtype: subtype,
			rowId: nextRowId,
			part: null,
			application: "",
			quantity: 1,
			frequencies: [],
		});
		setSparePartRows(rows);
	};

	const handleRemoveRowButton = (e, type, subtype) => {
		e.preventDefault();
		const rows = [...sparePartRows];
		const subtypeRows = rows.filter(
			(row) => row.subtype === subtype && row.type === type
		);
		const rowToDelete = subtypeRows.reduce((prev, current) =>
			prev.rowId > current.rowId ? prev : current
		);
		const indexOfRowToDelete = rows.indexOf(rowToDelete);
		rows.splice(indexOfRowToDelete, 1);
		setSparePartRows(rows);
	};

	return (
		<div className="spare-part-section" key={type}>
			<h4 className="spare-part-section-title" onClick={toggleSection}>
				<i className={icon} aria-hidden="true" /> {` ${title} `}<i className={`fa-solid fa-2xs ${showSection ? "fa-chevron-down" : "fa-chevron-right"}`}/>
			</h4>
			<div className={`spare-part-section-subsections ${showSection ? "show" : "hide"}`}>
				{showSection && getSubsections(subtypes, type, title, parts)}
			</div>
		</div>
	);

	function getSubsections(subtypes, type, title, parts) {
		return subtypes.map((subtype) => {
			return (
				<div className="spare-part-subsection" key={subtype.subtype}>
					<div className="spare-part-subsection-header">
						<h5>{subtype.title}</h5>
						<div className="spare-part-subsection-buttons">
							{removeRowButton(type, subtype.subtype)}
							<Button
								styles={["small", "outline"]}
								onClick={(e) => {
									handleAddButton(e, type, subtype.subtype);
								}}
							> 
								<i
									className={"fa fa-plus"}
								/>
							</Button>
						</div>
					</div>
					<div className="spare-part-container">
						<div className="spare-part-title-container">
							<label className="spare-part-type-title">
								{title}
							</label>
							<label className="spare-part-application-title">
								Aplicación
							</label>
							<label className="spare-part-quantity-title">
								Cantidad
							</label>
							<label className="spare-part-maintenance-frequency-title">
								Mantenimientos
							</label>
						</div>
						{getSparePartRows(
							subtype.subtype,
							type,
							parts,
							frequencies,
							sparePartRows
						)}
					</div>
				</div>
			);
		});
	}

    function removeRowButton(type, subtype) {
		const subtypeRows = sparePartRows.filter(
			(row) => row.type === type && row.subtype === subtype
		);
		if (subtypeRows.length > 1)
			return (
				<Button
					styles={["small", "outline"]}
					onClick={(e) => handleRemoveRowButton(e, type, subtype)}
				>
					<i className={"fa fa-minus"} aria-hidden="true" />
				</Button>
			);
	}

	/**
	 * [{
	 *  type: 'filter'
	 *  subtype: 'air',
	 *  rowId: 1,
	 *  part: {part},
	 *  application: "applic",
	 *  quantity: 1,
	 *  frequencies: [{id:1, freq:200}, {4}, {6}]
	 * }]
	 */
	function getSparePartRows(
		subtype,
		type,
		parts,
		frequencies,
		sparePartRows
	) {
		const rows = sparePartRows.filter((row) => row.subtype === subtype && row.type === type);
		if (rows && rows.length > 0) {
			return rows.map((row) => {
				const part = parts.find(
					(part) => (part.id === row.spare_part_id)
				);
				return (
					<SparePartRow
						part={part}
						application={row.application}
						quantity={row.quantity}
						selected_frequencies={row.frequencies}
						parts={parts}
						type={type}
						subtype={row.subtype}
						frequencies={frequencies}
						sparePartRows={sparePartRows}
						setSparePartRows={setSparePartRows}
						key={`${type}-${subtype}-${row.rowId}`}
						rowId={row.rowId}
					></SparePartRow>
				);
			});
		} else {
			return <></>;
		}
	}
};

const SparePartRow = (props) => {
	const { part, application, quantity, selected_frequencies } = props;

	const {
		parts,
		type,
		subtype,
		frequencies,
		sparePartRows,
		setSparePartRows,
		rowId,
	} = props;

	return (
		<div className="spare-part" key={`${type}-${subtype}`}>
			<div className="spare-part-type">
				<Select 
					className="type-select" 
					onChange={(e) => handleSparePartSelected(e.target.value, type, subtype, rowId, application, quantity, parts, sparePartRows)}
					value={
						part ? part.internal_code : "none"
					}
				>
					{getSparePartOptions(parts, type, subtype)}
				</Select>
			</div>
			<div className="spare-part-application">
				<Input 
					className="application-input" 
					onBlur={(e) => handleApplicationChanged(e.target.value, quantity, type, subtype, rowId, part, sparePartRows)}
					value={application || ""}
				/>
			</div>
			<div className="spare-part-quantity">
				<Input 
					className="quantity-input" 
					type={'number'} 
					value={quantity || 1} 
					onBlur={(e) => handleQuantityChanged(application, e.target.value, type, subtype, rowId, part, sparePartRows)}
				/>
			</div>
			<div className="spare-part-maintenance-frequency spare-part-maintenance-frequency-frequencies-container">
				{getFrequenciesCheckboxes(frequencies, type, subtype, rowId, selected_frequencies)}
			</div>
		</div>
	);

	function getSparePartOptions(parts, type, subtype) {
		let options = [
			<option value={"none"} key={`none-${type}-${subtype}`}>
				Elija una opción
			</option>,
		];
		parts?.forEach((part) => {
			if (
				part.type === type &&
				(part.application === subtype || subtype === "other")
			) {
				options.push(
					<option
						value={part.internal_code}
						key={`${type}-${subtype}-${part.internal_code}`}
					>
						{`${part.internal_code} ${part.brand} ${part.model}`}
					</option>
				);
			}
		});
		if (options.length === 1) {
			options = [];
			options.push(
				<option value={"none"} key={`none-${type}-${subtype}`}>
					No hay opciones para este tipo
				</option>
			);
		}
		return options;
	}

	function getFrequenciesCheckboxes(frequencies, type, subtype, rowId, selected_frequencies) {
		return frequencies.map((freq) => {
			const key = `check-${type}-${subtype}-${rowId}-${freq.id}`;
			const checked = selected_frequencies.find(selFreq => selFreq?.frequency === freq?.frequency) || false;
			return (
				<div className="spare-part-maintenance-column" key={freq.id}>
					<label>{freq.id}</label>
					<Checkbox
						key={key}
						name={key}
						handleCheckboxSelected={(name, isChecked) => {
							handleFrequencySelected(
								type,
								subtype,
								rowId,
								name,
								freq,
								isChecked
							);
						}}
						isChecked={checked}
					></Checkbox>
				</div>
			);
		});
	}

	function handleSparePartSelected(internal_code, type, subtype, rowId, application, quantity, parts, sparePartRows) {
		const sparePart = parts.find((part) => part.internal_code === internal_code)
		const rows = [...sparePartRows];
		const row = findRow(rows, type, subtype, rowId)
		if (!row) {
			rows.push(createNewRow(type, subtype, rowId, sparePart, application, quantity, []))
		} else {
			row.part = sparePart;
		}
		setSparePartRows(rows);
	}

	function handleApplicationChanged(application, quantity, type, subtype, rowId, part, sparePartRows) {
		const rows = [...sparePartRows];
		const row = findRow(rows, type, subtype, rowId)
		if (!row) {
			rows.push(createNewRow(type, subtype, rowId, part, application, quantity, []))
		} else {
			row.application = application;
		}
		setSparePartRows(rows);
	}

	function handleQuantityChanged(application, quantity, type, subtype, rowId, part, sparePartRows) {
		const rows = [...sparePartRows];
		const row = findRow(rows, type, subtype, rowId)
		if (!row) {
			rows.push(createNewRow(type, subtype, rowId, part, application, quantity, []))
		} else {
			row.quantity = parseInt(quantity);
		}
		setSparePartRows(rows);
	}

	function handleFrequencySelected(
		type,
		subtype,
		rowId,
		checkboxName,
		frequency,
		isChecked
	) {
		const rows = [...sparePartRows];
		if (!isChecked) {
			let row = findRow(rows, type, subtype, rowId)
			const rowFreqs = row?.frequencies?.map(freq => freq.frequency);
			if (row && rowFreqs.includes(frequency.frequency)) {
				const indexOfFreq = rowFreqs.indexOf(frequency.frequency);
				row.frequencies.splice(indexOfFreq, 1);
			}
		} else {
			const row = findRow(rows, type, subtype, rowId)
			if (!row) {
				rows.push(createNewRow(type, subtype, rowId, part, application, quantity, [frequency]));
			} else if (!row.frequencies.includes(frequency)) {
				row.frequencies.push(frequency);
			}
		}
		setSparePartRows(rows);
	}

	function findRow(rows, type, subtype, rowId) {
		return rows.find(
			(row) =>
				row.type === type &&
				row.subtype === subtype &&
				parseInt(row.rowId) === parseInt(rowId)
		);
	}

	function createNewRow(type, subtype, rowId, part, application, quantity, frequencies) {
		return {
			type: type,
			subtype: subtype,
			rowId: rowId,
			part: part,
			application: application ? application : '',
			quantity: quantity ? quantity : 1,
			frequencies: frequencies,
		}
	}
};

export default SparePartsSection;