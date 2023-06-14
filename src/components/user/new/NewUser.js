import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./NewUser.scss";

import NewForm from "components/newForm/NewFrom";
const api = require("api/Api").default;

const UserRole = Object.freeze({
    ADMIN: 0,
    ENGINEER: 1,
    MECHANIC: 2,
});

const NewUser = () => {
	const headerTitle = "Nuevo equipo";
	const headerSubtitle = "Ingrese los datos del equipo que desea agregar";
	const form = {
		header_title: headerTitle,
		header_subtitle: headerSubtitle,
		action: "user/register",
		method: "POST",
		go_to_after_submit: "/user/list",
		rows: [
			{
				columns: [
					{ label: "DNI", name: "dni", type: "text", value: "", required: true, },
					{ label: "Nombre", name: "first_name", type: "text", value: "", required: true, },
					{ label: "Apellido", name: "last_name", type: "text", value: "", required: true, },
				],
			},
			{
				columns: [
					{ label: "Contraseña", name: "password", type: "password", value: "", required: true, },
					{ label: "Permisos", name: "role", type: "select", value: "", options: Object.keys(UserRole), required: true, },
				],
			},
		],
	};

	const { id } = useParams();
	const [user, setUser] = useState(null);
	const [formData, setFormData] = useState(form);

	useEffect(() => {
		fetchUser();
	}, []);

	useEffect(() => {
		updateFormData(user);
	}, [user]);

	return <NewForm form_data={formData}></NewForm>;

	async function fetchUser() {
		if (id === undefined || id === null) return;
		try {
			const response = await api.getUserByCode(id);
			setUser(response);
		} catch (error) {
			console.log(error);
		}
	}

	function updateFormData(user) {
		if (!user) return;
		const updatedFormData = { ...formData };
		updatedFormData.action = "user/edit?id=" + user.id;
		updatedFormData.is_editing = true;
		updatedFormData.go_to_after_submit =
			"/user/details/" + user.id;
		updatedFormData.rows.forEach((row) => {
			row.columns.forEach((column) => {
				const value = user[column.name];
				column.value = value || column.value;
			});
		});
		setFormData(updatedFormData);
	}
};

export default NewUser;
