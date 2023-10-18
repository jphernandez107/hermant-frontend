import React from 'react';
import "./MobileEquipmentList.scss"
import { useNavigate } from 'react-router-dom';

const MobileEquipmentList = (props) => {
	const navigate = useNavigate();
	const equipments = props.equipments;

	const equipmentTitle = (equipment) => {
		return equipment.code + " " + equipment.brand + " " + equipment.model;
	}

	const equipmentSubtitle = (equipment) => {
		return equipment.designation;
	}

	const onItemClicked = (code) => {
		navigate('/equipment/details/' + code)
	}

	const onFilterIconClicked = (e) => {
		
	}

	return (
		<div className="mobile-equipment-list-table-container">
			<div className="mobile-equipment-list-table-header">
				<h4>Equipos</h4>
				<div className="mobile-equipment-list-table-header-right">
					<div className="mobile-equipment-list-filter-icon" onClick={onFilterIconClicked}>
						<i className='far fa-filter' />
						<i className='fas filter-no-active fa-filter' />
					</div>
					<div className="mobile-equipment-list-equipment-count"><span>{equipments?.length || 0}</span></div>
				</div>
			</div>
			<div className="mobile-equipment-list">
				{equipments?.length > 0 && equipments.map((equipment) => (
					<div key={equipment.id} className="mobile-equipment-list-item" onClick={() => onItemClicked(equipment.code)}>
						<div className="mobile-equipment-list-item-image-container">
							<img className="" src={equipment.image}/>
						</div>
						<div className="mobile-equipment-list-item-description">
							<div className="mobile-equipment-list-item-title"> 
								<span className="mobile-equipment-list-item-title-span">{equipmentTitle(equipment)}</span>
							</div>
							<div className="mobile-equipment-list-item-subtitle"> 
								<span className="mobile-equipment-list-item-subtitle-span">{equipmentSubtitle(equipment)}</span>
							</div>
						</div>
						<div className="mobile-equipment-list-item-right">
							<div className="mobile-equipment-list-item-site">
								<span>{equipment.construction_site?.name || "-"}</span>
								<i className="fas fa-helmet-safety"/>
							</div>
							<div className="mobile-equipment-list-item-hours">
								<span>{equipment.total_hours}Hs</span>
								<i className="far fa-clock"/>
							</div>	
						</div>
					</div>
				))}
				{equipments.length === 0 && <span className="mobile-equipment-list-empty-list-text">Lista vacía</span>}
			</div>
		</div>
	)
}

export default MobileEquipmentList;