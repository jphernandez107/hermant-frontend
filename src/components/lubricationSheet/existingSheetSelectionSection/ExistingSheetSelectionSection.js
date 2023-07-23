import React from "react";
import Select from "../../select/Select";
import "./ExistingSheetSelectionSection.scss"
import Button from "components/button/Button";

const ExistingSheetSelectionSection = (props) => {
    const {
		lubricationSheets, 
		selectedLubricationSheet,
		setSelectedLubricationSheet, 
		onSharedSheetButtonPressed,
		equipmentCode
	} = props

	const handleSelectChange = (e) => {
		const id = parseInt(e.target.value)
		setSelectedLubricationSheet(lubricationSheets.find(lub => parseInt(lub.id) === id))
	}

    return (
        <div className="existing-sheet-selection">
            <h4 className="existing-sheet-selection-title">
                {`Seleccionar planilla de otro equipo`}
            </h4>
			<div className="existing-sheet-selection-buttons">
            	{getExistingSheetSelect()}
				<Button 
					styles={['small']} 
					onClick={onSharedSheetButtonPressed}
					disabled={!selectedLubricationSheet}
				>
					Usar planilla compartida
				</Button>
			</div>
        </div>
    )

    function getExistingSheetSelect() {
		return (
			<Select onChange={handleSelectChange} value={selectedLubricationSheet ? selectedLubricationSheet.id : "none"}>
				{getOptionsForSelect()}
			</Select>
		);
	}

	function getOptionsForSelect() {
		let existingSheets = [
			<option value={"none"} key={"none"}>
				{'Elija un equipo para utilizar su planilla'}
			</option>,
		];
		lubricationSheets.forEach((sheet) => {
			if (sheet.equipments.length < 1)
				existingSheets.push(
					<option value={sheet.id} key={sheet.id}>
						{'Planilla sin equipo asignado'}
					</option>
				);
			sheet.equipments.forEach((equip) => {
				const current = `${equipmentCode === equip.code ? "[actual]" : ""}`;
				existingSheets.push(
					<option value={sheet.id} key={equip.code}>
						{`${equip.designation} ${equip.brand} ${equip.model} ${equip.code} ${current}`}
					</option>
				);
			});
		});
		return existingSheets;
	}
}

export default ExistingSheetSelectionSection;