import React, { useCallback, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Popover } from "react-tiny-popover";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./MaintenancesCalendar.scss";
import { useNavigate } from "react-router-dom";
import NextMaintenancesList from "./NextMaintenancesList";
import { useQuery } from "react-query";
import Loader from "components/components/loader/Loader";

const api = require("api/Api").default;
const localizer = momentLocalizer(moment);

const MaintenancesCalendar = () => {
	const navigate = useNavigate();
	const [eventPopoverOpen, setEventPopoverOpen] = useState();
	const [currentDate, setCurrentDate] = useState(new Date());
	const [isExpanded, setIsExpanded] = useState(false);
	const expandedStyle = isExpanded ? 'expanded' : 'not-expanded'

	const {
		data: maintenanceEvents = [],
		isLoading,
		isError,
		error,
		isSuccess,
	} = useQuery("nextMaintenances", fetchNextMaintenances);

	const onSelectEvent = useCallback((event) => {
		const code = event.equipment_code;
		if (isExpanded) navigate("/equipment/details/" + code);
		else setCurrentDate(event.start);
	});

	const components = {
		eventWrapper: ({ event, children }) => (
			<div
				className="popover-div"
				onMouseOver={(e) => {
					if (isExpanded) setEventPopoverOpen(event.id);
				}}
				onMouseLeave={(e) => {
					if (isExpanded) setEventPopoverOpen(undefined);
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
		)
	};

	const onSelectSlot = useCallback((slotInfo) => {
		setCurrentDate(slotInfo.start);
	}, []);

	return (
		<>
			{isLoading 
			? <Loader text={"Cargando próximos mantenimientos..."}/> 
			: <div className="calendar-box">
				<ToolbarCalendar currentDate={currentDate} isExpanded={isExpanded} onNavigate={onNavigate} toggleExpanded={toggleExpanded}/>
				<div className="calendar-content">
					<div className={`calendar-wrapper ${expandedStyle}`}>
						<Calendar
							localizer={localizer}
							events={getEventsByStyle(maintenanceEvents, isExpanded)}
							onSelectEvent={onSelectEvent}
							onSelectSlot={onSelectSlot}
							eventPropGetter={eventPropGetter}
							max={new Date("3/10/2023, 10:00:00 PM")}
							min={new Date("3/10/2023, 07:00:00 AM")}
							components={components}
							popup
							selectable={true}
							toolbar={false}
							date={currentDate}
							defaultDate={currentDate}
							onNavigate={onNavigate}
							defaultView="month"
							views={{month: true, week: false, day: false, agenda: false}}
						/>
					</div>
					{!isExpanded && <div className={`calendar-equipments-list ${expandedStyle}`}>
						<NextMaintenancesList selectedDate={currentDate} events={maintenanceEvents.filter(event => {
							const eventDate = new Date(event.start).toDateString();
							return eventDate === currentDate.toDateString();
						})} />
					</div>}
				</div>
			</div>}
		</>
	);

	async function fetchNextMaintenances() {
		const reponse =  await api.getNextMaintenances();
		return parseEventsFromResponse(reponse);
	}

	function eventPropGetter(event, start, end, isSelected) {
		return {
			className: `event ${expandedStyle}`
		};
	}

	function parseEventsFromResponse(response) {
		const events = [];
		response.forEach((nextMaintenance) => {
			const title = `${nextMaintenance.equipment.code} - ${nextMaintenance.maintenance_frequency.frequency}Hs`;
			events.push({
				id: events.length,
				title,
				start: new Date(nextMaintenance.maintenance_date),
				end: new Date(nextMaintenance.maintenance_date),
				equipment_code: nextMaintenance.equipment.code,
				equipment: nextMaintenance.equipment,
				next_maintenance: nextMaintenance,
				allDay: true,
			});
		});
		return events;
	}

	function getEventsByStyle(maintenanceEvents, isExpanded) {	
		if (isExpanded) {
			return maintenanceEvents;
		} else {
			const events = [];
			const dates = [];
			maintenanceEvents.forEach(event => {
				const eventDate = new Date(event.start).toDateString();
				if (dates.includes(eventDate)) {
					const index = events.findIndex(e => new Date(e.start).toDateString() === eventDate);
					events[index].title = parseInt(events[index].title) + 1;
				} else {
					dates.push(eventDate);
					const newEvent = structuredClone(event);
					newEvent.title = 1;
					events.push(newEvent);
				}
			});
			return events;
		}
	}

	function onNavigate(action) {
		let newDate = new Date(currentDate);
		switch (action) {
			case 'TODAY':
				newDate = new Date();
				break;
			case 'PREV':
				newDate.setMonth(currentDate.getMonth() - 1);
				break;
			case 'NEXT':
				newDate.setMonth(currentDate.getMonth() + 1); 
				break;
			default:
				break;
		}
		setCurrentDate(newDate);
	}

	function toggleExpanded() {
		setIsExpanded(!isExpanded);
	}
};

export default MaintenancesCalendar;

const ToolbarCalendar = ({ currentDate, isExpanded, toggleExpanded, onNavigate }) => {
	const label = currentDate.toLocaleString(navigator.language, {
		month: "long",
		year: "numeric"
	});

	const navigate = (action) => {
		if (onNavigate) onNavigate(action);
	};
	
	return (
		<div className="calendar-toolbar">
			<div className="header">
				<div className={"prev-button"} onClick={() => navigate('PREV')}>
					<i className={"far fa-chevron-left"}/>
				</div>
				<span className="calendar-toolbar-label" onClick={() => navigate('TODAY')}>{label}</span>
				<div className={"next-button"} onClick={() => navigate('NEXT')}>
					<i className={"far fa-chevron-right"}/>
				</div>
			</div>
			<div className="expand-button">
				<i className={`far ${isExpanded ? 'fa-compress-alt' : 'fa-expand-alt'}`} onClick={() => toggleExpanded()}/>
			</div>
		</div>
	);
}