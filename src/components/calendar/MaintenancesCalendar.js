import React, { useCallback, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Popover, ArrowContainer } from "react-tiny-popover";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./MaintenancesCalendar.scss";
import { useNavigate } from "react-router-dom";

const api = require("api/Api").default;
const localizer = momentLocalizer(moment);

const MaintenancesCalendar = () => {
	const navigate = useNavigate();
	const [equipments, setEquipments] = useState([]);
	const [eventPopoverOpen, setEventPopoverOpen] = useState();
	const [maintenanceEvents, setMaintenanceEvents] = useState([]);

	useEffect(() => {
		fetchEquipments();
	}, []);

	const onSelectEvent = useCallback((event) => {
		const code = event.equipment_code;
		navigate("/equipment/details/" + code);
	});

	const components = {
		eventWrapper: ({ event, children }) => (
			<div
				className="popover-div"
				onMouseOver={(e) => {
					setEventPopoverOpen(event.id);
					console.log(event.equipment)
				}}
				onMouseLeave={(e) => {
					setEventPopoverOpen(undefined);
				}}
			>
				<Popover
					eventId={event.id}
					isOpen={eventPopoverOpen === event.id}
					position={["top", "right"]}
					padding={10}
					content={({ position, targetRect, popoverRect }) => ( event.equipment &&
							<div className="details-popover-container">
								<span>{event.equipment.designation} {event.equipment.brand} {event.equipment.model}</span>
								<p>Horas parciales: {event.equipment.partial_hours}Hs</p>
								<p>Mantenimiento: {event.next_maintenance.maintenance_frequency.frequency}Hs</p>
							</div>
					)}
				>
					{children}
				</Popover>
			</div>
		),
	};

	return (
		<div className="calendar-box">
			<div className="calendar-wrapper">
				<Calendar
					localizer={localizer}
					events={maintenanceEvents}
					onSelectEvent={onSelectEvent}
					eventPropGetter={eventPropGetter}
					max={new Date("3/10/2023, 10:00:00 PM")}
					min={new Date("3/10/2023, 07:00:00 AM")}
					components={components}
					popup
				/>
			</div>
		</div>
	);

	async function fetchEquipments() {
		try {
			const response = await api.getEquipmentList();

			const events = [];
			response.forEach((equipment) => {
				const next_maintenances = equipment.next_maintenances || [];
				next_maintenances.forEach((next_maintenance) => {
					const title = `${equipment.code} - ${next_maintenance.maintenance_frequency.frequency}Hs`;
					events.push({
						id: events.length,
						title,
						start: new Date(next_maintenance.maintenance_date),
						end: new Date(next_maintenance.maintenance_date),
						equipment_code: equipment.code,
						equipment,
						next_maintenance,
						allDay: true,
					});
				});
			});
			setMaintenanceEvents(events);
			setEquipments(response);
		} catch (error) {
			console.log(error);
		}
	}

	function eventPropGetter(event, start, end, isSelected) {
		return {
			className: "test-event",
			style: {},
		};
	}
};

export default MaintenancesCalendar;
