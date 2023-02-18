import React from "react";
import { useParams } from "react-router-dom";
import "./NewConstructionSite.css";

import NewForm from "../../newForm/NewFrom";

const NewConstructionSite = () => {
	const { code } = useParams();
	const headerTitle = "Nueva Obra";
	const headerSubtitle = "Ingrese los datos de la obra que desea agregar";

	const form = {
		header_title: headerTitle,
		header_subtitle: headerSubtitle,
		action: "site/new",
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
					},
					{
						label: "Fin",
						name: "finish_date",
						type: "text",
						placeholder: "Fecha de finalización",
					},
					{
						label: "Altura SNM [m]",
						name: "altitude",
						type: "number",
						placeholder: "Altura en metros",
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
					},
					{
						label: "Temperatura mínima [°C]",
						name: "min_temp",
						type: "number",
						placeholder: "Mínima promedio",
					},
					{
						label: "Distancia [Km]",
						name: "distance",
						type: "number",
						value: "",
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

	return <NewForm form_data={form}></NewForm>;
};

export default NewConstructionSite;
