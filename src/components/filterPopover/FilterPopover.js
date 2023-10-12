import React, { useState } from "react";
import { Popover } from "react-tiny-popover";
import "./FilterPopover.scss";
import Checkbox from "components/checkbox/Checkbox";


const FilterPopover = ({filters, setFilters, isPopoverOpen, column, valuesToFilter, onClickOutside}) => {
	return (
		<div>
			<Popover
				onClickOutside={onClickOutside}
				className="filter-popover"
				isOpen={isPopoverOpen}
				positions={['bottom']}  
				content={
					<CheckboxList 
						filters={filters} 
						setFilters={setFilters} 
						column={column}
						valuesToFilter={valuesToFilter}/>
				}
			>
				<div></div> 
			</Popover>
		</div>
	);
};

export default FilterPopover;

const CheckboxList = ({valuesToFilter, filters, setFilters, column}) => {
	valuesToFilter.sort((a,b) => {
		if (typeof a === 'number') return a - b;
		else if (typeof a === 'string') return a.localeCompare(b)
		return 0;
	});
	const checkboxFilter = filters.find(filter => filter.column === column)?.values || valuesToFilter;
	const areAllFilterSelected = () => checkboxFilter.length === valuesToFilter.length;
	const [isAllSelected, setIsAllSelected] = useState(areAllFilterSelected());

	const handleSelectAllChange = () => {
		const newIsAllSelected = !isAllSelected;
		setIsAllSelected(newIsAllSelected);

		const newCheckboxFilter = newIsAllSelected ? [...valuesToFilter] : [];
		setFilters([
			...filters.filter(filter => filter.column !== column),
			{
				column: column,
				values: newCheckboxFilter,
				isRange: false,
			}
		]);
	};
	
	const handleCheckboxChange = (filter) => {
		if (checkboxFilter.includes(filter)) checkboxFilter.splice(checkboxFilter.indexOf(filter), 1);
		else checkboxFilter.push(filter);
		setIsAllSelected(areAllFilterSelected());
		setFilters([
			...filters.filter(filter => filter.column !== column),
			{
				column: column,
				values: [...checkboxFilter],
				isRange: false,
			}
		]);
	}

	return(
		<div className="filter-checkbox-list">
			<span className="filter-checkbox-list-title">Filtrar</span>
			<div className="filter-checkbox" key={'selectAll'}>
				<Checkbox
					type="checkbox"
					id="selectAll"
					isChecked={isAllSelected}
					handleCheckboxSelected={handleSelectAllChange}
				/>
				<label htmlFor="selectAll">Seleccionar Todo</label>
			</div>
			{valuesToFilter.map(filter => (
				<div className="filter-checkbox" key={filter}>
					<Checkbox
						type="checkbox"
						id={filter}
						name={filter}
						isChecked={checkboxFilter.includes(filter)}
						handleCheckboxSelected={(name, checked) => handleCheckboxChange(filter)}
					/>
					<label htmlFor={filter}>{filter}</label>
				</div>
			))}
		</div>
	)
}