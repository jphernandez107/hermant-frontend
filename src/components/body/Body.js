import React, { useState } from "react";
import "./Body.scss";

import { Route, Routes } from "react-router-dom";
import EquipmentList from "../equipment/list/EquipmentList";
import ConstructionSiteList from "../site/list/ConstructionSiteList";
import SparePartList from "../sparePart/list/SparePartList";
import EquipmentDetails from "../equipment/details/EquipmentDetails";
import ConstructionSiteDetails from "../site/details/ConstructionSiteDetails";
import NewEquipment from "../equipment/new/NewEquipment";
import NewConstructionSite from "../site/new/NewConstructionSite";
import NewSparePart from "../sparePart/new/NewSparePart";
import NewLubricationSheet from "../lubricationSheet/NewLubricationSheet";
import LubricationSheetDetails from "../lubricationSheet/details/LubricationSheetDetails";
import EquipmentUseHour from "../equipment/useHour/EquipmentUseHour";
import NewMaintenance from "../maintenance/NewMaintenance"

const Body = () => {
	return (
		<div className="page-wrapper">
			<header></header>
			<div className="body">
				<Routes>
					<Route path="/" element={<EquipmentList />} />
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
					All Rights Reserved by HERMANT®. Designed and developed by
					HERMANT® Company
				</p>
			</footer>
		</div>
	);
};

export default Body;
