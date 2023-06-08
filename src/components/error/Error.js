import React from "react";
import { useLocation } from "react-router-dom";
import "./Error.scss"

const Error = (props) => {
    const location = useLocation();
    let statusCode, statusMessage, image;

    switch(location.pathname) {
        case "/forbidden":
            statusCode = "403";
            statusMessage = "¡Lo siento, esta área es privada! Parece que no tienes permiso para entrar aquí.";
            image = "/dist/img/forbidden-logo.png";
            break;
        case "/internalerror":
            statusCode = "500";
            statusMessage = "¡Ups! Tenemos un pequeño problema con nuestro servidor. Estamos trabajando para solucionarlo.";
            image = "/dist/img/internalerror-logo.png";
            break;
        default:
            statusCode = "";
            statusMessage = "Lo siento, la página que estás buscando parece haberse esfumado";
            image = "/dist/img/notfound-logo.png";
            break;
    }

    return(
        <div className="error-page-wrapper">
            <div className="error-image-container">
                <img
                    className="error-image"
                    src={image}
                    alt="error-image"
                />
            </div>
            <p className="error-message">{statusMessage}</p>
        </div>
    )
}

export default Error;