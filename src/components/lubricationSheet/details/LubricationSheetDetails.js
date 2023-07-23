import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./LubricationSheetDetails.scss";
import SparePartsSections from "../SparePartTypes.json";

import TableHeader from "components/table/TableHeader";
import Table from "components/table/Table";
import Button from "components/button/Button";

const api = require("api/Api").default;

const NewLubricationSheet = () => {
	const { code } = useParams(); // Equipment code
	const newLubricationSheetHref = "/lubricationsheet/new/" + code;

	/**
	 * [{
	 *  type: section.type,
	 *  subtype: subtype.subtype,
	 *  rowId: 1,
	 *  part: null,
	 *  application: "",
	 *  quantity: 1,
	 *  frequencies: [{id:1, frequency:250}],
	 * }]
	 */
	const [sparePartRows, setSparePartRows] = useState([]);
	const [lubricationSheet, setLubricationSheet] = useState(null);
	const [equipment, setEquipment] = useState(null);
	const [frequencies, setFrequencies] = useState([]);
	const [filteredFrequencies, setFilteredFrequencies] = useState([400, 800, 1200, 1600, 2000]);

	const title = `Planilla de mantenimiento para ${equipment?.brand} ${equipment?.model} ${equipment?.code} `;

	useEffect(() => {
		fetchLubricationSheet();
	}, []);

	useEffect(() => {
		if (!lubricationSheet) return;
		setEquipment(
			lubricationSheet.equipments.find(
				(equipment) => equipment.code === code
			)
		);
		setSparePartRows(getSparePartRowsFromSheet(lubricationSheet, filteredFrequencies));
		setFrequencies(getUniqueFrequenciesFromSheet(lubricationSheet));
	}, [lubricationSheet, filteredFrequencies]);

	return equipment ? (
		<div className="sheet-details-page">
			<div className="sheet-details-header">
				<div className="title-header">
					<h3>{title}</h3>
					<Button isLink={true} href={newLubricationSheetHref} styles={['outlined']}>
						<i className="fas fa-pencil" aria-hidden="true" />
					</Button>
					<FrequencySelector
						filteredFrequencies={filteredFrequencies}
						setFilteredFrequencies={setFilteredFrequencies}
						uniqueFrequencies={frequencies}
					/>
				</div>
			</div>
			<div className="sheet-details-wrapper">
				{SparePartsSections.map((section) => {
					const rowsForSection = sparePartRows.filter(
						(row) => row.type === section.type
					);
					if (rowsForSection && rowsForSection.length > 0) {
						return (
							<SheetSparePartsSection
								key={section.type}
								rowsForSection={rowsForSection}
								section={section}
								frequencies={filteredFrequencies}
							/>
						);
					}
				})}
			</div>
		</div>
	) : (
		<></>
	);

	async function fetchLubricationSheet() {
		try {
			const response = await api.getLubricationSheetByEquipmentCode(code);
			setLubricationSheet(response);
		} catch (error) {
			console.log(error);
		}
	}

	function getSparePartRowsFromSheet(lubricationSheet, filteredFrequencies) {
		return lubricationSheet.lubrication_sheet_spare_parts.map(
			(sheet_spare_part) => {
				return {
					spare_part: sheet_spare_part.spare_part,
					type: sheet_spare_part.spare_part.type,
					subtype: sheet_spare_part.spare_part.application,
					application: sheet_spare_part.application,
					quantity: sheet_spare_part.quantity,
					frequencies: sheet_spare_part.frequencies
						.map(freq => freq.frequency)
						.filter(freq => filteredFrequencies.includes(freq)),
				};
			}
		);
	}

	function getUniqueFrequenciesFromSheet(lubricationSheet) {
		const frequencies = new Set();
		lubricationSheet.lubrication_sheet_spare_parts.forEach((part) => {
			part.frequencies.forEach((frequency) => {
				frequencies.add(frequency.frequency);
			});
		});
		return Array.from(frequencies).sort((a, b) => a - b);
	}
};

