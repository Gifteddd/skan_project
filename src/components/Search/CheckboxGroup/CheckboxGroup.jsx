import React from 'react';
import './CheckboxGroup.css';

const CheckboxGroup = ({ checkboxGroup, handleCheckboxChange }) => {
  const labels = {
    maxCompleteness: "Признак максимальной полноты",
    businessMentions: "Упоминания в бизнес-контексте",
    mainRole: "Главная роль в публикации",
    riskFactorsOnly: "Публикации только с риск-факторами",
    includeMarketNews: "Включать технические новости рынков",
    includeAnnouncements: "Включать анонсы и календари",
    includeNewsSummaries: "Включать сводки новостей",
  };

  return (
    <div className="right-part-search-checkbox-block">
      {Object.keys(checkboxGroup).map((key) => (
        <div key={key} className="checkbox-container">
          <input
            type="checkbox"
            id={`checkbox-${key}`}
            name={key}
            checked={checkboxGroup[key]}
            onChange={handleCheckboxChange}
            className="hidden-checkbox"
          />
          <label htmlFor={`checkbox-${key}`} className={checkboxGroup[key] ? "checked-label" : ""}>
            <span className="custom-checkbox"></span>
            <span className="label-text">{labels[key]}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
