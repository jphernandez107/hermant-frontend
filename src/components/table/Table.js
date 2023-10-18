import React, { useState, useEffect } from "react";
import "./Table.scss";

import TableHeader from "./TableHeader";
import FilterPopover from "components/filterPopover/FilterPopover";
import Loader from "components/components/loader/Loader";

const Table = (props) => {
	const { columns, data, title, showSearchBar, emptyTableTitle, loadingState } = props;
	const styles = props.style || [];
	const { onRowClicked } = props
	const [columnSort, setColumnSort] = useState({
		column: "",
		direction: true, // true === "asc"
	});
	const [searchInput, setSearchInput] = useState("");
	const [filteredData, setFilteredData] = useState(data)
	const [filterPopoverOpen, setFilterPopoverOpen] = useState();
	const [filters, setFilters] = useState([
		// {column: "brand",
		// values: ["Iveco", "Caterpillar", "Sany"],
		// isRange: false,}
	]);

	const style = () => {
		return styles.join(' ');
	}

	const onSortButtonClick = (column) => {
		const direction = columnSort.column === column ? !columnSort.direction : true
		setColumnSort({
			column: column,
			direction: direction
		})
	}

	const onFilterButtonClick = (event, column) => {
		event.stopPropagation();
		if (filterPopoverOpen === column) setFilterPopoverOpen(undefined);
		else setFilterPopoverOpen(column);
	}

	const closeFilterPopover = () => {
		if (filterPopoverOpen) setFilterPopoverOpen(undefined);
	}

	useEffect(() => {
		sortAndFilterData(data, columnSort, filters, searchInput);
	}, [data, columnSort, filters, searchInput]);

	const sortIcon = (column) => {
		if (columnSort.column === column) {
			return columnSort.direction ? "fa-solid fa-sort-up" : "fa-solid fa-sort-down";
		} else {
			return "fa-solid fa-sort";
		}
	}

	const loadingText = () => {
		if (loadingState) {
			return (
				<div className="loading-row">
					<Loader text={loadingState} />
				</div>
			)
		} else if (emptyTableTitle) {
			return (emptyTableTitle)
		} else {
			return ("No se encontraron datos")
		}
	}

	return (
		<div className={`table-card ${style()}`}>
			{getTableHeader(showSearchBar, title, filteredData)}
			<div className={`table-wrapper ${style()}`}>
				<table className={`table styled-table ${style()}`}>
					<thead>
						<tr>{createColumns(columns)}</tr>
					</thead>
					<tbody>{createRows(columns, filteredData)}</tbody>
				</table>
			</div>
		</div>
	);

	function createColumns(columns) {
		const values = columns.map((column) => {
			return {
				value: Object.values(column)[0],
				key: Object.keys(column)[0],
				style: column.style || [],
				isButton: column.onClick,
				isFilterable: column.isFilterable || false,
				isSortable: column.isSortable || false,
			}
		});
		return values.map((column) => {
			const cellStyles = column.style || [];
			return (
				<th 
					key={column.value} 
					className={`column ${column.value} ${cellStyles.join(' ')} ${isColumnFilterable(column)} ${isColumnFiltered(data, filters, column.key)} th-flex`}
					
				>
					<span>{column.value}</span>
					<i className="fas fa-filter filter-icon"
						onClick={(e) => column.isFilterable ? onFilterButtonClick(e, column.key) : () => {}}
					/>
					{column.isSortable && <i className={`${sortIcon(column.key)} icon-end`} onClick={(e) => onSortButtonClick(column.key)}></i>}
					<FilterPopover 
						onClickOutside={closeFilterPopover}
						isPopoverOpen={filterPopoverOpen === column.key} 
						column={column.key}
						filters={filters} 
						setFilters={setFilters}
						valuesToFilter={getValuesToFilter(data, column.key)}
					/>
				</th>
			);
		});
	}

	function createRows(columns, data) {
		let emptyRow = loadingText()
		if (!data || data.length === 0 || loadingState) {
			return (
				<tr>
					<td className="empty-table-row" colSpan={columns.length} >{emptyRow}</td>
				</tr>
			)
		}
		return data.map((item, index) => {
			// Create an array of <td> elements for this row
			let rowCode = item.id;
			const cells = columns.map((column) => {
				const columnKey = Object.keys(column)[0];
				const columnValue = column[columnKey];
				const cellValue = getCellValue(column, item[columnKey]);
				const cell =
					cellValue !== undefined && cellValue !== null && cellValue !== "" ? cellValue : "-";
				const cellStyles = column.style || [];
				if (column.isImage) cellStyles.push("image");

				rowCode = columnKey === "code" ? cellValue : rowCode;

				return (
					<td
						key={columnValue}
						className={cellStyles.join(' ')}
					>
						{cell}
					</td>
				);
			});

			// Return a <tr> element with the cells for this row
			return (
				<tr
					key={index}
					onClick={() =>
						onRowClicked ? onRowClicked(rowCode) : () => {}
					}
				>
					{cells}
				</tr>
			);
		});
	}

	function getCellValue(column, value) {
		if (column.isImage) {
			return (<img src={value}></img>);
		}
		return value;
	}

	function getTableHeader(showSearchBar, title, data) {
		return showSearchBar || title ? (
			<TableHeader showSearchBar={showSearchBar} searchInput={searchInput} setSearchInput={setSearchInput} count={data?.length || 0}>
				{title}
			</TableHeader>
		) : (
			<></>
		);
	}

	function sortData(data, column, direction) {
		if (!data || data.length < 1) return;
		const col = columns.find(col => col[column]);
		const isButton = col && col.isButton || false;
		data.sort((a, b) => {
			if (isButton && (!a[column].props.value || !b[column].props.value)) return true;
			if (direction) {
				if (isButton) {
					return a[column].props.value.localeCompare(b[column].props.value);
				} else if(typeof a[column] === 'number') {
						return a[column] - b[column];
				} else if (a[column] && b[column]) {
						return a[column].localeCompare(b[column]);
				}
			} else {
				if (isButton) {
					return b[column].props.value.localeCompare(a[column].props.value);
				} else if(typeof a[column] === 'number') {
					return b[column] - a[column];
				} else if (a[column] && b[column]) {
					return b[column].localeCompare(a[column]);
				}
			}
		});
		return [...data];
	}

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

	function searchInData(rawData, searchInput) {
		if (!searchInput || searchInput === "") return rawData;
		const filteredData = rawData.filter((row) => {
			return Object.values(row).some((value) => {
				return String(value).toLowerCase().includes(searchInput.toLowerCase());
			});
		});
		return filteredData;
	}

	function sortAndFilterData(rawData, columnSort, filters, searchInput) {
		let filteredData = rawData;
		filteredData = sortData(filteredData, columnSort.column, columnSort.direction);
		filteredData = filterData(filteredData, filters);
		filteredData = searchInData(filteredData, searchInput);
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

	function isColumnFilterable(column) {
		return column.isFilterable ? "filterable" : "non-filterable";
	}

	function isColumnFiltered(rawData, filters, column) {
		const valuesToFilter = getValuesToFilter(rawData, column);
		const filtered = filters.find(filter => filter.column === column)?.values || valuesToFilter;
		return (filtered.length === valuesToFilter.length) ? "non-filtered" : "filtered";
	}
};

export default Table;
