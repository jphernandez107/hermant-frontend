import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import "./EquipmentList.scss";

import Button from "components/button/Button"
import List from "components/list/List";
import ProtectedComponent from "components/protectedComponent/ProtectedComponent";
import { UserRole } from "context/Context";

const api = require("api/Api").default;

const EquipmentList = () => {
  const [equipments, setEquipments] = useState([]);
  const [loadingState, setLoadingState] = useState("Buscando equipos...")

  useEffect(() => {
    fetchEquipments();
  }, []);

  const navigate = useNavigate()

  const columns = [
    { code: "Código" },
    { designation: "Designación" },
    { brand: "Marca" },
    { model: "Modelo" },
    { total_hours: "Horómetro" },
    { next_maintenance: "Próximo Mantenimiento" },
    { observations: "Observaciones" },
  ];

  function onRowClicked(code) {
    navigate('/equipment/details/' + code)
  }

  return (
    <List 
      table_columns={columns} 
      table_data={equipments} 
      set_table_data={setEquipments} 
      title={'Equipos'} 
      onRowClicked={onRowClicked}
      loadingState={loadingState}
    >
      <ProtectedComponent roleNeeded={UserRole.ENGINEER}>
        <Button isLink={true} href={`new`}>
          <i className="fas fa-plus" aria-hidden="true" /> Nuevo Equipo
        </Button>
        <Button isLink={true} href={`hours`}>
          <i className="fas fa-clock" aria-hidden="true" /> Administrar horas de
          equipos
        </Button>
      </ProtectedComponent>
    </List>
  );

  async function fetchEquipments() {
    try {
      const response = await api.getEquipmentList();
      setEquipments(response);
    } catch (error) {
      console.log(error);
    }
    setLoadingState(null);
  }
};

export default EquipmentList;
