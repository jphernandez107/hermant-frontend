import React, { useEffect, useState } from "react";
import "./MaintenanceRow.scss";
import "react-datepicker/dist/react-datepicker.css";

import Select from "components/select/Select";
import Input from "components/input/Input";

const MaintenanceRow = (props) => {
	const { part, application, quantity, selectedFrequency } = props;
	const { parts, type, subtype, sparePartRows, rowId } = props;


    const initialSelectedPart = part && part.frequencies && part.frequencies.includes(parseInt(selectedFrequency)) ? part : undefined
	const [selectedPart, setSelectedPart] = useState(initialSelectedPart);
    const [selectedQuantity, setSelectedQuantity] = useState(quantity)

    useEffect(() => {
        setSelectedPart(part && part.frequencies && part.frequencies.includes(parseInt(selectedFrequency)) ? part : undefined)
    }, [selectedFrequency])

    useEffect(() => {
        const row = sparePartRows.find((r) => r.rowId === rowId)
        if (row) row.replace = selectedPart ? true : false
    }, [selectedPart])

	return (
		<div className="maintenance-row" key={`${type}-${subtype}`}>
			<div className="maintenance-row-type">
				<Select
					className="type-select"
					onChange={(e) =>
						handleSparePartSelected(e.target.value, rowId, parts, sparePartRows)
					}
                    value={
						selectedPart ? selectedPart.id : "none"
					}
				>
					{getSparePartOptions(parts, type, subtype)}
				</Select>
			</div>
			<div className="maintenance-row-application">
				<label>{application}</label>
			</div>
			<div className="maintenance-row-quantity">
                <Input 
                    className="quantity-input" 
                    type={'number'} 
                    max={selectedQuantity} 
                    value={selectedQuantity} 
                    onBlur={(e) => handleQuantityChanged(e, rowId, sparePartRows)}
                />
			</div>
			<div className="maintenance-row-internal-code maintenance-row-internal-code-container">
				<label>{part && part.internal_code}</label>
			</div>
		</div>
	);

    function getSparePartOptions(parts, type, subtype) {
        let options = [
            <option value={"none"} key={`none-${type}-${subtype}`}>
                No se cambia
            </option>,
        ];
        parts?.forEach((part) => {
            if (
                part.type === type &&
                (part.application === subtype || subtype === "other")
            ) {
                options.push(
                    <option
                        value={part.id}
                        key={`${type}-${subtype}-${part.id}`}
                    >
                        {`${part.brand} ${part.model} #${part.external_code}`}
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

	function handleSparePartSelected(id, rowId, parts, sparePartRows) {
        const row = sparePartRows.find((r) => r.rowId === rowId);
        const newPart = parts.find((sparePart) => parseInt(sparePart.id) === parseInt(id));
        row.part = newPart;
        setSelectedPart(newPart);
	}

    function handleQuantityChanged(e, rowId, sparePartRows) {
		const row = sparePartRows.find((r) => r.rowId === rowId);
        if (parseInt(quantity) > row.part.stock) e.target.value = row.part.stock
        row.quantity = e.target.value;
        setSelectedQuantity(quantity)
	}

};

export default MaintenanceRow;