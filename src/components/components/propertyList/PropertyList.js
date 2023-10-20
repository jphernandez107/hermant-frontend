import { useState } from "react";
import "./PropertyList.scss";

const PropertyList = ({ properties }) => {
	const [listHidden, setListHidden] = useState(false);

	const onToggleList = () => {
		setListHidden(!listHidden);
	}

	return (
		<div className='property-list-container'>
			<div className='property-list-title' onClick={onToggleList} >
				<span className='property-list-title'>Propiedades</span>
				<i className={`fas ${listHidden ? 'fa-chevron-right' : 'fa-chevron-down'}`} aria-hidden="true"/>
			</div>
			<ul className={`property-list ${listHidden ? 'hidden' : ''}`}>
				{properties.map(property => (
					<li className="list-item" key={property.key}>
						<span className='property-key'>{property.key}</span>
						<span className='property-value'>{property.value}</span>
					</li>
				))}
			</ul>
		</div>
	);
}

export default PropertyList;