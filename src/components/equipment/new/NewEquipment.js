import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./NewEquipment.scss";

import NewForm from "../../newForm/NewFrom";
const api = require("../../../api/Api");

const NewEquipment = () => {
	const headerTitle = "Nuevo equipo";
	const headerSubtitle = "Ingrese los datos del equipo que desea agregar";
    const form = {
		header_title: headerTitle,
		header_subtitle: headerSubtitle,
		action: "equipment/new",
        method: "POST",
        go_to_after_submit: "/equipment/list",
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
						type: "text",
                        value: "",
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
						value: 0,
					},
					{
						label: "Peso [Kg]",
						name: "weight",
						type: "number",
						value: 0,
					},
				],
			},
			{
				columns: [
					{
						label: "Horas/Km totales",
						name: "total_hours",
						type: "number",
						value: 0,
					},
					{
						label: "Horas/Km parciales",
						name: "partial_hours",
						type: "number",
						value: 0,
					},
					{
						label: "Precio",
						name: "price",
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

	const { code } = useParams();
    const [equipment, setEquipment] = useState(null)
    const [formData, setFormData] = useState(form)

    useEffect(() => {
		fetchEquipment();
	}, []);

    useEffect(() => {
        updateFormData(equipment)
    }, [equipment])

	return <NewForm form_data={formData}></NewForm>;

    async function fetchEquipment() {
		try {
			const response = await api.getEquipmentByCode(code);
			setEquipment(response);
		} catch (error) {
			console.log(error);
		}
	}

    function updateFormData(equipment) {
        if (!equipment) return
		const updatedFormData = { ...formData };
        updatedFormData.action = "equipment/edit?code=" + equipment.code;
        updatedFormData.method = "PUT"
        updatedFormData.go_to_after_submit = "/equipment/details/" + equipment.code
		updatedFormData.rows.forEach((row) => {
			row.columns.forEach((column) => {
				const value = equipment[column.name];
				column.value = value || column.value;
			});
		});
		setFormData(updatedFormData);
	}
};

export default NewEquipment;
