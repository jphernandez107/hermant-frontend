import React, { useEffect, useState } from 'react';
import "./MobileEquipmentList.scss"
import { useNavigate } from 'react-router-dom';
import GeneralFilterPopover from 'components/components/generalFilterPopover/GeneralFilterPopover';

const MobileEquipmentList = (props) => {
	const navigate = useNavigate();
	const equipments = props.equipments;
	const columns = props.columns?.map(column => getColumnValues(column));
	const [filteredData, setFilteredData] = useState(equipments)
	const [filterPopoverOpen, setFilterPopoverOpen] = useState();
	const [hiddentFilters, setHiddenFilters] = useState([]);
	const [filters, setFilters] = useState([
		// {column: "brand",
		// values: ["Iveco", "Caterpillar", "Sany"],
		// isRange: false,}
	]);

	const equipmentTitle = (equipment) => {
		return equipment.code + " " + equipment.brand + " " + equipment.model;
	}

	const equipmentSubtitle = (equipment) => {
		return equipment.designation;
	}

	const onItemClicked = (code) => {
		navigate('/equipment/details/' + code)
	}

	useEffect(() => {
		sortAndFilterData(equipments, filters);
	}, [equipments, filters]);

	const onFilterIconClicked = (e) => {
		setFilterPopoverOpen(!filterPopoverOpen)
	}

	const closeFilterPopover = () => {
		if (filterPopoverOpen) setFilterPopoverOpen(undefined);
	}

	return (
		<div className="mobile-equipment-list-table-container">
			<div className="mobile-equipment-list-table-header">
				<h4>Equipos</h4>
				<div className="mobile-equipment-list-table-header-right">
					<div className="mobile-equipment-list-filter-icon">
						<GeneralFilterPopover
							filters={filters}
							setFilters={setFilters}
							columns={columns}
							valuesToFilter={equipments}
							isPopoverOpen={filterPopoverOpen}
							hiddenFilters={hiddentFilters}
							setHiddenFilters={setHiddenFilters}
							onClickOutside={closeFilterPopover}
						>
							{anyColumnFiltered(filteredData, filters, columns) 
							? <i className='fas fa-filter' onClick={onFilterIconClicked}/>
							: <i className='far fa-filter' onClick={onFilterIconClicked}/>}
						</GeneralFilterPopover>
					</div>
					<div className="mobile-equipment-list-equipment-count"><span>{filteredData?.length || 0}</span></div>
				</div>
			</div>
			<div className="mobile-equipment-list">
				{filteredData?.length > 0 && filteredData.map((equipment) => (
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
				{filteredData.length === 0 && <span className="mobile-equipment-list-empty-list-text">Lista vacía</span>}
			</div>
		</div>
	)

	function filterData(rawData, filters) {
		if (!filters || filters.length === 0) return rawData;
		const filteredData = rawData.filter((row) => {
			return filters.every((filter) => {
				if (filter.isRange) {
					return row[filter.column] >= filter.values[0] && row[filter.column] <= filter.values[1];
				} else {
					return filter.values.includes(row[filter.column]);
				}
			});
		});
		return filteredData;
	}
	
	function sortAndFilterData(rawData, filters) {
		let filteredData = [...rawData];
		filteredData = filterData(filteredData, filters);
		setFilteredData(filteredData);
	}
	
	function getValuesToFilter(data, column) {
		if (!data || data.length === 0) return [];
		const values = [];
		data.forEach(row => {
			const value = row[column];
			if (!values.includes(value)) values.push(value);
		});
		return values;
	}

	function anyColumnFiltered(rawData, filters, columns) {
		return columns.some(column => isColumnFiltered(rawData, filters, column.key) === "filtered");
	}
	
	function isColumnFiltered(rawData, filters, column) {
		const valuesToFilter = getValuesToFilter(rawData, column);
		const filtered = filters.find(filter => filter.column === column)?.values || valuesToFilter;
		return (filtered.length === valuesToFilter.length) ? "non-filtered" : "filtered";
	}

	function getColumnValues(column) {
		return {
			value: Object.values(column)[0],
			key: Object.keys(column)[0],
			style: column.style || [],
			isButton: column.onClick || false,
			isFilterable: column.isFilterable || false,
			isSortable: column.isSortable || false,
		}
	}
}


export default MobileEquipmentList;