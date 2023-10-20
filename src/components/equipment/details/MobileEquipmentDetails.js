import React from 'react';
import "./MobileEquipmentDetails.scss";
import PropertyList from 'components/components/propertyList/PropertyList';
import UseHourList from '../useHour/UseHourList';

const MobileEquipmentDetails = ({ columns, equipment, useHours }) => {
	console.log("🚀 ~ file: MobileEquipmentDetails.js:6 ~ MobileEquipmentDetails ~ columns:", columns)
	console.log("🚀 ~ file: MobileEquipmentDetails.js:6 ~ MobileEquipmentDetails ~ equipment:", equipment)

	const properties = columns.map(column => {
		const [key, value] = Object.entries(column)[0];
		if (key === "image" || key === "construction_site") return;
		return {
			key: value,
			value: equipment[key] || "N/A",
		}
	}).filter(property => property);

	console.log("🚀 ~ file: MobileEquipmentDetails.js:15 ~ properties ~ properties:", properties)
	
	return (
		<div className='mobile-equipment-details-container'>
			<MobileEquipmentDetailsHeader equipment={equipment} />
			<PropertyList properties={properties} />
			<UseHourList useHours={useHours} />
		</div>
	)
}

const MobileEquipmentDetailsHeader = ({ equipment }) => {
	const equipmentTitle = equipment.code + ' ' + equipment.brand + ' ' + equipment.model;
	const equipmentSubtitle = equipment.designation;

	return (
		<div className='mobile-equipment-details-header-container'>
			<div className='mobile-equipment-details-header-image-container'>
				<img src={equipment.image} alt={equipmentTitle} />
			</div>
			<div className='mobile-equipment-details-header-description'>
				<div className='mobile-equipment-details-header-title'>
					<span>{equipmentTitle}</span>
				</div>
				<div className='mobile-equipment-details-header-subtitle'>
					<span>{equipmentSubtitle}</span>
				</div>
				<div className='mobile-equipment-details-header-footer'>
					<div className='mobile-equipment-details-header-site'>
						<i className='fas fa-helmet-safety' />
						<span> {equipment.construction_site_string}</span>
					</div>
					<div className='mobile-equipment-details-header-total-hours'>
						<i className='fas fa-clock' />
						<span>{` ${equipment.total_hours}Hs`}</span>
					</div>
				</div>
			</div>
		</div>
	)

}

export default MobileEquipmentDetails;


