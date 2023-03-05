import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./EquipmentUseHour.scss";

import Table from "../../table/Table";

const api = require("../../../api/Api");

const EquipmentUseHour = () => {
	const [equipments, setEquipments] = useState([]);

	useEffect(() => {
		fetchEquipments();
	});

	const columns = [
		{ code: "Patente" },
		{ designation: "Designación" },
		{ brand: "Marca" },
		{ model: "Modelo" },
		{ total_hours: "Hr/Km" },
		{ add_hours: "Agregar horas", style: ["padding-zero"] },
	];

    const onAddButtonClick = (e, hoursValue, dateValue, code) => {
        if (hoursValue <= 0) return
        const body = {
            hours_to_add: hoursValue,
            date: dateValue
        }
        api.addEquipmentUseHours(body, code)
    };

	return (
		<Table
			style={["first-column-bold"]}
			columns={columns}
			data={equipments}
			title={"Administrar horas de uso"}
			showSearchBar={false}
		/>
	);

	async function fetchEquipments() {
		try {
			const response = await api.getEquipmentList();
			response.forEach((equipment) => {
				equipment.add_hours = getUseHoursInput(equipment.code);
			});
			setEquipments(response);
		} catch (error) {
			console.log(error);
		}
	}

	function getUseHoursInput(code) {
        return (
			<div className="use-hours-container">
				<UseHourInput
					equipment_code={code}
					onAddButtonClick={onAddButtonClick}
				/>
			</div>
		);
	}
};


/***** UseHourInput Component *****/

const UseHourInput = (props) => {
	const { equipment_code, onAddButtonClick } = props;
	const [hoursValue, setHoursValue] = useState(0);
	const [dateValue, setDateValue] = useState(new Date());

    const [localeData, setLocaleData] = useState()

	const handleHoursChange = (e) => {
		e.preventDefault();
        const value = e.target.value
        const hours = (value > 0 
            || value === '.' 
            || value === ',' 
            || value === '') ? value : hoursValue
		setHoursValue(hours);
	};

	const handleDateChange = (date) => {
		setDateValue(date);
	};

	const [datePicker, setDatePicker] = useState(
		<DatePicker
			className="date-input"
			selected={dateValue}
			onChange={(date) => handleDateChange(date)}
		/>
	);

    const lang = navigator.language; 
    useEffect(() => {
        fetchLocale(lang);
    })

    useEffect(() => {
        if(!localeData) return
        const dateFormat = localeData.default.code === "es" ? "dd-MM-yyyy" : "MM-dd-yyyy" 
        setDatePicker(
            <DatePicker
                locale={localeData.default}
                dateFormat={dateFormat}
                className="date-input"
                selected={dateValue}
                onChange={(date) => handleDateChange(date)}
            />
        );
    }, [localeData, dateValue])

	return (
		<div className="hours-wrapper">
			<div className="date-input-container">
				{datePicker}
			</div>
			<div className="date-icon">
				<i className="fa-solid fa-calendar-week" aria-hidden="true"></i>
			</div>
			<div className="hours-input-container">
				<input
					className="hours-input"
					type="number"
					placeholder={"Agregar horas"}
					onChange={handleHoursChange}
					value={hoursValue}
				/>
			</div>
			<div
				className="plus-icon"
				onClick={(e) => {
                    setHoursValue(0)
					onAddButtonClick(e, hoursValue, dateValue, equipment_code)
				}}
			>
				<i className="fa-solid fa-plus" aria-hidden="true"></i>
			</div>
		</div>
	);

    async function fetchLocale(lang) {
		try {
			const locale = await import(`date-fns/locale/${lang}`);
			setLocaleData(locale);
		} catch (error) {
			console.log(error);
		}
	}
};

export default EquipmentUseHour;
