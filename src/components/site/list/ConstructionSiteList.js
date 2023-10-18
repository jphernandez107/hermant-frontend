import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import "./ConstructionSiteList.scss";

import Button from "components/button/Button";
import List from "components/list/List";

const api = require("api/Api").default;

const ConstructionSiteList = () => {
	const navigate = useNavigate();

	const {
		data: sites = [],
		isLoading,
		isError,
		error,
		isSuccess,
	} = useQuery("sites", fetchSites);
	
	const loadingState = isLoading ? "Buscando obras..." : undefined

	const columns = [
		{ code: "Código", isSortable: true },
		{ name: "Nombre", isFilterable: true, isSortable: true },
		{ province: "Provincia", isFilterable: true, isSortable: true },
		{ district: "Departamento", isFilterable: true, isSortable: true },
		{ total_equipments: "Equipos", isFilterable: true, isSortable: true },
		{ finish_date: "Fin", isFilterable: true, isSortable: true },
		{ observations: "Observaciones", isFilterable: true, isSortable: true },
	];

	function onRowClicked(code) {
		navigate("/site/details/" + code);
	}

	return (
		<List
			table_columns={columns}
			table_data={sites}
			title={"Obras"}
			onRowClicked={onRowClicked}
			loadingState={loadingState}
		>
			<Button isLink={true} href={`new`}>
				<i className="fas fa-plus" aria-hidden="true" /> Nueva Obra
			</Button>
		</List>
	);

	async function fetchSites() {
		const response = await api.getConstructionSiteList();
		return response.map((site) => {
			site.total_equipments = site.equipments.length;
			return site;
		});
	}
};

export default ConstructionSiteList;
