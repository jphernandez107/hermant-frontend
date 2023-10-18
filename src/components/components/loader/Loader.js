import React from "react"
import "./Loader.scss"

const Loader = ({text}) => {
	return (
		<div className="loader">
			<div className="dot-spinner">
				<div className="dot-spinner__dot"></div>
				<div className="dot-spinner__dot"></div>
				<div className="dot-spinner__dot"></div>
				<div className="dot-spinner__dot"></div>
				<div className="dot-spinner__dot"></div>
				<div className="dot-spinner__dot"></div>
				<div className="dot-spinner__dot"></div>
				<div className="dot-spinner__dot"></div>
			</div>
			<span className="loader-text">{text || "Cargando..."}</span>
		</div>
	)
}

export default Loader;