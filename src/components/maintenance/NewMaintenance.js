import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./NewMaintenance.scss";
import SparePartsSections from "components/lubricationSheet/SparePartTypes.json";
import "react-datepicker/dist/react-datepicker.css";

import TableHeader from "components/table/TableHeader";
import { getUniqueFrequenciesFromSheet } from "utils/utils";

import Button from "components/button/Button";

import MaintenanceConfiguration from "./maintenanceConfiguration/MaintenanceConfiguration";
import MaintenanceSection from "./maintenanceSection/MaintenanceSection";

const api = require("api/Api").default;

const NewLubricationSheet = () => {
	const { code } = useParams(); //Equipment code
	const navigate = useNavigate();

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

	const [spareParts, setSpareParts] = useState([]);
	const [lubricationSheet, setLubricationSheet] = useState([]);
	const [equipment, setEquipment] = useState(null);

	const [maintenanceFrequencies, setMaintenanceFrequencies] = useState([]);
	const [selectedFrequency, setSelectedFrequency] = useState();
	const [maintenanceDuration, setMaintenanceDuration] = useState(0);
	const [maintenanceDate, setMaintenanceDate] = useState(new Date());
	const [resetPartialHours, setResetPartialHours] = useState(false);

	const [canSave, setCanSave] = useState(false);

	useEffect(() => {
		fetchSpareParts();
		fetchLubricationSheet();
	}, []);

	useEffect(() => {
		setCanSave(selectedFrequency);
	}, [selectedFrequency]);

	const onSubmitButtonClicked = (e) => {
		const atLeastOnePart =
			sparePartRows.filter((row) => row.replace).length > 0;
		if (!atLeastOnePart) return;
		const url = "maintenance/new";
		const method = "POST";
		const body = getMaintenanceSparePartFromRows(
			code,
			sparePartRows,
			lubricationSheet.id,
			selectedFrequency,
			maintenanceDuration,
			maintenanceDate,
			resetPartialHours
		);
		api.postNew(url, body)
			.then(() => {
				navigate("/equipment/details/" + code);
			})
			.catch((error) => console.log(error));
	};

	return spareParts.length > 0 ? (
		<div className="maintenance-details-page">
			<div className="maintenance-details-header">
				<TableHeader
					showSearchBar={false}
				>{`Nuevo mantenimiento para ${equipment?.designation} ${equipment?.brand} ${equipment?.model} ${equipment?.code} `}</TableHeader>
			</div>
			<div className="maintenance-details-wrapper">
				{
					<MaintenanceConfiguration
						maintenanceFrequencies={maintenanceFrequencies}
						selectedFrequency={selectedFrequency}
						setSelectedFrequency={setSelectedFrequency}
						setMaintenanceDuration={setMaintenanceDuration}
						maintenanceDate={maintenanceDate}
						setMaintenanceDate={setMaintenanceDate}
						resetPartialHours={resetPartialHours}
						setResetPartialHours={setResetPartialHours}
					/>
				}

				{SparePartsSections.map((section) => {
					const filteredRows = sparePartRows.filter(
						(row) => row.type === section.type
					);
					if (filteredRows.length === 0) return;
					return (
						<MaintenanceSection
							key={section.type}
							sparePartRows={filteredRows}
							section={section}
							parts={spareParts}
							selectedFrequency={selectedFrequency}
						/>
					);
				})}
				<div className="maintenance-submit-button">
					<Button
						onClick={(e) => onSubmitButtonClicked(e)}
						disabled={!canSave}
					>
						<i className={"fa-solid fa-floppy-disk"} />
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
	 *  lubrication_sheet_id: 12,
	 *  maintenance_frequency: 400,
	 *  maintenance_duration: 15,
	 *  spare_parts: [
	 *      { "spare_part_id": 50, "quantity": 3, "application": "Primary", "frequencies": [250, 500]},
	 *      { "spare_part_id": 51, "quantity": 6, "application": "Secondary", "frequencies": [250]},
	 *  ]
	 * }
	 */
	function getMaintenanceSparePartFromRows(
		equipment_code,
		sparePartRows,
		sheet_id,
		frequency,
		duration,
		maintenanceDate,
		resetPartialHours
	) {
		const body = {
			equipment_code: equipment_code,
			lubrication_sheet_id: sheet_id,
			maintenance_frequency: frequency,
			maintenance_duration: duration,
			maintenance_date: maintenanceDate,
			reset_equipment_partial_hours: resetPartialHours
		};
		const spare_parts = [];
		sparePartRows.forEach((row) => {
			if (row.part && row.replace) {
				spare_parts.push({
					spare_part_id: row.part.id,
					quantity: row.quantity,
					application: row.application,
					frequencies: row.frequencies.flatMap((f) => f.frequency),
				});
			}
		});
		body.spare_parts = spare_parts;
		console.log(body);
		return body;
	}
	async function fetchSpareParts() {
		try {
			const response = await api.getSparePartList();
			setSpareParts(response);
		} catch (error) {
			console.log(error);
		}
	}
	async function fetchLubricationSheet() {
		try {
			const sheet = await api.getLubricationSheetByEquipmentCode(code);

			const uniqueFrequencies = getUniqueFrequenciesFromSheet(sheet);
			const equip = sheet.equipments.find((equip) => equip.code === code);
			const rows = sheet.lubrication_sheet_spare_parts.map(
				(row, index) => {
					row.spare_part.frequencies = row.frequencies.map((freq) =>
						parseInt(freq.frequency)
					);
					return {
						type: row.spare_part.type,
						subtype: row.spare_part.application,
						rowId: index,
						part: row.spare_part,
						application: row.application,
						quantity: row.quantity,
						frequencies: row.frequencies.map((freq) => {
							return {
								id: freq.id,
								frequency: freq.frequency,
							};
						}),
						replace: false,
					};
				}
			);
			setSparePartRows(rows);
			setMaintenanceFrequencies(uniqueFrequencies);
			setLubricationSheet(sheet);
			setEquipment(equip);
		} catch (error) {
			console.log(error);
		}
	}
};

export default NewLubricationSheet;
