import React from 'react';
import "./PageHeader.scss"
import { useNavigate } from 'react-router';

const PageHeader = ({children, button}) => {
    const navigate = useNavigate();
    const title = children ? children : '';

    const onBackClicked = (e) => {
        navigate(-1);
    }

    return (
        <div className='page-header'>
            <div className='header-back-button'>
                <i className="fa-solid fa-angle-left fa-2x" onClick={onBackClicked}></i>
                <h3>{title}</h3>
            </div>
            {getButton(button)}
        </div>
    )

    function getButton(button) {
        return button ? React.createElement(button) : <></>;
    }

}

export default PageHeader;