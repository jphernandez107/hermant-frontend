import React from "react";
import Select from "../../select/Select";
import "./ExistingSheetSelectionSection.scss"

const ExistingSheetSelectionSection = (props) => {
    const {lubricationSheets} = props

    return (
        <div className="existing-sheet-selection">
            <h4 className="existing-sheet-selection-title">
                {`Seleccionar planilla de otro equipo`}
            </h4>
            {getExistingSheetSelect()}
        </div>
    )

    function getExistingSheetSelect() {
		return <Select>{getOptionsForSelect()}</Select>;
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
				existingSheets.push(
					<option value={sheet.id} key={equip.code}>
						{`${equip.designation} ${equip.brand} ${equip.model} ${equip.code}`}
					</option>
				);
			});
		});
		return existingSheets;
	}
}

export default ExistingSheetSelectionSection;