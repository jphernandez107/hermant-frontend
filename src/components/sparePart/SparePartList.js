import React, { useEffect, useState } from "react";
import "./SparePartList.css";

import Button from "../button/Button"
import List from "../list/List"

const api = require("../../api/Api");

const SparePartList = () => {
  const [parts, setParts] = useState([]);

  useEffect(() => {
    fetchParts();
  }, []);

  const columns = [
    { internal_code: "Código Interno" },
    { external_code: "Código Externo" },
    { type: "Tipo" },
    { application: "Aplicación" },
    { brand: "Marca" },
    { model: "Modelo" },
    { total_equipments: "Equipos" },
    { stock: "Stock" },
    { observations: "Observaciones" },
  ];

  return (
    <List table_columns={columns} table_data={parts} title={'Repuestos'}>
      <Button isLink={true} href={`new`}>
        <i className="fas fa-plus" aria-hidden="true" /> Nuevo Repuesto
      </Button>
    </List>
  );

  async function fetchParts() {
    try {
      const response = await api.getSparePartList();
      response.map((part) => {
        part.total_equipments = 0;
      });
      setParts(response);
    } catch (error) {
      console.log(error);
    }
  }
};

export default SparePartList;
