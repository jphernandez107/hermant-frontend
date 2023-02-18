import React from "react";
import "./Button.css";

const Button = ({
    isLink = false,
    href,
    children,
    styles,
    onClick,
    type
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
    return <a className={className} href={href} type={type}>{children}</a>
  }

  function getButton() {
    let className = `button`
    if (styles) styles.forEach(style => className += ` ${style}`)
    return <button onClick={onClick} className={className} type={type}>{children}</button>
  }

};

export default Button;
