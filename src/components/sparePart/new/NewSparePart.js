import React from "react";
import { useParams } from "react-router-dom";
import "./NewSparePart.scss";

import NewForm from "components/newForm/NewFrom";

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
						required: true,
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
						required: true,
					},
					{
						label: "Marca",
						name: "brand",
						type: "text",
						value: "", 
						required: true,
					},
				],
			},
			{
				columns: [
					{
						label: "Modelo",
						name: "model",
						type: "text",
						value: "", 
						required: true,
					},
					{
						label: "Código interno",
						name: "internal_code",
						type: "text",
						value: "",
						placeholder: "Código del programa", 
						required: true,
					},
					{
						label: "Código externo",
						name: "external_code",
						type: "text",
						value: "",
						placeholder: "Código del fabricante",
					},
				],
			},
			{
				columns: [
					{
						label: "Precio [USD]",
						name: "price",
						type: "number",
						value: "",
						placeholder: "Precio",
					},
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
