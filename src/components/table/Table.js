import React from "react";
import "./Table.scss";

import TableHeader from "./TableHeader";

const Table = (props) => {
  const { columns, data, title, showSearchBar, emptyTableTitle } = props
  const styles = props.style || [];
  const { onRowClicked } = props

  const style = () => {
    return styles.join(' ');
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
        style: column.style || []
      }
    });
    return values.map((column) => {
      const cellStyles = column.style || [];
      return (
        <th key={column.value} className={`column ${column.value} ${cellStyles.join(' ')}`}>
          {column.value}
        </th>
      );
    });
  }

  function createRows(columns, data) {
    const emptyTitle = emptyTableTitle || 'No se encontraron datos';
    if (data.length === 0) {
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
          cellValue !== undefined && cellValue !== null ? cellValue : "-";
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
};

export default Table;
