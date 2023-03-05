import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./NewConstructionSite.scss";

import NewForm from "../../newForm/NewFrom";
const api = require("../../../api/Api");

const NewConstructionSite = () => {
	const { code } = useParams();
	const headerTitle = "Nueva Obra";
	const headerSubtitle = "Ingrese los datos de la obra que desea agregar";

	const form = {
		header_title: headerTitle,
		header_subtitle: headerSubtitle,
		action: "site/new",
		method: "POST",
		go_to_after_submit: "/site/list",
		rows: [
			{
				columns: [
					{
						label: "Nombre",
						name: "name",
						type: "text",
						value: "",
					},
				],
			},
			{
				columns: [
					{
						label: "Código",
						name: "code",
						type: "text",
						value: "",
					},
					{
						label: "Provincia",
						name: "province",
						type: "text",
						value: "",
					},
					{
						label: "Localidad",
						name: "district",
						type: "text",
						value: "",
					},
				],
			},
			{
				columns: [
					{
						label: "Inicio",
						name: "init_date",
						type: "text",
						placeholder: "Fecha de inicio",
						value: "",
					},
					{
						label: "Fin",
						name: "finish_date",
						type: "text",
						placeholder: "Fecha de finalización",
						value: "",
					},
					{
						label: "Altura SNM [m]",
						name: "altitude",
						type: "number",
						placeholder: "Altura en metros",
						value: 0,
					},
				],
			},
			{
				columns: [
					{
						label: "Temperatura máxima [°C]",
						name: "max_temp",
						type: "number",
						placeholder: "Máxima promedio",
						value: 0,
					},
					{
						label: "Temperatura mínima [°C]",
						name: "min_temp",
						type: "number",
						placeholder: "Mínima promedio",
						value: 0,
					},
					{
						label: "Distancia [Km]",
						name: "distance",
						type: "number",
						value: 0,
					},
				],
			},
			{
				columns: [
					{
						label: "Observaciones",
						name: "observations",
						type: "text",
						rows: 3,
						value: "",
					},
				],
			},
		],
	};

	const [site, setSite] = useState(null)
	const [formData, setFormData] = useState(form)

	useEffect(() => {
		fetchSite();
	}, []);

	useEffect(() => {
		updateFormData(site);
	}, [site]);

	return <NewForm form_data={formData}></NewForm>;

	async function fetchSite() {
		try {
			const response = await api.getConstructionSiteByCode(code);
			setSite(response);
		} catch (error) {
			console.log(error);
		}
	}

	function updateFormData(site) {
		if (!site) return;
		const updatedFormData = { ...formData };
		updatedFormData.action = "site/edit?code=" + site.code;
		updatedFormData.method = "PUT";
        updatedFormData.go_to_after_submit = "/site/details/" + site.code;
		updatedFormData.rows.forEach((row) => {
			row.columns.forEach((column) => {
				const value = site[column.name];
				column.value = value || column.value;
			});
		});
		setFormData(updatedFormData);
	}
};

export default NewConstructionSite;
