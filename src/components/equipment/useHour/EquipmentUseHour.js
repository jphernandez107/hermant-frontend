import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./EquipmentUseHour.scss";

import Table from "components/table/Table";
import Input from "components/input/Input";
import Button from "components/button/Button";
import { toast } from "sonner";

const api = require("api/Api").default;

const EquipmentUseHour = () => {
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [useHoursArray, setUseHoursArray] = useState({});
	const [inputValue, setInputValue] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		startDate?.setHours(0,0,0,0);
		endDate?.setHours(23,59,59,999);
		let newUseHoursArray = { ...useHoursArray, start_date: startDate, end_date: endDate };
		setUseHoursArray(newUseHoursArray);
	}, [startDate, endDate]);

	const columns = [
		{ code: "Código" }, 
		{ hours: "Horas" }
	];

	const onAddButtonClick = (e) => {
		if (!useHoursArray.hours || useHoursArray.hours.length === 0) {
			toast.error('No se encontraron horas válidas.');
			return;
		} else if (!startDate || !endDate || startDate > endDate) {
			toast.error('Seleccione fechas válidas.');
			return;
		}
		setLoading(true);
		const user = JSON.parse(localStorage.getItem('user'));
		const body = useHoursArray;
		body["user_id"] = user.id;
		api.postAddEquipmentUseHoursBulk(body)
			.then(() => {
				setUseHoursArray({
					...useHoursArray,
					hours: []
				})
				setInputValue("");
				setLoading(false);
			})
			.catch(error => {
				setLoading(false);
				console.log("🚀 ~ file: EquipmentUseHour.js:57 ~ onAddButtonClick ~ error:", error)
				throw error;
			});
		
	};

	const handleOnPasteInput = (e) => {
		setInputValue(e.target.value);
		const lines = e.target.value.trim().split('\n');
		const resultArray = [];

		for (let i = 0; i < lines.length; i++) {
			const [code, hours] = lines[i].split('\t');
			if(Number.isNaN(parseInt(hours, 10))) continue;
			resultArray.push({ 
				code, 
				hours: parseInt(hours, 10) 
			});
		}

		const result = {
			start_date: startDate,
			end_date: endDate,
			hours: resultArray
		}
		setUseHoursArray(result);
	}

	return (
		<div className="use-hours-list-wrapper">
			<div className='use-hours-page-header'>
				<div className="use-hours-date-pickers">
					<div className="use-hours-date-picker">
						<p className="use-hours-date-picker-label">Desde</p>
						<UseHourDatePicker dateValue={startDate} setDateValue={setStartDate}/>
					</div>
					<div className="use-hours-date-picker">
						<p className="use-hours-date-picker-label">Hasta</p>
						<UseHourDatePicker dateValue={endDate} setDateValue={setEndDate}/>
					</div>
				</div>
				<div className="use-hours-input-table">
					<Input className='use-hours-input' isTextArea rows={30} onChange={handleOnPasteInput} value={inputValue}/>
					<Table className='use-hours-table' style={['first-column-bold', 'center-text', 'single']} columns={columns} data={useHoursArray.hours} showSearchBar={false} />
				</div>
				<Button onClick={onAddButtonClick} disabled={loading}>
					{loading && <><i className="fad fa-spinner-third fa-spin"/> Cargando</>}
					{!loading && <><i className="far fa-clock"/> Agregar horas</>}
				</Button>
			</div>
		</div>
	);

};

/***** UseHourInput Component *****/

const UseHourInput = (props) => {
	const { equipment_code, onAddButtonClick } = props;
	const [hoursValue, setHoursValue] = useState(0);
	const [dateValue, setDateValue] = useState(new Date());

	const [localeData, setLocaleData] = useState();

	const handleHoursChange = (e) => {
		e.preventDefault();
		const value = e.target.value;
		const hours =
			value > 0 || value === "." || value === "," || value === ""
				? value
				: hoursValue;
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
	});

	useEffect(() => {
		if (!localeData) return;
		const dateFormat =
			localeData.default.code === "es" ? "dd-MM-yyyy" : "MM-dd-yyyy";
		setDatePicker(
			<DatePicker
				locale={localeData.default}
				dateFormat={dateFormat}
				className="date-input"
				selected={dateValue}
				onChange={(date) => handleDateChange(date)}
			/>
		);
	}, [localeData, dateValue]);

	return (
		<div className="hours-wrapper">
			<div className="date-input-container">{datePicker}</div>
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
					setHoursValue(0);
					onAddButtonClick(e, hoursValue, dateValue, equipment_code);
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

const UseHourDatePicker = (props) => {
	const { dateValue, setDateValue } = props;
	const [localeData, setLocaleData] = useState();
	const dateInputRef = useRef(null);

	const handleDateChange = (date) => {
		setDateValue(date);
	};

	const handleIconClick = () => {
        if (dateInputRef.current) {
            dateInputRef.current.input.focus();
        }
    }

	const lang = navigator.language;
	useEffect(() => {
		fetchLocale(lang);
	}, [lang]);

	const dateFormat = localeData?.default?.code === "es" ? "dd-MM-yyyy" : "MM-dd-yyyy";

	return (
		<div className="date-wrapper">
			<div className="date-input-container">
				<DatePicker
					ref={dateInputRef}
					locale={localeData?.default}
					dateFormat={dateFormat}
					className="date-input"
					selected={dateValue}
					onChange={handleDateChange}
				/>
			</div>
			<div className="date-icon" onClick={handleIconClick}>
				<i className="fa-solid fa-calendar-week" aria-hidden="true"></i>
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
