import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./NewLubricationSheet.scss";
import SparePartsSections from "./SparePartTypes.json";

import TableHeader from "components/table/TableHeader";

import MaintenanceFrequenciesSection from "./maintenanceFrequenciesSection/MaintenanceFrequenciesSection";
import ExistingSheetSelectionSection from "./existingSheetSelectionSection/ExistingSheetSelectionSection";
import SparePartsSection from "./sparePartSection/SparePartsSection";
import Button from "components/button/Button";

const api = require("api/Api").default;

const NewLubricationSheet = () => {
	const { code } = useParams();
	const navigate = useNavigate();

	const initialSparePartRows = SparePartsSections.flatMap((section) => {
		return section.subtypes.map((subtype) => {
			return {
				type: section.type,
				subtype: subtype.subtype,
				rowId: 1,
				part: null,
				application: "",
				quantity: 1,
				frequencies: [],
			};
		});
	});

	const initialMaintenance = [
		{ id: 1, frequency: 0 }, //{id:1, freq:250}
	]

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
	const [sparePartRows, setSparePartRows] = useState(initialSparePartRows);

	const [spareParts, setSpareParts] = useState([]);
	const [lubricationSheets, setLubricationSheets] = useState([]);
	const [equipment, setEquipment] = useState(null);

	const [maintenanceFrequencies, setMaintenanceFrequencies] = useState(initialMaintenance);

	const [selectedLubricationSheet, setSelectedLubricationSheet] = useState();

	useEffect(() => {
		fetchSpareParts();
		fetchEquipment();
		fetchLubricationSheets();
	}, []);

	useEffect(() => {
		setSparePartRowsFromExistingLubricationSheet(selectedLubricationSheet);
	}, [selectedLubricationSheet])

	useEffect(() => {
		const maintFreqs = maintenanceFrequencies.map(freq => freq.frequency);
		sparePartRows.forEach(row => {
			row.frequencies = row.frequencies.map(rowFreq => {
				return maintenanceFrequencies.find(freq => freq.frequency === rowFreq.frequency)
			});
		});
		setSparePartRows(sparePartRows);
	}, [maintenanceFrequencies]);

	const onSubmitButtonClicked = (e) => {
		const url = "lubricationsheet/sparepart/add";
		const body = getLubricationSheetSparePartFromRows(code, sparePartRows);
		console.log("🚀 ~ file: NewLubricationSheet.js:84 ~ onSubmitButtonClicked ~ body:", body)
		api.postNew(url, body)
			.then(() => {
				navigate("/equipment/details/" + code);
			})
			.catch((error) => console.log(error));
	};

	const onSharedSheetButtonPressed = (e) => {
		const body = {
			equipment_code: code,
			lubrication_sheet_id: selectedLubricationSheet.id
		}
		api.addLubricationSheetToEquipment(body)
			.then(() => {
				navigate("/equipment/details/" + code);
			})
			.catch((error) => console.log(error));
	}

	return spareParts.length > 0 ? (
		<div className="details-page">
			<div className="details-header">
				<TableHeader
					showSearchBar={false}
				>{`Planilla de mantenimiento para ${equipment?.designation} ${equipment?.brand} ${equipment?.model} ${equipment?.code} `}</TableHeader>
			</div>
			<div className="details-wrapper">
				{
					<ExistingSheetSelectionSection
						lubricationSheets={lubricationSheets}
						selectedLubricationSheet={selectedLubricationSheet}
						setSelectedLubricationSheet={setSelectedLubricationSheet}
						onSharedSheetButtonPressed={onSharedSheetButtonPressed}
					/>
				}

				{
					<MaintenanceFrequenciesSection
						maintenanceFrequencies={maintenanceFrequencies}
						setMaintenanceFrequencies={setMaintenanceFrequencies}
					/>
				}

				{SparePartsSections.map((section) => (
					<SparePartsSection
						key={section.title}
						sparePartRows={sparePartRows}
						setSparePartRows={setSparePartRows}
						section={section}
						parts={spareParts}
						frequencies={maintenanceFrequencies}
					/>
				))}
				<div className="submit-button">
					<Button onClick={(e) => onSubmitButtonClicked(e)}>
						<i
							className={"fa-solid fa-floppy-disk"}
							aria-hidden="true"
						/>
						{" Guardar"}
					</Button>
				</div>
			</div>
		</div>
	) : (
		<></>
	);

	/**
	 *
	 * @param {*} sparePartRows
	 * @returns body:
	 * {
	 *  equipment_code: 23,
	 *  frequencies; [250, 500, 1000],
	 *  spare_parts: [
	 *      { "spare_part_id": 50, "quantity": 3, "application": "Primary", "frequencies": [250, 500]},
	 *      { "spare_part_id": 51, "quantity": 6, "application": "Secondary", "frequencies": [250]},
	 *  ]
	 * }
	 */
	function getLubricationSheetSparePartFromRows(
		equipment_code,
		sparePartRows
	) {
		const body = {
			equipment_code: equipment_code,
		};
		body.frequencies = [
			...new Set(
				sparePartRows.flatMap((row) =>
					row.frequencies.flatMap((f) => f.frequency)
				)
			),
		];
		const spare_parts = [];
		sparePartRows.forEach((row) => {
			if (row.part) {
				spare_parts.push({
					spare_part_id: row.part.id,
					quantity: row.quantity,
					application: row.application,
					frequencies: row.frequencies.flatMap((f) => f.frequency),
				});
			}
		});
		body.spare_parts = spare_parts;
		return body;
	}

	function setSparePartRowsFromExistingLubricationSheet(lubricationSheet) {
		let uniqueFrequencies = [];
		let rows = initialSparePartRows;
		if (lubricationSheet) {
			rows = lubricationSheet.lubrication_sheet_spare_parts.map((part, index) => {
				part.frequencies.forEach(freq => {
					if (!uniqueFrequencies.find(uFreq => uFreq.frequency === freq.frequency)) {
						uniqueFrequencies.push(freq);
					}
				});
				return {
					type: part.spare_part.type,
					subtype: part.spare_part.application,
					rowId: index + 1,
					spare_part_id: part.spare_part_id,
					part: part.spare_part,
					application: part.application,
					quantity: part.quantity,
					frequencies: part.frequencies,
				}
			});
		}
		setFrequenciesFromExistingLubricationSheet(uniqueFrequencies)
		setSparePartRows(rows)
	}

	function setFrequenciesFromExistingLubricationSheet(uniqueFrequencies) {
		uniqueFrequencies.sort((a, b) => a.frequency - b.frequency);
		uniqueFrequencies = uniqueFrequencies.map((freq, index) => {
			return {
				id: index + 1,
				frequency: freq.frequency
			}
		})
		if (uniqueFrequencies.length > 0)
			setMaintenanceFrequencies(uniqueFrequencies)
		else 
			setMaintenanceFrequencies(initialMaintenance)
	}

	async function fetchEquipment() {
		try {
			const response = await api.getEquipmentByCode(code);
			setEquipment(response);
		} catch (error) {
			console.log(error);
		}
	}
	async function fetchSpareParts() {
		try {
			const response = await api.getSparePartList();
			setSpareParts(response);
		} catch (error) {
			console.log(error);
		}
	}
	async function fetchLubricationSheets() {
		try {
			const response = await api.getLubricationSheetList();
			setLubricationSheets(response);
		} catch (error) {
			console.log(error);
		}
	}
};

export default NewLubricationSheet;
