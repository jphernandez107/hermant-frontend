import { Routes, Route, useLocation, matchPath } from 'react-router-dom';
import "./Home.scss"


import Sidebar from "components/sidebar/Sidebar";
import Login from "components/user/login/Login";
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
import Error from 'components/error/Error';
import UserList from 'components/user/list/UserList';
import NewUser from 'components/user/new/NewUser';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from 'react-query';
import useOrientation from 'components/hooks/UseOrientation';
import Navbar from 'components/components/navbar/Navbar';

const routes = [
	{ path: "*", element: <Error /> },
	{ path: "/", element: <MaintenancesCalendar /> },
	{ path: "/signin", element: <Login /> },
	{ path: "/equipment/list", element: <EquipmentList /> },
	{ path: "/equipment/details/:code", element: <EquipmentDetails /> },
	{ path: "/equipment/details/lubricationsheet/:code", element: <LubricationSheetDetails /> },
	{ path: "/equipment/new", element: <NewEquipment /> },
	{ path: "/equipment/edit/:code", element: <NewEquipment /> },
	{ path: "/equipment/hours", element: <EquipmentUseHour /> },
	{ path: "/equipment/details/maintenance/new/:code", element: <NewMaintenance /> },
	{ path: "/site/list", element: <ConstructionSiteList /> },
	{ path: "/site/details/:code", element: <ConstructionSiteDetails /> },
	{ path: "/site/new", element: <NewConstructionSite /> },
	{ path: "/site/edit/:code", element: <NewConstructionSite /> },
	{ path: "/part/list", element: <SparePartList /> },
	{ path: "/part/new", element: <NewSparePart /> },
	{ path: "/lubricationsheet/new/:code", element: <NewLubricationSheet /> },
	{ path: "/user/list", element: <UserList /> },
	{ path: "/user/new", element: <NewUser /> },
]; 

const queryClient = new QueryClient();

const Home = () => {
	const location = useLocation();
	const isPortrait = useOrientation();
	const pathname = location.pathname; 
	const showSideBar = routes.some(route => {
		if (route.path === "*" || route.path === "/signin") return false
		const match = matchPath({ path: route.path, end: true }, pathname);
		return match !== null;
	});


	return(
		<QueryClientProvider client={queryClient} >
			<div className={`home ${isPortrait ? 'portrait' : ''}`}>
				<Toaster position="top-center" richColors />
				{showSideBar && (isPortrait ? <Navbar/> : <Sidebar className='sidebar'/>)}
				<Routes> 
					{routes.map((route, index) => (
						<Route key={index} path={route.path} element={route.element} />
					))}
				</Routes>   
			</div>
		</QueryClientProvider>
	)
 
}
 
export default Home;