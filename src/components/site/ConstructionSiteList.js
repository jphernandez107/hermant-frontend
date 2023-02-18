import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import "./ConstructionSiteList.css";

import Button from "../button/Button"
import List from "../list/List"

const api = require("../../api/Api");

const ConstructionSiteList = () => {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    fetchSites();
  }, []);
  
  const navigate = useNavigate()

  const columns = [
    { code: "Código" },
    { name: "Nombre" },
    { province: "Provincia" },
    { district: "Departamento" },
    { total_equipments: "Equipos" },
    { finish_date: "Fin" },
    { observations: "Observaciones" },
  ];

  function onRowClicked(code) {
    navigate('/site/details/' + code)
  }

  return (
    <List table_columns={columns} table_data={sites} title={'Obras'} onRowClicked={onRowClicked}>
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
