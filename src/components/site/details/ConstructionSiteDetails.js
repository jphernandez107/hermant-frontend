import React, { useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import "./ConstructionSiteDetails.scss";
import Modal from 'react-modal';

import Button from "components/button/Button";
import Table from "components/table/Table";
import PageHeader from "components/pageHeader/PageHeader";
import Loader from "components/components/loader/Loader";

const api = require("api/Api").default;

const ConstructionSiteDetails = () => {
	const { code } = useParams();
	const queryClient = useQueryClient();

	const [handleEquipmentsModalIsOpen, setHandleEquipmentsModalIsOpen] = useState(false);

	const {
		data,
		isLoading: isLoadingSite,
		isError: isErrorSite,
		error: errorSite,
		isSuccess: isSuccessSite,
	} = useQuery(["constructionSite", code], fetchConstructionSite);

	const constructionSite = data?.constructionSite;
	const equipmentsOnSite = data?.equipmentsOnSite;

	const {
		data: allEquipments,
		isLoading: isLoadingAllEquipments,
		isError: isErrorAllEquipments,
		error: errorAllEquipments,
		isSuccess: isSuccessAllEquipments,
		refetch: refetchAllEquipments,
		isRefetching: isRefetchingAllEquipments,
	} = useQuery(["allEquipments", code], fetchAllEquipments, { enabled: isSuccessSite });

	const allEquipmentsLoadingState = isLoadingAllEquipments ? "Buscando equipos..." : undefined

	const setAllEquipments = (equipments) => {
		if (!equipments) return;
		queryClient.setQueryData(["allEquipments", code], equipments);
	}

	const setEquipmentsOnSite = (equipments) => {
		queryClient.setQueryData(["constructionSite", code], (oldData) => ({
			...oldData,
			equipmentsOnSite: equipments 
		}));
			
	}

	const [buttonStates, setButtonStates] = useState({});
	const buttonStatesRef = useRef();
	buttonStatesRef.current = buttonStates;

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
		{ code_button: "Código", style: ["center-text", "fixed-width-20"], isButton: true, isSortable: true, isFilterable: true },
		{ designation: "Designación", style: ["center-text"], isSortable: true, isFilterable: true },
		{ brand_model: "Marca y Modelo", style: ["center-text"], isSortable: true, isFilterable: true },
		{ next_maintenance: "Mantenimiento", style: ["center-text"], isSortable: true, isFilterable: true },
		{ remove_from_site_button: "Quitar", style: ["center-text", "fixed-width-10"], isButton: true },
	];

	const all_equipments_table_columns = [
		{ code: "Código", style: ["center-text"], isSortable: true, isFilterable: true },
		{ designation: "Designación", style: ["center-text"], isSortable: true, isFilterable: true },
		{ brand_model: "Marca y Modelo", style: ["center-text"], isSortable: true, isFilterable: true },
		{ construction_site: "Obra", style: ["center-text"], isSortable: true, isFilterable: true },
		{ add_to_site_button: "Agregar", style: ["center-text", "fixed-width-10"], isButton: true }
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
					const equipments = updateEquipmentsOnSite(response.site);
					if (response.site.all_equipments) allEquipments = response.site.all_equipments;
					updateAllEquipments(allEquipments, equipments);
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
					updateEquipmentsOnSite(response.site);
					refetchAllEquipments();
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
				<PageHeader button={editButton}>
					{`${constructionSite?.name} en ${constructionSite?.province}`}
				</PageHeader>
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
						<div className="equipments-table-header-buttons">
							<div className="equipments-count-container">
								<span className="equipments-count">{equipmentsOnSite.length}</span>
							</div>
							<Button onClick={handleEquipmentsOnSite}>
								<i className="fa-solid fa-plus" />{""}
							</Button>
						</div>
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
							{isRefetchingAllEquipments && <Loader text=" "/>}
						</div>
						<Table
							columns={all_equipments_table_columns}
							data={allEquipments}
							showSearchBar={false}
							style={["no-card"]}
							loadingState={allEquipmentsLoadingState}
							emptyTableTitle={"No se encontraron equipos"}
						/>
					</div>
				</div>
			</Modal>
		</div>
	) : isLoadingSite ? (<Loader text={"Cargando obra..."}/>) : (<></>)

	async function fetchConstructionSite() {
		const site = await api.getConstructionSiteByCode(code);
		const equipmentsOnSite = getEquipmentsFromSite(site);
		return { 
			constructionSite: site, 
			equipmentsOnSite: equipmentsOnSite 
		};
	}

	function getEquipmentsFromSite(site) {
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
		console.log("Calling all equipments");
		let response = await api.getEquipmentList();
		response = response.filter((equipment) => !equipmentsOnSite?.find(e => parseInt(e.id) === parseInt(equipment.id)))
		response = setEquipmentsSiteName(response);
		return response;
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
				value={code}
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

	function updateEquipmentsOnSite(site) {
		const equipments = getEquipmentsFromSite(site);
		setEquipmentsOnSite(equipments);
		return equipments;
	}

	function updateAllEquipments(allEquipments, equipments) {
		const updatedEquipments = allEquipments.filter((equipment) => !equipments.find(e => parseInt(e.id) === parseInt(equipment.id)));
		setAllEquipments(updatedEquipments);
	}

};

export default ConstructionSiteDetails;
