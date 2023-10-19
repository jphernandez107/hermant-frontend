import React from "react";
import { Popover } from "react-tiny-popover";
import "./FilterPopover.scss";
import CheckboxList from "components/components/CheckboxList/CheckboxList";


const FilterPopover = ({filters, setFilters, isPopoverOpen, column, valuesToFilter, onClickOutside}) => {
	return (
		<div>
			<Popover
				onClickOutside={onClickOutside}
				className="filter-popover"
				isOpen={isPopoverOpen}
				positions={['bottom']}  
				content={
					<PopoverContent 
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

const PopoverContent = ({filters, setFilters, column, valuesToFilter}) => {
	return (
		<div className="filter-checkbox-list">
			<span className="filter-checkbox-list-title">Filtrar</span>
			<CheckboxList 
				filters={filters} 
				setFilters={setFilters} 
				column={column}
				valuesToFilter={valuesToFilter}/>
		</div>
	);
}

export default FilterPopover;