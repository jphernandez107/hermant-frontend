import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ConstructionSiteList.scss";

import Button from "components/button/Button";
import List from "components/list/List";

const api = require("api/Api").default;

const ConstructionSiteList = () => {
	const [sites, setSites] = useState([]);
	const [loadingState, setLoadingState] = useState("Buscando obras...")

	useEffect(() => {
		fetchSites();
	}, []);

	const navigate = useNavigate();

	const columns = [
		{ code: "Código" },
		{ name: "Nombre", isFilterable: true },
		{ province: "Provincia", isFilterable: true },
		{ district: "Departamento", isFilterable: true },
		{ total_equipments: "Equipos", isFilterable: true },
		{ finish_date: "Fin", isFilterable: true },
		{ observations: "Observaciones", isFilterable: true },
	];

	function onRowClicked(code) {
		navigate("/site/details/" + code);
	}

	return (
		<List
			table_columns={columns}
			table_data={sites}
			set_table_data={setSites}
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
		try {
			const response = await api.getConstructionSiteList();
			response.map((site) => {
				site.total_equipments = site.equipments.length;
			});
			setSites(response);
		} catch (error) {
			console.log(error);
		}
		setLoadingState(null);
	}
};

export default ConstructionSiteList;
