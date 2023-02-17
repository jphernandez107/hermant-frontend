import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EquipmentDetails.css";

import Button from "../../button/Button";
import Table from "../../table/Table";
import TableHeader from "../../table/TableHeader";

const api = require("../../../api/Api");

const EquipmentDetails = () => {
  const { code } = useParams()
  const equip = {
      id: 23,
      code: "EQ-01",
      brand: "Komatsu",
      model: "140K",
      designation: "Motoniveladora",
      total_hours: 100,
      partial_hours: 50,
      serial_number: "SN-01",
      origin: "Country Z",
      manuf_date: "2022-01-01",
      service_date: "2022-12-31",
      power: 200,
      weight: 1000,
      price: 10000,
      observations: "Observations about the equipment",
      site_importance: 3,
      lubrication_sheet_id: 971,
      created_at: "2023-02-02T20:15:28.000Z",
      updated_at: "2023-02-07T14:32:21.000Z",
      lubricationSheetId: 971,
      construction_sites: [
        {
          id: 4,
          code: "S02",
          name: "Dique Susques",
          district: "Susques",
          province: "Jujuy",
          init_date: "2019-01-01",
          finish_date: "2021-01-01",
          max_temp: 22,
          min_temp: -8,
          altitude: 3900,
          dust: null,
          distance: 203,
          observations: null,
          created_at: "2023-01-31T23:54:31.000Z",
          updated_at: "2023-01-31T23:54:47.000Z",
          equipment_construction_site: {
            id: 3,
            equipment_id: 23,
            construction_site_id: 4,
            created_at: "2023-02-02T21:33:22.000Z",
            updated_at: "2023-02-02T21:33:22.000Z",
          },
        },
      ],
      maintenances: [
        {
          id: 17,
          equipment_id: 23,
          maintenance_frequency_id: 1,
          equipment_partial_hours: 50,
          equipment_total_hours: 100,
          maintenance_cost: 57,
          maintenance_duration: 6,
          maintenance_date: "2023-02-07T14:33:58.000Z",
          observations: null,
          created_at: "2023-02-07T14:33:58.000Z",
          updated_at: "2023-02-07T14:33:58.000Z",
        },
        {
          id: 16,
          equipment_id: 23,
          maintenance_frequency_id: 1,
          equipment_partial_hours: 50,
          equipment_total_hours: 100,
          maintenance_cost: 57,
          maintenance_duration: 6,
          maintenance_date: "2023-02-03T00:00:00.000Z",
          observations: null,
          created_at: "2023-02-07T13:40:43.000Z",
          updated_at: "2023-02-07T13:40:43.000Z",
        },
        {
          id: 15,
          equipment_id: 23,
          maintenance_frequency_id: 1,
          equipment_partial_hours: 50,
          equipment_total_hours: 100,
          maintenance_cost: 0,
          maintenance_duration: 6,
          maintenance_date: "2023-02-03T00:00:00.000Z",
          observations: null,
          created_at: "2023-02-07T13:40:21.000Z",
          updated_at: "2023-02-07T13:40:21.000Z",
        },
        {
          id: 14,
          equipment_id: 23,
          maintenance_frequency_id: 1,
          equipment_partial_hours: 50,
          equipment_total_hours: 100,
          maintenance_cost: 0,
          maintenance_duration: 6,
          maintenance_date: "2023-02-03T00:00:00.000Z",
          observations: null,
          created_at: "2023-02-07T13:39:48.000Z",
          updated_at: "2023-02-07T13:39:48.000Z",
        },
        {
          id: 13,
          equipment_id: 23,
          maintenance_frequency_id: 1,
          equipment_partial_hours: 50,
          equipment_total_hours: 100,
          maintenance_cost: 0,
          maintenance_duration: 6,
          maintenance_date: "2023-02-03T00:00:00.000Z",
          observations: null,
          created_at: "2023-02-07T13:38:29.000Z",
          updated_at: "2023-02-07T13:38:29.000Z",
        },
        {
          id: 12,
          equipment_id: 23,
          maintenance_frequency_id: 1,
          equipment_partial_hours: 50,
          equipment_total_hours: 100,
          maintenance_cost: 0,
          maintenance_duration: 6,
          maintenance_date: "2023-02-03T00:00:00.000Z",
          observations: null,
          created_at: "2023-02-07T13:37:07.000Z",
          updated_at: "2023-02-07T13:37:07.000Z",
        },
        {
          id: 11,
          equipment_id: 23,
          maintenance_frequency_id: 1,
          equipment_partial_hours: 50,
          equipment_total_hours: 100,
          maintenance_cost: 223,
          maintenance_duration: 6,
          maintenance_date: "2023-02-03T00:00:00.000Z",
          observations: null,
          created_at: "2023-02-05T14:34:52.000Z",
          updated_at: "2023-02-05T14:34:52.000Z",
        },
        {
          id: 10,
          equipment_id: 23,
          maintenance_frequency_id: 1,
          equipment_partial_hours: 50,
          equipment_total_hours: 100,
          maintenance_cost: 0,
          maintenance_duration: 6,
          maintenance_date: "2023-02-03T00:00:00.000Z",
          observations: null,
          created_at: "2023-02-05T14:34:11.000Z",
          updated_at: "2023-02-05T14:34:11.000Z",
        },
        {
          id: 9,
          equipment_id: 23,
          maintenance_frequency_id: 1,
          equipment_partial_hours: 50,
          equipment_total_hours: 100,
          maintenance_cost: 0,
          maintenance_duration: 6,
          maintenance_date: "2023-02-03T00:00:00.000Z",
          observations: null,
          created_at: "2023-02-05T14:33:03.000Z",
          updated_at: "2023-02-05T14:33:03.000Z",
        },
        {
          id: 8,
          equipment_id: 23,
          maintenance_frequency_id: 1,
          equipment_partial_hours: 50,
          equipment_total_hours: 100,
          maintenance_cost: 0,
          maintenance_duration: 6,
          maintenance_date: "2023-02-03T00:00:00.000Z",
          observations: null,
          created_at: "2023-02-05T14:30:53.000Z",
          updated_at: "2023-02-05T14:30:53.000Z",
        },
        {
          id: 7,
          equipment_id: 23,
          maintenance_frequency_id: 1,
          equipment_partial_hours: 50,
          equipment_total_hours: 100,
          maintenance_cost: 0,
          maintenance_duration: 6,
          maintenance_date: "2023-02-03T00:00:00.000Z",
          observations: null,
          created_at: "2023-02-05T14:29:54.000Z",
          updated_at: "2023-02-05T14:29:54.000Z",
        },
        {
          id: 6,
          equipment_id: 23,
          maintenance_frequency_id: 1,
          equipment_partial_hours: 50,
          equipment_total_hours: 100,
          maintenance_cost: 0,
          maintenance_duration: 6,
          maintenance_date: "2023-02-03T00:00:00.000Z",
          observations: null,
          created_at: "2023-02-05T14:28:52.000Z",
          updated_at: "2023-02-05T14:28:52.000Z",
        },
        {
          id: 5,
          equipment_id: 23,
          maintenance_frequency_id: 1,
          equipment_partial_hours: 50,
          equipment_total_hours: 100,
          maintenance_cost: 0,
          maintenance_duration: 6,
          maintenance_date: "2023-02-03T00:00:00.000Z",
          observations: null,
          created_at: "2023-02-05T14:27:47.000Z",
          updated_at: "2023-02-05T14:27:47.000Z",
        },
        {
          id: 4,
          equipment_id: 23,
          maintenance_frequency_id: 1,
          equipment_partial_hours: 50,
          equipment_total_hours: 100,
          maintenance_cost: 0,
          maintenance_duration: 6,
          maintenance_date: "2023-02-03T00:00:00.000Z",
          observations: null,
          created_at: "2023-02-05T14:24:58.000Z",
          updated_at: "2023-02-05T14:24:58.000Z",
        },
      ],
    };
  const [equipments, setEquipments] = useState([equip]);
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

  return (
    <div className="details-page">
      <div className="details-header">
        <TableHeader showSearchBar={false}>{`${equipments[0].designation} ${equipments[0].brand} ${equipments[0].model} ${equipments[0].code} `}</TableHeader>
      </div>
      <div className="details-wrapper">
        <div className="basic-details">
          <Table
            className={"details-table"}
            columns={columns_table_1}
            data={equipments}
            showSearchBar={false}
          />
          <Table
            className={"details-table"}
            columns={columns_table_2}
            data={equipments}
            showSearchBar={false}
          />
        </div>
        <div className="other-details">
          <Table
            columns={columns_table_3}
            data={equipments}
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
  );

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
      setEquipments([response]);
      setMaintenances(response.maintenances)
      setRepairs(response.repairs)
    } catch (error) {
      console.log(error);
    }
  }
};

export default EquipmentDetails;
