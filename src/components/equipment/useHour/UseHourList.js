import { useEffect, useState } from "react";
import "./UseHourList.scss"

const UseHourList = (props) => {
	const rawUseHours = getUseHours(props.useHours);
	const [useHours, setUseHours] = useState(rawUseHours || [])
	const [selectedMonth, setSelectedMonth] = useState(new Date());

	const selectedMonthString = selectedMonth.toLocaleString(navigator.language, {
		month: 'long',
		year: 'numeric'
	});

	const onPreviousMonth = (e) => {
		const newDate = new Date(selectedMonth);
		newDate.setMonth(selectedMonth.getMonth() - 1);
		setSelectedMonth(newDate);
	}

	const onNextMonth = (e) => {
		const newDate = new Date(selectedMonth);
		newDate.setMonth(selectedMonth.getMonth() + 1);
		if (newDate > new Date()) return;
		setSelectedMonth(newDate);
	}

	const onDateClick = (e) => {
		const newDate = new Date();
		setSelectedMonth(newDate);
	}

	useEffect(() => {
		const filteredUseHours = rawUseHours.filter(useHour => {
			return new Date(useHour.date).getMonth() === selectedMonth.getMonth() && new Date(useHour.date).getFullYear() === selectedMonth.getFullYear();
		});
		setUseHours(filteredUseHours);
	}, [selectedMonth]);

	return (
        <div className="use-hours-table-container">
			<div className="use-hours-table-header">
				<h4>Horas de Uso</h4>
				<div className="use-hours-table-header-right">
					<div className="use-hours-monthly-sum"><span>{getHoursMonthlySum(useHours)}Hs</span></div>
					<div className="use-hours-date-selector">
						<div className="use-hours-date-selector-prev" onClick={onPreviousMonth} ><i className="fas fa-chevron-left"/></div>
						<div className="use-hours-date-selector-label" onClick={onDateClick} ><span>{selectedMonthString}</span></div>
						<div className="use-hours-date-selector-next" onClick={onNextMonth} ><i className="fas fa-chevron-right"/></div>
					</div>
				</div>
			</div>
			<div className="use-hours-list">
				{useHours.length > 0 && useHours.map((useHour) => (
					<div key={useHour.id} className="use-hours-list-item">
						<div className="use-hours-list-item-left">
							<div className="use-hours-list-item-hours-added-container">
								<span className="use-hours-list-item-hours-added">{useHour.hours_to_add}Hs</span>
							</div>
							<div className="use-hours-list-item-description">
								<div className="use-hours-list-item-total-hours"> 
									<i className="far fa-clock"/>
									<span className="use-hours-list-item-total-hours-span">{useHour.total_hours}Hs</span>
								</div>
								<div className="use-hours-list-item-partial-hours"> 
									<i className="far fa-history"/>
									<span className="use-hours-list-item-partial-hours-span">{useHour.partial_hours}Hs</span>
								</div>
							</div>
						</div>
						<div className="use-hours-list-item-right">
							<div className="use-hours-list-item-site">
								<span>{useHour.construction_site?.name || "-"}</span>
								<i className="fas fa-helmet-safety"/>
							</div>
							<div className="use-hours-list-item-date">
								<span>{useHour.string_date}</span>
								<i className="far fa-calendar"/>
							</div>	
						</div>
					</div>
				))}
				{useHours.length === 0 && <span className="use-hours-list-empty-list-text">Lista vacía</span>}
			</div>
		</div>
	);

	function getUseHours(useHours) {
		return useHours.map(useHour => {
			useHour.date = new Date(useHour.date);
			useHour.string_date = new Date(useHour.date).toLocaleString(navigator.language, {
				month: 'long',
				day: 'numeric',
				year: 'numeric'
			});
			return useHour;
		})
	}

	function getHoursMonthlySum(useHours) {
		return useHours.reduce((acc, useHour) => {
			return acc + useHour.hours_to_add;
		}, 0);
	}
}

export default UseHourList;