import React from "react";
import "./Button.css";

const Button = ({
    isLink = false,
    href,
    children,
    onClick
}) => {

  return (
    getButtonType(isLink)
  );

  function getButtonType(isLink) {
    return isLink 
    ? <a className='button' href={href}>{children}</a> 
    : <button onClick={onClick} className='button'>{children}</button>
  }

};

export default Button;
