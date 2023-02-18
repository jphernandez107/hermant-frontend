import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ConstructionSiteDetails.css";

import Button from "../../button/Button";
import Table from "../../table/Table";
import TableHeader from "../../table/TableHeader";

const api = require("../../../api/Api");

const ConstructionSiteDetails = () => {
  const { code } = useParams();

  const [constructionSites, setConstructionSites] = useState([]);
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    fetchConstructionSite();
  }, []);

  const columns_table_1 = [
    { code: "Código", style: ["center-text"] },
    { name: "Nombre", style: ["center-text"] },
    { province: "Provincia", style: ["center-text"] },
    { district: "Localidad", style: ["center-text"] },
    { distance: "Distancia", style: ["center-text"] },
  ];

  const columns_table_2 = [
    { init_date: "Fecha Inicio", style: ["center-text"] },
    { finish_date: "Fecha Fin", style: ["center-text"] },
    { max_temp: "Max", style: ["center-text"] },
    { min_temp: "Min", style: ["center-text"] },
    { altitud: "Altura", style: ["center-text"] },
  ];

  const columns_table_3 = [
    { observations: "Observaciones", style: ["center-text"] },
  ];

  const maintenance_table_columns = [
    { code: "Coódigo", style: ["center-text"] },
    { designation: "Designación", style: ["center-text"] },
    { brand: "Marca", style: ["center-text"] },
    { model: "Modelo", style: ["center-text"] },
    { observations: "Observaciones", style: ["center-text"] },
  ];

  return (
    <div className="details-page">
      <div className="details-header">
        <TableHeader
          showSearchBar={false}
        >{`${constructionSites[0]?.name} en ${constructionSites[0]?.province}`}</TableHeader>
      </div>
      <div className="details-wrapper">
        <div className="basic-details">
          <Table
            className={"details-table"}
            columns={columns_table_1}
            data={constructionSites}
            showSearchBar={false}
          />
          <Table
            className={"details-table"}
            columns={columns_table_2}
            data={constructionSites}
            showSearchBar={false}
          />
        </div>
        <div className="other-details">
          <Table
            columns={columns_table_3}
            data={constructionSites}
            showSearchBar={false}
          />
        </div>
        <div className="equipments-table">
          <Table
            columns={maintenance_table_columns}
            data={equipments}
            title={"Equipos en esta obra"}
          />
        </div>
      </div>
    </div>
  );

  async function fetchConstructionSite() {
    try {
      const response = await api.getConstructionSiteByCode(code);
      console.log(response);
      setConstructionSites([response]);
      const equipments = response.equipments.map((equipment) => {
        equipment.code = (
          <Button
            isLink={true}
            href={`/equipment/details/${equipment.code}`}
            styles={["small"]}
          >
            <i className="mdi mdi-bulldozer" aria-hidden="true" />{" "}
            {equipment.code}
          </Button>
        );
        return equipment;
      });
      setEquipments(response.equipments);
    } catch (error) {
      console.log(error);
    }
  }
};

export default ConstructionSiteDetails;