const SheetSparePartsSection = (props) => {
	const [showSection, setShowSection] = useState(true);
	const { title, type, icon, subtypes } = props.section;
	const { rowsForSection, frequencies } = props;

	const toggleSection = () => {
		setShowSection(!showSection);
	};

	return (
		<div className="sheet-spare-part-section">
			<h4 className="sheet-spare-part-section-title" onClick={toggleSection}>
				<i className={icon} aria-hidden="true" /> {` ${title} `}
				<i
					className={`fa-solid fa-2xs ${
						showSection ? "fa-chevron-down" : "fa-chevron-right"
					}`}
				/>
			</h4>
			<div
				className={`sheet-spare-part-section-subsections ${
					showSection ? "show" : "hide"
				}`}
			>
				{showSection &&
					getSubsections(
						subtypes,
						type,
						title,
						rowsForSection,
						frequencies
					)}
			</div>
		</div>
	);

	function getSubsections(
		subtypes,
		type,
		title,
		rowsForSection,
		totalFrequencies
	) {
		return subtypes.map((subtype) => {
			const rowsForSubtype = rowsForSection.filter(
				(row) => row.subtype === subtype.subtype
			);
			if (rowsForSubtype && rowsForSubtype.length > 0) {
				return (
					<Table
						key={`table-${subtype.subtype}`}
						className={"details-table"}
						columns={getTableColumns(title, totalFrequencies)}
						data={getTableData(rowsForSubtype, totalFrequencies)}
						showSearchBar={false}
						style={["single"]}
					/>
				);
			}
		});
	}

	function getTableColumns(title, totalFrequencies) {
		const frequencyColumns = totalFrequencies.map((freq) => {
			return { [freq]: freq, style: ["center-text", "bold"] };
		});
		return [
			{ title: title, style: ["center-text", "fixed-width-30"] },
			{
				application: "Aplicación",
				style: ["center-text", "fixed-width-20"],
			},
			{ quantity: "Cantidad", style: ["center-text", "fixed-width-10"] },
			...frequencyColumns,
		];
	}

	function getTableData(rowsForSubtype, totalFrequencies) {
		return rowsForSubtype.map((row) => {
			const part = row.spare_part;
			const rowTitle = `${part.internal_code} ${part.brand} ${part.model}`;
			const rowObj = {
				title: rowTitle,
				application: row.application,
				quantity: row.quantity,
				...getFrequeniesForPart(row.frequencies, totalFrequencies),
			};
			return rowObj;
		});
	}

	function getFrequeniesForPart(selectedFrequencies, totalFrequencies) {
		const freqs = {};
		totalFrequencies.forEach((freq) => {
			freqs[freq] = selectedFrequencies.includes(freq) ? "C" : "";
		});
		return freqs;
	}
};

const FrequencySelector = (props) => {
	const [startIndex, setStartIndex] = useState(0);
	const FILTER_SIZE = 5;

	const {filteredFrequencies, setFilteredFrequencies, uniqueFrequencies} = props;
	const indicator = `${filteredFrequencies[0]} - ${filteredFrequencies[filteredFrequencies.length - 1]}`

	useEffect(() => {
		if (uniqueFrequencies.length < FILTER_SIZE) {
		  	setStartIndex(0);
		}
	}, [uniqueFrequencies]);

	useEffect(() => {
		setFilteredFrequencies(uniqueFrequencies.slice(startIndex, startIndex + FILTER_SIZE));
	}, [startIndex]);

	const onLeftClicked = (e) => {
		if (startIndex > 0) {
			setStartIndex(startIndex - 1);
		}
	}

	const onRightClicked = (e) => {
		if (startIndex < uniqueFrequencies.length - FILTER_SIZE) {
			setStartIndex(startIndex + 1);
		}
	}

	return (
		<div className="frequency-selector">
			<div className={`left-button ${startIndex === 0 ? "disabled" : ""}`} onClick={onLeftClicked}>
				<i className={`far fa-chevron-left`}/>
			</div>
			<div className="indicator-span">
				<span className="frequency-indicator">{indicator}</span>
			</div>
			<div className={`right-button ${startIndex + FILTER_SIZE === uniqueFrequencies.length ? "disabled" : ""}`} onClick={onRightClicked}>
				<i className={`far fa-chevron-right`}/>
			</div>
		</div>	
	);
}

export default NewLubricationSheet;
