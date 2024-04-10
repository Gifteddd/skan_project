import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthCont'; 

import './Search.css';
import CheckboxGroup from './CheckboxGroup/CheckboxGroup';
import CountDocTotal from './CountDocTotal/CountDocTotal';
import DateEntry from './DateEntry/DateEntry';
import InnSearch from './InnSearch/InnSearch';
import TonalPanel from './TonalPanel/TonalPanel';

import search_page_large_picture from "../../assets/search_page_large_picture.svg"
import search_page_small_picture_folders from "../../assets/search_page_small_picture_folders.svg"
import search_page_small_picture_sheet from "../../assets/search_page_small_picture_sheet.svg"

const Search = () => {
  const [innSearch, setCompanyINN] = useState('');
  const [tonalPanel, setTonality] = useState('Любая');
  const [countDocTotal, setDocumentCount] = useState('');
  const [dateEntry, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [checkboxGroup, setCheckboxStates] = useState({
    maxCompleteness: false,
    businessMentions: false,
    mainRole: false,
    riskFactorsOnly: false,
    includeMarketNews: true, 
    includeAnnouncements: true,
    includeNewsSummaries: true,
  });

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth');
    }
  }, [isLoggedIn, navigate]);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    
    const isValid = innSearch && countDocTotal && dateEntry && endDate;
    setIsFormValid(isValid);
  }, [innSearch, countDocTotal, dateEntry, endDate, checkboxGroup]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxStates(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    let apiTonalPanel;
    switch (tonalPanel) {
      case 'Любая':
        apiTonalPanel = 'any';
        break;
      case 'Позитивная':
        apiTonalPanel = 'positive';
        break;
      case 'Негативная':
        apiTonalPanel = 'negative';
        break;
      default:
        apiTonalPanel = 'any';
    }
  
    if (isFormValid) {
      
      const searchParams = {
        issueDateInterval: {
          startDate: `${dateEntry}T00:00:00+03:00`,
          endDate: `${endDate}T23:59:59+03:00`
        },
        searchContext: {
          targetSearchEntitiesContext: {
            targetSearchEntities: [{
              type: "company",
              inn: innSearch,
              maxFullness: checkboxGroup.maxCompleteness,
            }],
            onlyMainRole: checkboxGroup.mainRole,
            tonalPanel: apiTonalPanel,
            onlyWithRiskFactors: checkboxGroup.riskFactorsOnly,
          }
        },
        attributeFilters: {
          excludeTechNews: !checkboxGroup.includeMarketNews,
          excludeAnnouncements: !checkboxGroup.includeAnnouncements,
          excludeDigests: !checkboxGroup.includeNewsSummaries,
        },
        limit: Number(countDocTotal),
        sortType: "sourceInfluence",
        sortDirectionType: "desc",
        intervalType: "month",
        histogramTypes: ["totalDocuments", "riskFactors"]
      };
  
      console.log('Отправка запроса на сервер с данными:', searchParams);
  
      navigate('/results', { state: { searchParams: searchParams } });
    } else {
      console.log('Форма не валидна, перенаправление не выполнено.');
    }
  };
  

  return (
    <div className="search-content">

      <div className="search-title-block">
        <div className="search-title-text">
          <h1 className="h1-search-page">Найдите необходимые <br />данные в пару кликов.</h1>
          <p className="p-search-page-title-block">Задайте параметры поиска. <br />Чем больше заполните, тем точнее поиск</p>
        </div>
        <img className="search-page-small-picture-sheet" src={search_page_small_picture_sheet} alt="Paper image" />
        <img className="search-page-small-picture-folders" src={search_page_small_picture_folders} alt="Folderds image" />
      </div>

      <div className="search-block">
        <form onSubmit={handleSubmit} className="search-form">

          <div className="left-part-search-form">
            <InnSearch innSearch={innSearch} setCompanyINN={setCompanyINN} />
            <TonalPanel tonalPanel={tonalPanel} setTonality={setTonality} />
            <CountDocTotal countDocTotal={countDocTotal} setDocumentCount={setDocumentCount} />
            <DateEntry dateEntry={dateEntry} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
          </div>

          <div className="right-part-search-form">
            <CheckboxGroup checkboxGroup={checkboxGroup} handleCheckboxChange={handleCheckboxChange} />
            <div className="right-part-submit-button-block">
              <button className="button" type="submit" disabled={!isFormValid}>Поиск</button>
              <p className="star-message">* Обязательные к заполнению поля</p>
            </div>
          </div>

        </form>

        <img className="search-page-large-picture" src={search_page_large_picture} alt="Search image" />
      </div>  
    </div>
  );
};

export default Search;