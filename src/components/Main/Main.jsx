import React from 'react';
import './Main.css';
import AnalysisPub from "./AnalysisPub/AnalysisPub";
import AboutUs from "./AboutUs/AboutUs";
import OurTariff from "./OurTariff/OurTariff";

const Main = ({ isLoggedIn, userTariff }) => {
  return (
    <div className="main-content">
        <AnalysisPub isLoggedIn={isLoggedIn} />
        <AboutUs />
        <OurTariff isLoggedIn={isLoggedIn} userTariff={userTariff} />
    </div>
  )
}

export default Main