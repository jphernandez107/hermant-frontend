import React from "react";
import { useParams } from "react-router-dom";
import "./NewSparePart.css";

import NewForm from "../../newForm/NewFrom";

const NewSparePart = () => {
	const { code } = useParams();
	const headerTitle = "Nuevo Repuesto";
	const headerSubtitle = "Ingrese los datos del repuesto que desea agregar";

	const form = {
		header_title: headerTitle,
		header_subtitle: headerSubtitle,
		action: "part/new",
		rows: [
			{
				columns: [
					{
						label: "Tipo",
						name: "type",
						type: "text",
						value: "",
						options: ["Aceite", "Filtro", "Líquido", "Uña"],
					},
					{
						label: "Marca",
						name: "brand",
						type: "text",
						value: "",
					},
					{
						label: "Modelo",
						name: "model",
						type: "text",
						value: "",
					},
				],
			},
			{
				columns: [
					{
						label: "Código interno",
						name: "internal_code",
						type: "text",
						value: "",
						placeholder: "Código del programa",
					},
					{
						label: "Código externo",
						name: "external_code",
						type: "text",
						value: "",
						placeholder: "Código del fabricante",
					},
					{
						label: "Precio [USD]",
						name: "price",
						type: "number",
						value: "",
						placeholder: "Precio",
					},
				],
			},
			{
				columns: [
					{
						label: "Link del producto",
						name: "detail_link",
						type: "text",
						placeholder: "Link a detalles",
					},
					{
						label: "Cantidad",
						name: "stock",
						type: "number",
						placeholder: "Stock actual",
					},
					{
						label: "Aplicación",
						name: "application",
						type: "text",
						placeholder: "Ej: Filtro de Aire",
						options: [
							"Aire",
							"Aceite",
							"Combustible",
							"Motor",
							"Hidráulico",
							"Otro",
						],
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

export default NewSparePart;
