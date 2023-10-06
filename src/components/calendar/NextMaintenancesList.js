import "./NextMaintenancesList.scss"
import { getEquipmentImage } from "../equipment/EquipmentLogos";
import { useNavigate } from 'react-router-dom'

const NextMaintenancesList = (props) => {
	const navigate = useNavigate();
	const nextMaintenances = getNextMaintenances(props.events);
	const selectedDate = props.selectedDate.toLocaleString(navigator.language, {
		month: 'long',
		weekday: 'long',
		day: 'numeric',
		year: 'numeric'
	});

	const onItemClick = (nextMaintenance) => {
		const code = nextMaintenance.equipment_code;
		navigate('/equipment/details/' + code)
	}

	return (
		<div className="next-maintenances-list">
			<div className="next-maintenances-list-date">{selectedDate}</div>
			{nextMaintenances.length > 0 && nextMaintenances.map((nextMaintenance) => (
				<div key={nextMaintenance.id} className="next-maintenances-list-item" onClick={(e) => onItemClick(nextMaintenance)}>
					<div className="next-maintenances-list-item-left">
						<div className="next-maintenances-list-item-image">
							<img className="" src={nextMaintenance.image}/>
						</div>
						<div className="next-maintenances-list-item-description">
							<span className="next-maintenances-list-item-title">{nextMaintenance.title}</span>
							<span className="next-maintenances-list-item-subtitle">{nextMaintenance.subtitle}</span>
						</div>
					</div>
					<div className="next-maintenances-list-item-hours">
						{nextMaintenance.hours}Hs
					</div>
				</div>
			))}
			{nextMaintenances.length === 0 && <span className="next-maintenances-list-empty-list-text">Lista vacía</span>}
		</div>
	);

	function getNextMaintenances(events) {
		return events.map(event => {
			return {
				id: event.id,
				title: `${event.equipment.code} ${event.equipment.brand} ${event.equipment.model}`,
				subtitle: `${event.equipment.designation}`,
				hours: `${event.next_maintenance.maintenance_frequency.frequency}`,
				image: getEquipmentImage(event.equipment),
				equipment_code: event.equipment.code,
			}
		})
	}
}

export default NextMaintenancesList;