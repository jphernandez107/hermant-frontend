import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EquipmentDetails.css";

import Button from "../../button/Button";
import Table from "../../table/Table";
import TableHeader from "../../table/TableHeader";

const api = require("../../../api/Api");

const EquipmentDetails = () => {
  const { code } = useParams()
  const lubricationSheetHref = "/lubricationsheet/new/" + code;
  const [equipment, setEquipment] = useState(null);
  const [maintenances, setMaintenances] = useState([]);
  const [repairs, setRepairs] = useState([]);

  useEffect(() => {
    fetchEquipment();
  }, []);

  

  const columns_table_1 = [
    { code: "Patente", style: ["center-text"] },
    { brand: "Marca", style: ["center-text"] },
    { model: "Modelo", style: ["center-text"] },
    { serial_number: "S/N", style: ["center-text"] },
    { origin: "Origen", style: ["center-text"] },
  ];

  const columns_table_2 = [
    { manuf_date: "Año", style: ["center-text"] },
    { service_date: "Fecha Servicio", style: ["center-text"] },
    { power: "Potencia", style: ["center-text"] },
    { weight: "Peso", style: ["center-text"] },
    { price: "Precio", style: ["center-text"] },
  ];

  const columns_table_3 = [
    { total_hours: "Horómetro", style: ["center-text"] },
    { construction_site: "Obra", style: ["center-text"] },
    { partial_hours: "Mantenimiento", style: ["center-text"] },
    { observations: "Observaciones", style: ["center-text"] },
  ];

  const maintenance_table_columns = [
    { maintenance_frequency_id: "Frecuencia", style: ["center-text"] },
    { created_at: "Fecha", style: ["center-text"] },
    { equipment_total_hours: "Horas Totales", style: ["center-text"] },
    { maintenance_cost: "Costo", style: ["center-text"] },
    { observations: "Observaciones", style: ["center-text"] },
  ];

  const editButton = () => {
    if (!equipment) return
		const href = "/equipment/edit/" + equipment.code;
		return (
			<Button isLink={true} href={href} >
				<i className="fas fa-pencil" aria-hidden="true" /> {" Editar"}
			</Button>
		);
  };

  return equipment ? (
    <div className="details-page">
      <div className="details-header">
        <TableHeader showSearchBar={false} button={editButton}>{`${equipment.designation} ${equipment.brand} ${equipment.model} ${equipment.code} `}</TableHeader>
      </div>
      <div className="details-wrapper">
        <div className="lubrication-sheet">
          <Button isLink={true} href={lubricationSheetHref}>
            <i className="fas fa-pencil" aria-hidden="true" /> {" Planilla de mantenimiento"}
          </Button>
        </div>
        <div className="basic-details">
          <Table
            className={"details-table"}
            columns={columns_table_1}
            data={[equipment]}
            showSearchBar={false}
          />
          <Table
            className={"details-table"}
            columns={columns_table_2}
            data={[equipment]}
            showSearchBar={false}
          />
        </div>
        <div className="other-details">
          <Table
            columns={columns_table_3}
            data={[equipment]}
            showSearchBar={false}
          />
        </div>
        <div className="maintenances-table">
          <Table
            columns={maintenance_table_columns}
            data={maintenances}
            title={"Mantenimientos"}
          />
        </div>
        <div className="repairs-table">
          <Table
            columns={maintenance_table_columns}
            data={maintenances}
            title={"Reparaciones"}
          />
        </div>
      </div>
    </div>
  ) : (<></>);

  async function fetchEquipment() {
    try {
      const response = await api.getEquipmentByCode(code);
      if (response.construction_sites.length > 0) {
        response.construction_site = (
          <Button
            isLink={true}
            href={`/site/details/${response.construction_sites[0].code}`}
            styles={["small"]}
          >
            <i className="mdi mdi-worker" aria-hidden="true" />{" "}
            {response.construction_sites[0].name}
          </Button>
        );
      }
      setEquipment(response);
      setMaintenances(response.maintenances)
      setRepairs(response.repairs)
    } catch (error) {
      console.log(error);
    }
  }
};

export default EquipmentDetails;
