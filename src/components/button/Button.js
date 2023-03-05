import React from "react";
import "./Button.scss";

const Button = ({
    isLink = false,
    href,
    children,
    styles,
    onClick,
    type,
    disabled
}) => {

  return (
    getButtonType(isLink)
  );

  function getButtonType(isLink) {
    return isLink 
    ? getLink()
    : getButton()
  }

  function getLink() {
    let className = `button`
    if (styles) styles.forEach(style => className += ` ${style}`)
    return <a className={className} href={href} type={type} disabled={disabled}>{children}</a>
  }

  function getButton() {
    let className = `button`
    if (styles) styles.forEach(style => className += ` ${style}`)
    return <button onClick={onClick} className={className} type={type} disabled={disabled}>{children}</button>
  }

};

export default Button;
