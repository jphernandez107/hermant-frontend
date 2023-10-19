import React, { useState } from 'react';
import Checkbox from 'components/checkbox/Checkbox';
import './CheckboxList.scss';

const CheckboxList = ({valuesToFilter, filters, setFilters, column}) => {
	const columnKey = column.key;
	valuesToFilter.sort((a,b) => {
		if (typeof a === 'number') return a - b;
		else if (typeof a === 'string') return a.localeCompare(b)
		return 0;
	});
	const checkboxFilter = filters.find(filter => filter.column === columnKey)?.values || valuesToFilter;
	const areAllFilterSelected = () => checkboxFilter.length === valuesToFilter.length;
	const [isAllSelected, setIsAllSelected] = useState(areAllFilterSelected());

	const handleSelectAllChange = () => {
		const newIsAllSelected = !isAllSelected;
		setIsAllSelected(newIsAllSelected);

		const newCheckboxFilter = newIsAllSelected ? [...valuesToFilter] : [];
		setFilters([
			...filters.filter(filter => filter.column !== columnKey),
			{
				column: columnKey,
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
			...filters.filter(filter => filter.column !== columnKey),
			{
				column: columnKey,
				values: [...checkboxFilter],
				isRange: false,
			}
		]);
	}
	
	return(
		<>
			<div className="filter-checkbox" key={`selectAll-${columnKey}`}>
				<Checkbox
					type="checkbox"
					id="selectAll"
					isChecked={isAllSelected}
					handleCheckboxSelected={handleSelectAllChange}
				/>
				<label htmlFor="selectAll">Seleccionar Todo</label>
			</div>
			{valuesToFilter.map(filter => (
				<div className="filter-checkbox" key={`${columnKey}-${filter}`}>
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
		</>
	)
}

export default CheckboxList;