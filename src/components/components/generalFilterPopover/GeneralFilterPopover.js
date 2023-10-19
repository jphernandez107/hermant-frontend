import React from "react";
import { Popover } from "react-tiny-popover";
import "./GeneralFilterPopover.scss";
import CheckboxList from "components/components/CheckboxList/CheckboxList";

const GeneralFilterPopover = ({children, filters, setFilters, isPopoverOpen, columns, valuesToFilter, onClickOutside, hiddenFilters, setHiddenFilters}) => {
	return (
		<div>
			<Popover
				onClickOutside={onClickOutside}
				className="general-filter-popover"
				isOpen={isPopoverOpen}
				positions={['bottom']}  
				content={
					<PopoverContent
						key={'GeneralFilterPopoverContent'}
						filters={filters} 
						setFilters={setFilters} 
						columns={columns} 
						valuesToFilter={valuesToFilter}
						hiddenFilters={hiddenFilters}
						setHiddenFilters={setHiddenFilters}
						/>
				}
			>
				<div>{children}</div> 
			</Popover>
		</div>
	);
};

const PopoverContent = ({filters, setFilters, columns, valuesToFilter, hiddenFilters, setHiddenFilters}) => {

	const onTitleClick = (columnKey) => {
		if (hiddenFilters.includes(columnKey)) {
			setHiddenFilters(hiddenFilters.filter(filter => filter !== columnKey));
		} else {
			setHiddenFilters([...hiddenFilters, columnKey]);
		}
	}

	const showFilter = (columnKey) => {
		return (!hiddenFilters.includes(columnKey)) ? 'show' : 'hide';
	}

	return (
		<div className="filter-checkbox-list" key={'GeneralFilterPopoverContentDiv'}>
			{
				columns.map((column) => {
					if (!column.isFilterable) return null;
					return (
						<div className="filter-checkbox-column" key={`div-${column.key}`}>
							<div className="filter-checkbox-list-title-container" key={`title-container-${column.key}`} onClick={() => onTitleClick(column.key)}>
								<span className="filter-checkbox-list-title" key={`list-title-${column.key}`}>{column.value}</span>
								<i className={`far ${showFilter(column.key) === 'hide' ? 'fa-chevron-right' : 'fa-chevron-down'}`} key={`chevron-${column.key}`}></i>
							</div>
							<div className={`filter-checkbox-list-checkboxes-container ${showFilter(column.key)}`} key={`checkboxes-container-${column.key}`}>
								<CheckboxList 
									key={`checkbox-list-${column.key}`}
									filters={filters} 
									setFilters={setFilters} 
									column={column}
									valuesToFilter={getValuesToFilter(valuesToFilter, column)}/>
							</div>
						</div>
					)
				})
			}
		</div>
	);
}

function getValuesToFilter(data, column) {
	const values = data.map((row) => {
		return row[column.key];
	});
	return [...new Set(values)];
}

export default GeneralFilterPopover;