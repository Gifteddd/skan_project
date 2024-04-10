import React, { useState } from 'react';
import './TonalPanel.css'


const TonalPanel = ({ tonalPanel, setTonality }) => {
    return (
      <div className="form-field form-field-inputs">
        <label htmlFor="tonalPanel">Тональность</label>
        <div className="select-wrapper"> 
          <select id="tonalPanel" name="tonalPanel" value={tonalPanel} onChange={(e) => setTonality(e.target.value)}>
            <option value="Любая">Любая</option>
            <option value="Позитивная">Позитивная</option>
            <option value="Негативная">Негативная</option>
          </select>
        </div>
      </div>
    );
};

export default TonalPanel;