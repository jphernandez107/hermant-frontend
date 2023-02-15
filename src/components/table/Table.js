import React, { useState } from "react";
import "./Table.css";

import TableHeader from "./TableHeader";

const Table = (props) => {
  const columns = [
    { code: "CÓDIGO" },
    { designation: "DESIGNACIÓN" },
    { brand: "MARCA" },
    { model: "MODELO" },
    { total_hours: "HORÓMETRO" },
    { next_maintenance: "PRÓXIMO MANTENIMIENTO" },
    { observations: "DETALLES" },
  ];
  const data = [
    {
      CÓDIGO: "001",
      DESIGNACIÓN: "Generador",
      MARCA: "Honda",
      MODELO: "EU7000iS",
      HORÓMETRO: 150,
      "PRÓXIMO MANTENIMIENTO": "2023-03-15",
      DETALLES: "Incluye kit de ruedas y manija de transporte",
    },
    {
      CÓDIGO: "002",
      DESIGNACIÓN: "Compresor de aire",
      MARCA: "DeWalt",
      MODELO: "D55168",
      HORÓMETRO: 220,
      "PRÓXIMO MANTENIMIENTO": "2023-04-01",
      DETALLES: "Presión máxima de 225 PSI",
    },
    {
      CÓDIGO: "003",
      DESIGNACIÓN: "Cortadora de césped",
      MARCA: "Toro",
      MODELO: "20339",
      HORÓMETRO: 75,
      "PRÓXIMO MANTENIMIENTO": "2023-05-01",
      DETALLES: "Ancho de corte de 22 pulgadas",
    },
    {
      CÓDIGO: "004",
      DESIGNACIÓN: "Soldadora",
      MARCA: "Lincoln Electric",
      MODELO: "K2185-1",
      HORÓMETRO: 50,
      "PRÓXIMO MANTENIMIENTO": "2023-03-30",
      DETALLES: "Capacidad de soldar acero, hierro y acero inoxidable",
    },
    {
      CÓDIGO: "005",
      DESIGNACIÓN: "Taladro inalámbrico",
      MARCA: "Makita",
      MODELO: "XFD131",
      HORÓMETRO: 0,
      "PRÓXIMO MANTENIMIENTO": "2023-08-01",
      DETALLES: "Incluye batería de iones de litio de 18V",
    },
  ];

  // document.documentElement.style.setProperty(
  //   "--table-min-width",
  //   `${columns.length * 6}vh`
  // );
  return (
    <div className="table-card">
      <TableHeader>{props.title}</TableHeader>
      <div className="table-wrapper">
        <table className="table styled-table">
          <thead>
            <tr>{createColumns(props.columns)}</tr>
          </thead>
          <tbody>{createRows(props.columns, props.data)}</tbody>
        </table>
      </div>
    </div>
  );

  function createColumns(columns) {
    const values = columns.map((obj) => {
      return Object.values(obj)[0];
    });
    return values.map((column) => {
      console.log(column);
      return (
        <th key={column} className={`column ${column}`}>
          {column}
        </th>
      );
    });
  }

  function createRows(columns, data) {
    console.log(data);
    return data.map((item, index) => {
      // Create an array of <td> elements for this row
      const cells = columns.map((column) => {
        const columnKey = Object.keys(column)[0];
        const columnValue = column[columnKey];
        const cellValue = item[columnKey];
        const cell = cellValue !== undefined ? cellValue : "";
        return <td key={columnValue}>{cell}</td>;
      });

      // Return a <tr> element with the cells for this row
      return <tr key={index}>{cells}</tr>;
    });
  }
};

export default Table;
