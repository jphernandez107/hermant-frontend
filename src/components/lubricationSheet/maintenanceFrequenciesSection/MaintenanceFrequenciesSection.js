import React from "react";
import Button from "../../button/Button";
import Input from "../../input/Input"
import "./MaintenanceFrequenciesSection.css"

const MaintenanceFrequenciesSection = (props) => {

    const { maintenanceFrequencies, setMaintenanceFrequencies } = props

    return (<div className="maintenance-frequencies">
                <div className="maintenance-frequencies-header">
                    <div className="maintenance-frequencies-header-title">
                        <h4 className="maintenance-frequencies-title">
                            <i className="fa-solid fa-wrench" aria-hidden="true" />{" "}
                            {" Mantenimientos"}
                        </h4>
                        {getAddRemoveFrequencyButtons(maintenanceFrequencies, setMaintenanceFrequencies)}
                    </div>
                    <label>
                        {`Configure las distintas frecuencias de mantenimiento de mayor a menor [Hs/Km]`}
                    </label>
                </div>
                <div className="maintenance-frequencies-body">
                    {getMaintenanceFrequencies(maintenanceFrequencies, setMaintenanceFrequencies)}
                </div>
            </div>
    )

    function getAddRemoveFrequencyButtons(maintenanceFrequencies, setMaintenanceFrequencies) {
		const handleAddFrequencyButton = (e) => {
			e.preventDefault();
            const freqs = [...maintenanceFrequencies]
            freqs.push({
                id: freqs.length + 1,
                frequency: null
            })
            setMaintenanceFrequencies(freqs)
		};
		const handleRemoveFrequencyButton = (e) => {
			e.preventDefault();
            const freqs = [...maintenanceFrequencies]
            freqs.pop()
            setMaintenanceFrequencies(freqs)
		};

		const buttons = [];
		if (maintenanceFrequencies.length > 1) {
			buttons.push( 
				<Button
					key={'remove-last-maintenance-frequency'}
					styles={["small", "outline"]}
					onClick={(e) => handleRemoveFrequencyButton(e)}
				>
					<i className={"fa fa-minus"} />
				</Button>
			);
		}
		buttons.push(<Button
			key={'add-new-maintenance-frequency'}
			styles={["small", "outline"]}
			onClick={(e) => handleAddFrequencyButton(e)}
		>
			<i className={"fa fa-plus"}/>
		</Button>)
		return <div>{buttons}</div>;
	}

	function getMaintenanceFrequencies(maintenanceFrequencies, setMaintenanceFrequencies) {
		let freqs = maintenanceFrequencies.map((freq) => {
			return createMaintenanceFrequencyInput(freq.id, setMaintenanceFrequencies);
		});
		return freqs;
	}

	function createMaintenanceFrequencyInput(name, setMaintenanceFrequencies) {
		function handleInputChange(e) {
			const name = parseInt(e.target.name);
			const value = e.target.value;
			if (value && value !== "") {
				const freqs = [...maintenanceFrequencies];
                const freq = freqs.find((freq) => parseInt(freq.id) === name)
                if(freq) freq.frequency = value;
				setMaintenanceFrequencies(freqs);
			} 
		}

		return (
			<div className="maintenance-frequency-container" key={name}>
				<label key={name}>{`Frequencia ${name}`}</label>
                <Input
					key={`freq-input-${name}`}
                    type={"number"}
					name={name}
					onBlur={handleInputChange}
                />
			</div>
		);
	}
}

export default MaintenanceFrequenciesSection;