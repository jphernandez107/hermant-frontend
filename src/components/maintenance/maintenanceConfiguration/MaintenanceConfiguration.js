import React, { useEffect, useState } from "react";
import "./MaintenanceConfiguration.scss";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Select from "components/select/Select";
import Input from "components/input/Input";
import Checkbox from "components/checkbox/Checkbox";

const MaintenanceConfiguration = (props) => {
	const { 
		maintenanceFrequencies, 
		selectedFrequency, 
		setSelectedFrequency, 
		setMaintenanceDuration,
		maintenanceDate,
		setMaintenanceDate,
		resetPartialHours,
		setResetPartialHours
	 } = props;

	 useEffect(() => {
		if (!maintenanceFrequencies || maintenanceFrequencies.length < 1) return;
		const maxFrequency = maintenanceFrequencies.max();
		setResetPartialHours(parseInt(selectedFrequency) === parseInt(maxFrequency));
	 }, [selectedFrequency]);

	return (
		<div className="maintenance-configuration-container card">
			<div className="maintenance-configuration-header">
				<div className="maintenance-configuration-header-title">
					<h4 className="maintenance-configuration-title">
						<i className="fa-solid fa-wrench" aria-hidden="true" />{" "}
						{" Mantenimientos"}
					</h4>
				</div>
				<label>
					{`Seleccione el tipo de mantenimiento que desea realizar`}
				</label>
			</div>
			<div className="maintenance-configuration-body">
				<div className="maintenance-configuration-date column-maint">
					<label>{`Fecha`}</label>
					{
						<MaintenanceDatePicker
							dateValue={maintenanceDate}
							setDateValue={setMaintenanceDate}
						/>
					}
				</div>
				<div className="maintenance-configuration-frequency column-maint">
					<label>{`Frequencia`}</label>
					<Select
						defaultValue={selectedFrequency ? selectedFrequency : "none"}
						onChange={(e) => setSelectedFrequency(e.target.value)}
					>
						{getOptionsForSelect(maintenanceFrequencies)}
					</Select>
				</div>
				<div className="maintenance-configuration-time column-maint">
					<label>{`Tiempo empleado [Hs]`}</label>
					<Input
						type="number"
						min={1}
						placeholder={"Tiempo empleado"}
                        onBlur={handleMaintenanceDurationInput}
						value={""}
					></Input>
				</div>
				<div className="maintenance-configuration-reset-partial-hours column-maint">
					<label>{`Restablecer horas parciales`}</label>
					<Checkbox 
						name={'reset-partial-hours'}
						handleCheckboxSelected={(name, isChecked) => {
							setResetPartialHours(isChecked);
						}}
						isChecked={resetPartialHours}
					/>
				</div>
			</div>
		</div>
	);

    function handleMaintenanceDurationInput(e) {
        const value = e.target.value
        setMaintenanceDuration(value)
    }

	function getOptionsForSelect(maintenanceFrequencies) {
		return [
			<option value={"none"} key={"none"} disabled>
				{"Elija una frequencia"}
			</option>,
			...maintenanceFrequencies.map((freq) => (
				<option value={freq} key={freq}>
					{`${freq} [Hs/Km]`}
				</option>
			)),
		];
	}
};

const MaintenanceDatePicker = (props) => {
	const { dateValue, setDateValue } = props;
	const [localeData, setLocaleData] = useState();

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
		<div className="date-wrapper">
			<div className="date-input-container">{datePicker}</div>
			<div className="date-icon">
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

export default MaintenanceConfiguration;