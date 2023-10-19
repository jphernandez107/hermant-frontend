import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from 'react-router-dom'
import "./EquipmentList.scss";

import Button from "components/button/Button"
import List from "components/list/List";
import ProtectedComponent from "components/protectedComponent/ProtectedComponent";
import { UserRole } from "context/Context";
import { equipmentLogos } from "../EquipmentLogos";
import MobileEquipmentList from "./MobileEquipmentList";
import useOrientation from "components/hooks/UseOrientation";

const api = require("api/Api").default;

const EquipmentList = () => {
  const navigate = useNavigate()
  const isPortrait = useOrientation();

  const {
    data: equipments = [],
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery("equipments", fetchEquipments);

  const columns = [
    { code: "Código", isSortable: true },
    { image: "Logo", isImage: true },
    { designation: "Designación", isFilterable: true, isSortable: true },
    { brand: "Marca", isFilterable: true, isSortable: true },
    { model: "Modelo", isFilterable: true, isSortable: true },
    { total_hours: "Horómetro", isFilterable: true, isSortable: true },
    { site_name: "Obra", isFilterable: true, isSortable: true },
    { next_maintenance: "Próximo Mantenimiento", isFilterable: true, isSortable: true },
    { observations: "Observaciones", isFilterable: true, isSortable: true },
  ];

  const loadingState = isLoading ? "Buscando equipos..." : undefined

  function onRowClicked(code) {
    navigate('/equipment/details/' + code)
  }

  return (
    <>
    {isPortrait ? <MobileEquipmentList equipments={equipments} columns={columns}/>
    : <List
      className="equipment-list" 
      table_columns={columns} 
      table_data={equipments} 
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
    </List>}
    </>
  );

  async function fetchEquipments() {
    const response = await api.getEquipmentList();
    return response.map(equipment => {
      equipment.image = getEquipmentImage(equipment);
      equipment.site_name = equipment.construction_site?.name || "-";
      return equipment;
    });
  }

  function getEquipmentImage(equipment) {
    const observations = equipment.observations?.toLowerCase() || "";
    const designation = equipment.designation?.toLowerCase();

    return equipmentLogos[observations] || equipmentLogos[designation] || equipmentLogos["generico"];
  }
};

export default EquipmentList;
