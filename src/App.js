
import './App.css';
import React, { useEffect, useState } from 'react';



function App() {
  const [countriesData, setCountriesData] = useState([]);   //holds countries data array
  const [statesData, setStatesData] = useState([]);   //holds states data array
  const [citiesData, setCitiesData] = useState([]);   //holds cities data array
  const [countryValue, setCountryValue] = useState("");  // holds selected country value
  const [stateValue, setStateValue] = useState("");  // holds selected state value
  const [cityValue, setCityValue] = useState("");   // holds selected city value
  
  const fetchCountries = async() => {
    try {
      const response = await fetch("https://crio-location-selector.onrender.com/countries");
      const result = await response.json();
      setCountriesData(result);
    } catch (error) {
      console.error("Error Fetching Countries Data: ",error);
    }
    
  }
 
  
  const fetchStates = async(country) =>{
    try {
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${country}/states`);
      const result = await response.json();
      setStatesData(result);
    } catch (error) {
      console.error("Error Fetching States Data: ",error);
    }
    
  }

  const fetchCities = async(country, state) =>{
    try {
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`);
      const result = await response.json();
      setCitiesData(result);
    } catch (error) {
      console.error("Error Fetching Cities Data: ",error);
    }
  }

  useEffect(() => {fetchCountries();}, []);

  useEffect(() => {
    if(countryValue) {
      fetchStates(countryValue);
      setStatesData([]);  //clears prev selected states data
      setCitiesData([]);  //clears prev selected cities data
      setStateValue("");  //clears prev selected state value 
      setCityValue("");   //clears prev selected city value
    }
      
  }, [countryValue]);

  
  useEffect(() => {
    if(countryValue && stateValue){
      fetchCities(countryValue, stateValue);
      setCitiesData([]);  //clears prev selected cities data
      setCityValue("");   //clears prev selected city value
    }
      
  }, [stateValue]);

  const handleCountry = (e) =>{
    setCountryValue(e.target.value);
    //fetchStates(e.target.value);
  }

  const handleStates = (e) => {
    setStateValue(e.target.value);
    //fetchCities(countryValue, e.target.value);
  }

  const handleCities = (e) =>{
    setCityValue(e.target.value);
  }

  return (
    <div className='App'>
      <h1>Select Location</h1>
      
      <select value={countryValue} onChange={handleCountry}>
        <option value="" disabled>Select Country</option>
        {countriesData.map((ele,idx) => (<option key={idx} value={ele}>{ele}</option>))}
      </select>
      
      <select value={stateValue} onChange={handleStates} disabled ={!countryValue} >
        <option value ="" disabled>Select State</option>
        {statesData.map((ele,idx) =>(<option key ={idx} value={ele}>{ele}</option>))}
      </select>
      
      <select value={cityValue} onChange={handleCities} disabled ={!stateValue}>
        <option value="" disabled>Select City</option>
        {citiesData.map((ele,idx) => (<option key={idx} value={ele}>{ele}</option>))}
      </select>
      {/* {countryValue && stateValue && cityValue &&(<h3>You selected <span style={{fontSize: "26px"}}>{cityValue}, </span><span style={{color:"grey"}}>{stateValue} and {countryValue}</span></h3>) } */}
      {countryValue&&stateValue&&cityValue &&(<h3>You selected {cityValue}, {stateValue} and {countryValue}</h3>) } 
    </div>
  );
}

export default App;
