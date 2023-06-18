import React, { useState, useEffect } from "react";
import "./Table.scss";

import TableHeader from "./TableHeader";

const Table = (props) => {
  const { columns, data, setData, title, showSearchBar, emptyTableTitle } = props
  const styles = props.style || [];
  const { onRowClicked } = props
  const [columnSort, setColumnSort] = useState({
    column: "",
    direction: true // true === "asc"
  });

  const style = () => {
    return styles.join(' ');
  }

  const onFilterButtonClick = (column) => {
    const direction = columnSort.column === column ? !columnSort.direction : true
    setColumnSort({
      column: column,
      direction: direction
    })
  }

  useEffect(() => {
    sortData(columnSort.column, columnSort.direction);
  }, [columnSort]);

  const filterIcon = (column) => {
    if (columnSort.column === column) {
      return columnSort.direction ? "fa-solid fa-sort-up" : "fa-solid fa-sort-down";
    } else {
      return "fa-solid fa-sort";
    }
  }

  return (
    <div className={`table-card ${style()}`}>
      {getTableHeader(showSearchBar, title)}
      <div className={`table-wrapper ${style()}`}>
        <table className={`table styled-table ${style()}`}>
          <thead>
            <tr>{createColumns(columns)}</tr>
          </thead>
          <tbody>{createRows(columns, data)}</tbody>
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
      }
    });
    return values.map((column) => {
      const cellStyles = column.style || [];
      return (
        <th key={column.value} className={`column ${column.value} ${cellStyles.join(' ')} th-flex`}>
          {column.value}
          {setData && <i className={`${filterIcon(column.key)} icon-end`} onClick={(e) => onFilterButtonClick(column.key)}></i>}
        </th>
      );
    });
  }

  function createRows(columns, data) {
    const emptyTitle = emptyTableTitle || 'No se encontraron datos';
    if (!data || data.length === 0) {
      return (
        <tr>
          <td className="empty-table-row" colSpan={columns.length} >{`${emptyTitle}`}</td>
        </tr>
      )
    }
    return data.map((item, index) => {
      // Create an array of <td> elements for this row
      let rowCode = item.id;
      const cells = columns.map((column) => {
        const columnKey = Object.keys(column)[0];
        const columnValue = column[columnKey];
        const cellValue = item[columnKey];
        const cell =
          cellValue !== undefined && cellValue !== null && cellValue !== "" ? cellValue : "-";
        const cellStyles = column.style || [];

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

  function getTableHeader(showSearchBar, title) {
    return showSearchBar || title ? (
      <TableHeader showSearchBar={showSearchBar}>
        {title}
      </TableHeader>
    ) : (
      <></>
    );
  }

  function sortData(column, direction) {
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
    if (setData) setData([...data]);
  }
};

export default Table;
