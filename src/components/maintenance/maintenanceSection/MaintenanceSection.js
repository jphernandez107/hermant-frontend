import React, { useEffect, useState } from "react";
import "./MaintenanceSection.css";
import "react-datepicker/dist/react-datepicker.css";

import MaintenanceRow from "../maintenanceRow/MaintenanceRow";

const MaintenanceSection = (props) => {
	const { parts, sparePartRows, selectedFrequency } = props;
	const { title, type, icon, subtypes } = props.section;

	const [showSection, setShowSection] = useState(true);

	const toggleSection = () => {
		setShowSection(!showSection);
	};

	return (
		<div className="maintenance-section" key={type}>
			<h4 className="maintenance-section-title">
				<i className={icon} aria-hidden="true" /> {` ${title} `}
				<i
					className={`fa-solid fa-2xs ${
						showSection ? "fa-chevron-down" : "fa-chevron-right"
					}`}
					onClick={toggleSection}
				/>
			</h4>
			<div
				className={`maintenance-section-subsections ${
					showSection ? "show" : "hide"
				}`}
			>
				{showSection &&
					getSubsections(subtypes, type, title, parts, sparePartRows, selectedFrequency)}
			</div>
		</div>
	);

	function getSubsections(subtypes, type, title, parts, sparePartRows, selectedFrequency) {
		return subtypes.map((subtype) => {
            const filteredRows = sparePartRows.filter(
                (row) => row.subtype === subtype.subtype
            );
            if (filteredRows.length === 0) return;
			return (
				<div className="maintenance-subsection" key={subtype.subtype}>
					<div className="maintenance-subsection-header">
						<h5>{subtype.title}</h5>
					</div>
					<div className="maintenance-container">
						<div className="maintenance-title-container">
							<label className="maintenance-type-title">
								{title}
							</label>
							<label className="maintenance-application-title">
								Aplicación
							</label>
							<label className="maintenance-quantity-title">
								Cantidad
							</label>
							<label className="maintenance-internal-code-title">
								Código Interno
							</label>
						</div>
						{getSparePartRows(
							subtype.subtype,
							type,
							parts,
							sparePartRows,
                            selectedFrequency
						)}
					</div>
				</div>
			);
		});
	}

	function getSparePartRows(subtype, type, parts, sparePartRows, selectedFrequency) {
		const rows = sparePartRows.filter(
			(row) => row.subtype === subtype && row.type === type
		);
		if (rows && rows.length > 0) {
			return rows.map((row) => {
				return (
					<MaintenanceRow
						part={row.part}
						application={row.application}
						quantity={row.quantity}
						selected_frequencies={row.frequencies}
						parts={parts}
						type={type}
						subtype={row.subtype}
						sparePartRows={sparePartRows}
						key={`${type}-${subtype}-${row.rowId}`}
						rowId={row.rowId}
                        selectedFrequency={selectedFrequency}
					/>
				);
			});
		} else {
			return <></>;
		}
	}
};

export default MaintenanceSection;