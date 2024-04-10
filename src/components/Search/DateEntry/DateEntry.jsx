import React, { useState, useEffect } from 'react';
import './DateEntry.css';

const DateEntry = ({ dateEntry, setStartDate, endDate, setEndDate }) => {
  const [error, setError] = useState('');
  const [inputTypeStart, setInputTypeStart] = useState('text');
  const [inputTypeEnd, setInputTypeEnd] = useState('text');

  useEffect(() => {
    validateDateRange();
  }, [dateEntry, endDate]);

  const validateDateRange = () => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    if (!dateEntry || !endDate) {
      setError("Обязательное поле");
    } else if (new Date(dateEntry) > new Date(endDate)) {
      setError("Введите корректные данные");
    } else if (new Date(dateEntry) > currentDate || new Date(endDate) > currentDate) {
      setError("Дата не может быть позже текущей даты");
    } else {
      setError("");
    }
  };

  return (
    <div className="form-field">
      <label htmlFor="dateEntry">Диапазон поиска <span className={error ? "required-asterisk error" : "required-asterisk"}>*</span></label>
      <div className='form-field-date-inputs'>
        <div className="date-input-container">
          <input
            type={inputTypeStart}
            onFocus={() => setInputTypeStart('date')}
            onBlur={() => {
              validateDateRange();
              if (!dateEntry) setInputTypeStart('text');
            }}
            id="dateEntry"
            name="dateEntry"
            placeholder="Дата начала"
            value={dateEntry}
            onChange={(e) => setStartDate(e.target.value)}
            className={error ? 'error' : ''}
          />
          <input
            type={inputTypeEnd}
            onFocus={() => setInputTypeEnd('date')}
            onBlur={() => {
              validateDateRange();
              if (!endDate) setInputTypeEnd('text');
            }}
            id="endDate"
            name="endDate"
            placeholder="Дата конца"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={error ? 'error' : ''}
          />
        </div>
        {error && <div className="date-error-message error">{error}</div>}
      </div>  
    </div>
  );
};

export default DateEntry;