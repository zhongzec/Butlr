import React, { Children } from 'react';
import './Card.css';

const Card = (props) => {
  const { icon, title, subtitle, etc, children, classname } = props;

  return (
    <div className={`Card flex-1 bg-white m-3 p-4 ${classname}`}>
      <div className="header">
        <div className="header__icon pr-2">
          {icon}
        </div>
        <div className="header__title">
          {title}
        </div>
        <div className="header__subtitle">
          {subtitle}
        </div>
        <div className="header__etc">
          {etc}
        </div>
      </div>

      {children}
    </div>
  )
}

export {
  Card
}