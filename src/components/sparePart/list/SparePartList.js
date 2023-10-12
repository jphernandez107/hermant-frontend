import React, { useEffect, useState } from "react";
import "./SparePartList.scss";

import Button from "components/button/Button";
import List from "components/list/List";
import ProtectedComponent from "components/protectedComponent/ProtectedComponent";
import { UserRole } from "context/Context";

const api = require("api/Api").default;

const SparePartList = () => {
	const [parts, setParts] = useState([]);
	const [loadingState, setLoadingState] = useState("Buscando repuestos...")

	useEffect(() => {
		fetchParts();
	}, []);

	const columns = [
		{ internal_code: "Código Interno", isFilterable: true },
		{ external_code: "Código Externo", isFilterable: true },
		{ type: "Tipo", isFilterable: true },
		{ application: "Aplicación", isFilterable: true },
		{ brand: "Marca", isFilterable: true },
		{ model: "Modelo", isFilterable: true },
		{ total_equipments: "Equipos", isFilterable: true },
		{ stock: "Stock", isFilterable: true },
		{ observations: "Observaciones", isFilterable: true },
	];

	return (
		<List 
			table_columns={columns} 
			table_data={parts}
			set_table_data={setParts} 
			title={"Repuestos"}
			loadingState={loadingState}
		>
			<ProtectedComponent roleNeeded={UserRole.ENGINEER}>
				<Button isLink={true} href={`new`}>
					<i className="fas fa-plus" aria-hidden="true" /> Nuevo Repuesto
				</Button>
			</ProtectedComponent>
		</List>
	);

	async function fetchParts() {
		try {
			const response = await api.getSparePartList();
			console.log("🚀 ~ file: SparePartList.js:39 ~ fetchParts ~ response:", response)
			response.map((part) => {
				part.total_equipments = getEquipmentCountFromLubricationSheets(part.lubrication_sheet_spare_parts);
			});
			setParts(response);
		} catch (error) {
			console.log(error);
		}
		setLoadingState(null);
	}

	function getEquipmentCountFromLubricationSheets(lubrication_sheet_spare_parts) {
		if (!lubrication_sheet_spare_parts) return 0;
		let count = 0;
		lubrication_sheet_spare_parts.forEach(lubricationSheetSparePart => {
			count += lubricationSheetSparePart.lubrication_sheet.equipments.length;
		});
		return count;
	}
};

export default SparePartList;
