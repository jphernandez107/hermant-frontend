import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./ConstructionSiteDetails.scss";
import Modal from 'react-modal';

import Button from "components/button/Button";
import Table from "components/table/Table";
import TableHeader from "components/table/TableHeader";

const api = require("api/Api").default;

const ConstructionSiteDetails = () => {
	const { code } = useParams();

	const [constructionSite, setConstructionSite] = useState(null);
	const [equipmentsOnSite, setEquipmentsOnSite] = useState([]);
	const [allEquipments, setAllEquipments] = useState([]);
	const [handleEquipmentsModalIsOpen, setHandleEquipmentsModalIsOpen] = useState(false);

	const [buttonStates, setButtonStates] = useState({});
	const buttonStatesRef = useRef();
	buttonStatesRef.current = buttonStates;

	useEffect(() => {
		fetchConstructionSite();
	}, []);

	const columns_table_1 = [
		{ code: "Código", style: ["center-text"] },
		{ name: "Nombre", style: ["center-text"] },
		{ province: "Provincia", style: ["center-text"] },
		{ district: "Localidad", style: ["center-text"] },
		{ distance: "Distancia", style: ["center-text"] },
	];

	const columns_table_2 = [
		{ init_date: "Fecha Inicio", style: ["center-text"] },
		{ finish_date: "Fecha Fin", style: ["center-text"] },
		{ max_temp: "Max", style: ["center-text"] },
		{ min_temp: "Min", style: ["center-text"] },
		{ altitud: "Altura", style: ["center-text"] },
	];

	const columns_table_3 = [
		{ observations: "Observaciones", style: ["center-text"] },
	];

	const equipments_on_site_table_columns = [
		{ code_button: "Código", style: ["center-text", "fixed-width-20"] },
		{ designation: "Designación", style: ["center-text"] },
		{ brand_model: "Marca y Modelo", style: ["center-text"] },
		{ next_maintenance: "Mantenimiento", style: ["center-text"] },
		{ remove_from_site_button: "Quitar", style: ["center-text", "fixed-width-10"] },
	];

	const all_equipments_table_columns = [
		{ code: "Código", style: ["center-text"] },
		{ designation: "Designación", style: ["center-text"] },
		{ brand_model: "Marca y Modelo", style: ["center-text"] },
		{ construction_site: "Obra", style: ["center-text"] },
		{ add_to_site_button: "Agregar", style: ["center-text", "fixed-width-10"]}
	];

	const editButton = () => {
		if (!constructionSite) return;
		const href = "/site/edit/" + constructionSite?.code;
		return (
			<Button isLink={true} href={href} styles={["outline"]}>
				<i className="fas fa-pencil" aria-hidden="true" /> {" Editar"}
			</Button>
		);
	};

	const handleEquipmentsOnSite = (e) => {
		fetchAllEquipments();
		openModal();
	}

	const openModal = () => {
		setHandleEquipmentsModalIsOpen(true);
	}

	const closeModal = () => {
		setHandleEquipmentsModalIsOpen(false);
	}

	const onEquipmentAdded = (equip, allEquipments) => {
		if (buttonStatesRef.current[equip.id]) return;
		setButtonStates(prevState => ({...prevState, [equip.id]: true}));
		api.putAddEquipmentToSite(equip.code, constructionSite.code)
			.then((response) => {
				if (response && response.site) {
					const equipments = setEquipmentsData(response.site);
					setEquipmentsOnSite(equipments);
					if (response.site.all_equipments) allEquipments = response.site.all_equipments;
					const updatedEquipments = allEquipments.filter((equipment) => !equipments.find(e => parseInt(e.id) === parseInt(equipment.id)));
    				setAllEquipments(updatedEquipments);
					setButtonStates(prevState => ({...prevState, [equip.id]: false}));
				}
			})
			.catch((error) => {
				setButtonStates(prevState => ({...prevState, [equip.id]: false}));
				console.log(error)
			});
	}

	const onEquipmentRemoved = (equip, site) => {
		if (buttonStatesRef.current[equip.id]) return;
		setButtonStates(prevState => ({...prevState, [equip.id]: true}));
		api.putRemoveEquipmentFromSite(equip.code, site.code)
			.then((response) => {
				if (response && response.site) {
					const equipments = setEquipmentsData(response.site);
					setEquipmentsOnSite(equipments);
					setButtonStates(prevState => ({...prevState, [equip.id]: false}));
				}
			})
			.catch((error) => {
				setButtonStates(prevState => ({...prevState, [equip.id]: false}));
				console.log(error);
			});
	}

	return constructionSite ? (
		<div className="details-page">
			<div className="details-header">
				<TableHeader
					showSearchBar={false}
					button={editButton}
				>{`${constructionSite?.name} en ${constructionSite?.province}`}</TableHeader>
			</div>
			<div className="details-wrapper">
				<div className="site-details">
					<div className="basic-details">
						<Table
							className={"details-table"}
							columns={columns_table_1}
							data={[constructionSite]}
							showSearchBar={false}
							style={["single"]}
						/>
						<Table
							className={"details-table"}
							columns={columns_table_2}
							data={[constructionSite]}
							showSearchBar={false}
							style={["single"]}
						/>
					</div>
					<div className="other-details">
						<Table
							columns={columns_table_3}
							data={[constructionSite]}
							showSearchBar={false}
							style={["single"]}
						/>
					</div>
				</div>
				<div className="equipments-table-container">
					<div className="equipments-table-header">
						<h4> Equipos en esta obra </h4>
						<Button onClick={handleEquipmentsOnSite}>
							<i className="fa-solid fa-plus" />{""}
						</Button>
					</div>
					<Table
						columns={equipments_on_site_table_columns}
						data={equipmentsOnSite}
						showSearchBar={false}
						style={["no-card"]}
						emptyTableTitle={"No se encontraron equipos"}
					/>
				</div>
			</div>
			<Modal
				isOpen={handleEquipmentsModalIsOpen}
				onRequestClose={closeModal}
				contentLabel="My Dialog"
				className="site-modal"
				overlayClassName="site-modal-overlay"
			>
				<div className="handle-equipments-modal-container">
					<div className="equipments-off-site-container">
						<div className="equipments-table-header">
							<h4> Equipos para agregar </h4>
						</div>
						<Table
							columns={all_equipments_table_columns}
							data={allEquipments}
							showSearchBar={false}
							style={["no-card"]}
							emptyTableTitle={"No se encontraron equipos"}
						/>
					</div>
				</div>
			</Modal>
		</div>
	) : (
		<></>
	);

	async function fetchConstructionSite() {
		try {
			const response = await api.getConstructionSiteByCode(code);
			setConstructionSite(response);
			const equipments = setEquipmentsData(response);
			setEquipmentsOnSite(equipments);
		} catch (error) {
			console.log(error);
		}
	}

	function setEquipmentsData(site) {
		const equipments = site.equipments.map((equipment) => {
			equipment.code_button = equipmentCodeButton(equipment.code);
			equipment.remove_from_site_button = removeEquipmentFromSiteButton(equipment, site)();
			equipment.brand_model = `${equipment.brand} ${equipment.model}`;
			if (equipment.next_maintenances && equipment.next_maintenances.length > 0) {
				const maintDate = equipment.next_maintenances[0].maintenance_date
				equipment.next_maintenance = new Date(maintDate).toLocaleDateString();
			} 
			return equipment;
		});
		return equipments;
	}

	async function fetchAllEquipments() {
		try {
			let response = await api.getEquipmentList();
			response = response.filter((equipment) => !equipmentsOnSite.find(e => parseInt(e.id) === parseInt(equipment.id)))
			response = setEquipmentsSiteName(response);
			setAllEquipments(response);
		} catch (error) {
			console.error(error);
		}
	}

	function setEquipmentsSiteName(equipments) {
		const equip = equipments.map((equipment) => {
			equipment.add_to_site_button = addEquipmentToSiteButton(equipment, equipments)();
			equipment.brand_model = `${equipment.brand} ${equipment.model}`;
			if (equipment.construction_site)
				equipment.construction_site = equipment.construction_site.name || "";
			return equipment;
		});
		return equip
	}

	function equipmentCodeButton(code) {
		return (
			<Button
				isLink={true}
				href={`/equipment/details/${code}`}
				styles={["small"]}
			>
				<i className="mdi mdi-bulldozer" aria-hidden="true" />{" "}
				{code}
			</Button>
		);
	}

	function addEquipmentToSiteButton(equipment, allEquipments) {
		return () => {
			return (
				<Button
					isLink={false}
					onClick={(e) => onEquipmentAdded(equipment, allEquipments)}
					styles={["small"]}
				>
					<i className="fa-solid fa-plus" aria-hidden="true" />{""}
				</Button>
			);
		}
	}

	function removeEquipmentFromSiteButton(equipment, site) {
		return () => {
			return (
				<Button
					isLink={false}
					onClick={(e) => onEquipmentRemoved(equipment, site)}
					styles={["small"]}
				>
					<i className="fa-solid fa-minus" aria-hidden="true" />{""}
				</Button>
			);

		}
	}
};

export default ConstructionSiteDetails;
