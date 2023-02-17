import React, { useEffect, useState } from "react";
import "./EquipmentList.css";

import Button from "../button/Button";
import List from "../list/List";

const api = require("../../api/Api");

const EquipmentList = () => {
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    fetchEquipments();
  }, []);

  const columns = [
    { code: "Patente" },
    { designation: "Designación" },
    { brand: "Marca" },
    { model: "Modelo" },
    { total_hours: "Horómetro" },
    { next_maintenance: "Próximo Mantenimiento" },
    { observations: "Observaciones" },
  ];

  return (
    <List table_columns={columns} table_data={equipments} title={'Equipos'}>
      <Button isLink={true} href={`new`}>
        <i className="fas fa-plus" aria-hidden="true" /> Nuevo Equipo
      </Button>
      <Button isLink={true} href={`hours`}>
        <i className="fas fa-clock" aria-hidden="true" /> Administrar horas de
        equipos
      </Button>
    </List>
  );

  async function fetchEquipments() {
    try {
      const response = await api.getEquipmentList();
      setEquipments(response);
    } catch (error) {
      console.log(error);
    }
  }
};

export default EquipmentList;
