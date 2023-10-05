import React from "react";
import "./Body.scss";

import { Route, Routes } from "react-router-dom";
import EquipmentList from "components/equipment/list/EquipmentList";
import ConstructionSiteList from "components/site/list/ConstructionSiteList";
import SparePartList from "components/sparePart/list/SparePartList";
import EquipmentDetails from "components/equipment/details/EquipmentDetails";
import ConstructionSiteDetails from "components/site/details/ConstructionSiteDetails";
import NewEquipment from "components/equipment/new/NewEquipment";
import NewConstructionSite from "components/site/new/NewConstructionSite";
import NewSparePart from "components/sparePart/new/NewSparePart";
import NewLubricationSheet from "components/lubricationSheet/NewLubricationSheet";
import LubricationSheetDetails from "components/lubricationSheet/details/LubricationSheetDetails";
import EquipmentUseHour from "components/equipment/useHour/EquipmentUseHour";
import NewMaintenance from "components/maintenance/NewMaintenance";
import MaintenancesCalendar from "components/calendar/MaintenancesCalendar";

const Body = () => {
	return (
		<div className="page-wrapper">
			<header></header>
			<div className="body">
				<Routes>
					<Route path="/" element={<MaintenancesCalendar />} />
					<Route path="/equipment/list" element={<EquipmentList />} />
					<Route path="/equipment/details/:code" element={<EquipmentDetails />} />
					<Route path="/equipment/details/lubricationsheet/:code" element={<LubricationSheetDetails />} />
					<Route path="/equipment/new" element={<NewEquipment />} />
                    <Route path="/equipment/edit/:code" element={<NewEquipment />} />
					<Route path="/equipment/hours" element={<EquipmentUseHour />} />
					<Route path="/equipment/details/maintenance/new/:code" element={<NewMaintenance />} />
					<Route path="/site/list" element={<ConstructionSiteList />}/>
					<Route path="/site/details/:code" element={<ConstructionSiteDetails />}/>
					<Route path="/site/new" element={<NewConstructionSite />} />
                    <Route path="/site/edit/:code" element={<NewConstructionSite />} />
					<Route path="/part/list" element={<SparePartList />} />
                    <Route path="/part/new" element={<NewSparePart />} />
					<Route path="/lubricationsheet/new/:code" element={<NewLubricationSheet />} />
				</Routes>
			</div>
			<footer className="footer">
				<p>
					All Rights Reserved by CONSTRACTCARE®. Designed and developed by
					CONSTRACTCARE® Company
				</p>
			</footer>
		</div>
	);
};

export default Body;
