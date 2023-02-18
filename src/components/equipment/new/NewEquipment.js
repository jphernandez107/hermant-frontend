import React from "react";
import { useParams } from "react-router-dom";
import "./NewEquipment.css";

import NewForm from "../../newForm/NewFrom";

const NewEquipment = () => {
	const { code } = useParams();
	const headerTitle = "Nuevo equipo";
	const headerSubtitle = "Ingrese los datos del equipo que desea agregar";

	const form = {
		header_title: headerTitle,
		header_subtitle: headerSubtitle,
		action: "equipment/new",
		rows: [
			{
				columns: [
					{
						label: "Designación",
						name: "designation",
						type: "text",
						value: "",
					},
				],
			},
			{
				columns: [
					{
						label: "Marca",
						name: "brand",
						type: "text",
						value: "",
						options: [
							"Komatsu",
							"Caterpillar",
							"John Deere",
							"Iveco",
						],
					},
					{ label: "Modelo", name: "model", type: "text", value: "" },
					{
						label: "Origen",
						name: "origin",
						type: "text",
						value: "",
					},
				],
			},
			{
				columns: [
					{ label: "Patente", name: "code", type: "text", value: "" },
					{
						label: "Número de serie",
						name: "serial_number",
						type: "text",
						value: "",
					},
					{
						label: "Año de fabricación",
						name: "manuf_date",
						type: "number",
						placeholder: "2019",
					},
				],
			},
			{
				columns: [
					{
						label: "Fecha de servicio",
						name: "service_date",
						type: "text",
						value: "",
					},
					{
						label: "Potencia [HP]",
						name: "power",
						type: "number",
						value: "",
					},
					{
						label: "Peso [Kg]",
						name: "weight",
						type: "number",
						value: "",
					},
				],
			},
			{
				columns: [
					{
						label: "Horas/Km totales",
						name: "total_hours",
						type: "number",
						value: "",
					},
					{
						label: "Horas/Km parciales",
						name: "partial_hours",
						type: "number",
						value: "",
					},
					{
						label: "Precio",
						name: "price",
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

	return <NewForm form_data={form}>Equipo</NewForm>;
};

export default NewEquipment;
