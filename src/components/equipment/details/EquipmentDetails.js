import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import "./EquipmentDetails.scss";

import Button from "components/button/Button";
import Table from "components/table/Table";
import PageHeader from "components/pageHeader/PageHeader";
import UseHourList from "components/equipment/useHour/UseHourList";
import Loader from "components/components/loader/Loader";
import useOrientation from "components/hooks/UseOrientation";
import MobileEquipmentDetails from "./MobileEquipmentDetails";
import { getEquipmentImage } from "../EquipmentLogos";

const api = require("api/Api").default;

const EquipmentDetails = () => {
  const { code } = useParams()
  const isPortrait = useOrientation();

  const {
    data: equipment,
    isLoading: isLoadingEquipment,
    isError: isErrorEquipment,
    error: errorEquipment,
  } = useQuery(`equipmentCode=${code}`, fetchEquipment);
  
  const {
    data: equipmentHours = [],
    isLoading: isLoadingEquipmentHours,
    isError: isErrorEquipmentHours,
    error: errorEquipmentHours,
  } = useQuery(`equipmentHoursCode=${code}`, fetchEquipmentHours);

  const viewLubricationSheetHref = () => {
    return equipment.lubrication_sheet_id ? "lubricationsheet/" + code : "/lubricationsheet/new/" + code;
  }

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
    { next_maintenance: "Mantenimiento", style: ["center-text"] },
    { observations: "Observaciones", style: ["center-text"] },
  ];

  const maintenance_table_columns = [
    { maintenance_frequency_value: "Frecuencia", style: ["center-text"] },
    { created_at: "Fecha", style: ["center-text"] },
    { equipment_total_hours: "Horas Totales", style: ["center-text"], value_modifiers: {suffix: "Hs"} },
    { equipment_partial_hours: "Horas Parciales", style: ["center-text"], value_modifiers: {suffix: "Hs"} },
    { maintenance_cost: "Costo", style: ["center-text"], value_modifiers: {preffix: "$"} },
    { observations: "Observaciones", style: ["center-text"] },
  ];

  const columns_mobile = [...columns_table_1, ...columns_table_2, ...columns_table_3];

  const editButton = () => {
    if (!equipment) return
		const href = "/equipment/edit/" + equipment.code;
		return (
			<Button isLink={true} href={href} styles={["outline"]}>
				<i className="fas fa-pencil" aria-hidden="true" /> {" Editar"}
			</Button>
		);
  };

  return equipment ? isPortrait 
  ? <MobileEquipmentDetails columns={columns_mobile} equipment={equipment} useHours={equipmentHours}/> 
  : (
    <div className="details-page">
      <div className="details-header">
        <PageHeader button={editButton}>
          {`${equipment.designation} ${equipment.brand} ${equipment.model} ${equipment.code} `}
        </PageHeader>
      </div>
      <div className="details-wrapper">
        <div className="lubrication-sheet">
          <Button isLink={true} href={viewLubricationSheetHref()}>
            <i className="far fa-file-check" aria-hidden="true" /> {" Planilla de mantenimiento"}
          </Button>
        </div>
        <div className="equipment-details">
          <div className="basic-details">
            <Table
              className={"details-table"}
              columns={columns_table_1}
              data={[equipment]}
              showSearchBar={false}
              style={['single', 'no-hover']}
            />
            <Table
              className={"details-table"}
              columns={columns_table_2}
              data={[equipment]}
              showSearchBar={false}
              style={['single', 'no-hover']}
            />
          </div>
          <div className="other-details">
            <Table
              columns={columns_table_3}
              data={[equipment]}
              showSearchBar={false}
              style={['single', 'no-hover']}
            />
          </div>
        </div>
        <div className="maintenances-table-container">
          <div className="maintenances-table-header">
            <h4>
              Mantenimientos
            </h4>
            {equipment.lubrication_sheet_id && <Button isLink={true} href={"/equipment/details/maintenance/new/" + code}>
              <i className="fa-solid fa-plus" />{""}
            </Button>}
          </div>
          <Table
            columns={maintenance_table_columns}
            data={equipment.maintenances}
            showSearchBar={false}
            style={["no-card"]}
            emptyTableTitle={"No se encontraron mantenimientos"}
          />
        </div>
        <UseHourList useHours={equipmentHours} />
        {/* <div className="repairs-table">
          <Table
            columns={maintenance_table_columns}
            data={maintenances}
            title={"Reparaciones"}
          />
        </div> */}
      </div>
    </div>
  ) : isLoadingEquipment ? (<Loader text={"Cargando equipo..."}/>) : (<></>);

  async function fetchEquipment() {
      const response = await api.getEquipmentByCode(code);
      response.construction_site_string = response.construction_site?.name || "-";
      if (response.construction_site) {
        response.construction_site = (
          <Button
            isLink={true}
            href={`/site/details/${response.construction_site.code}`}
            styles={["small", "outline"]}
          >
            <i className="fa-solid fa-helmet-safety" aria-hidden="true" />{" "}
            {response.construction_site.name}
          </Button>
        );
      }
      response.maintenances = response.maintenances.map((maint) => {
        return {
          ...maint,
          maintenance_frequency_value: maint.maintenance_frequency.frequency
        }
      })
      response.image = getEquipmentImage(response);
      return response;
  }

  async function fetchEquipmentHours() {
    return await api.getEquipmentHoursByCode(code);
  }
};

export default EquipmentDetails;
