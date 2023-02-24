import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./LubricationSheetDetails.css";
import SparePartsSections from "../SparePartTypes.json";

import TableHeader from "../../table/TableHeader";
import Table from "../../table/Table";

const api = require("../../../api/Api");

const NewLubricationSheet = () => {
	const { code } = useParams(); // Equipment code
    
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
		setSparePartRows(getSparePartRowsFromSheet(lubricationSheet));
		setFrequencies(getUniqueFrequenciesFromSheet(lubricationSheet));
	}, [lubricationSheet]);

	return equipment ? (
		<div className="sheet-details-page">
			<div className="sheet-details-header">
				<TableHeader
					showSearchBar={false}
				>{`Planilla de mantenimiento para ${equipment?.designation} ${equipment?.brand} ${equipment?.model} ${equipment?.code} `}</TableHeader>
			</div>
			<div className="sheet-details-wrapper">
                {SparePartsSections.map((section) => {
                    const rowsForSection = sparePartRows.filter((row) => row.type === section.type)
                    if (rowsForSection && rowsForSection.length > 0) {
                        return <SheetSparePartsSection
                            key={section.type}
                            rowsForSection={rowsForSection}
                            section={section}
                            frequencies={frequencies}
                        />
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

	function getSparePartRowsFromSheet(lubricationSheet) {
		return lubricationSheet.lubrication_sheet_spare_parts.map(
			(sheet_spare_part) => {
				return {
					spare_part: sheet_spare_part.spare_part,
                    type: sheet_spare_part.spare_part.type,
                    subtype: sheet_spare_part.spare_part.application,
					application: sheet_spare_part.application,
					quantity: sheet_spare_part.quantity,
					frequencies: sheet_spare_part.frequencies.map((freq) => freq.frequency),
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

    const [showSection, setShowSection] = useState(true)
    const { title, type, icon, subtypes } = props.section;
	const { rowsForSection, frequencies } = props;

    const toggleSection = () => {
        setShowSection(!showSection)
    }

    return (
        <div className="sheet-spare-part-section">
            <h4 className="sheet-spare-part-section-title">
                <i className={icon} aria-hidden="true" /> {` ${title} `}<i className={`fa-solid fa-2xs ${showSection ? "fa-chevron-down" : "fa-chevron-right"}`} onClick={toggleSection}/>
            </h4>
            <div className={`sheet-spare-part-section-subsections ${showSection ? "show" : "hide"}`}>
                {showSection && getSubsections(subtypes, type, title, rowsForSection, frequencies)}
            </div>
        </div>
    )

    function getSubsections(subtypes, type, title, rowsForSection, totalFrequencies) {
        return subtypes.map((subtype) => {
            const rowsForSubtype = rowsForSection.filter((row) => row.subtype === subtype.subtype)
            if (rowsForSubtype && rowsForSubtype.length > 0) {
                return (
                    <Table
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
            return {[freq]: freq, style: ["center-text", "bold"]}
        });
        return [
            {title: title, style: ["center-text", "fixed-width-30"]},
            {application: 'Aplicación', style: ["center-text", "fixed-width-20"]},
            {quantity: 'Cantidad', style: ["center-text", "fixed-width-10"]},
            ...frequencyColumns
        ];
    }

    function getTableData(rowsForSubtype, totalFrequencies) {
        return rowsForSubtype.map((row) => {
            const part = row.spare_part
            const rowTitle = `${part.internal_code} ${part.brand} ${part.model}`
            const rowObj = {
                title: rowTitle,
                application: row.application,
                quantity: row.quantity,
                ...getFrequeniesForPart(row.frequencies, totalFrequencies)
            }
            return rowObj;
        })
    }

    function getFrequeniesForPart(selectedFrequencies, totalFrequencies) {
        const freqs = {}
        totalFrequencies.forEach((freq) => {
            freqs[freq] = selectedFrequencies.includes(freq) ? "C" : ""
        })
        return freqs
    }
    
}

export default NewLubricationSheet;