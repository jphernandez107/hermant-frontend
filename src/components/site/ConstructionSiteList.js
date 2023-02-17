import React, { useEffect, useState } from "react";
import "./ConstructionSiteList.css";

import Button from "../button/Button"
import List from "../list/List"

const api = require("../../api/Api");

const ConstructionSiteList = () => {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    fetchSites();
  }, []);

  const columns = [
    { code: "Código" },
    { name: "Nombre" },
    { province: "Provincia" },
    { district: "Departamento" },
    { total_equipments: "Equipos" },
    { finish_date: "Fin" },
    { observations: "Observaciones" },
  ];

  return (
    <List table_columns={columns} table_data={sites} title={'Obras'}>
      <Button isLink={true} href={`new`}>
        <i className="fas fa-plus" aria-hidden="true" /> Nueva Obra
      </Button>
    </List>
  );

  async function fetchSites() {
    try {
      const response = await api.getConstructionSiteList();
      response.map((site) => {
        site.total_equipments = site.equipments.length;
      });
      setSites(response);
    } catch (error) {
      console.log(error);
    }
  }
};

export default ConstructionSiteList;
