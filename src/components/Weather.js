import React from 'react'
import { useState } from "react";
import './style.css';

export default function Weather () {

    const [clime, setClime] = useState([])
    const [units, setUnits] = useState("celsius")

    const toCelsius = temp => Math.round((5/9) * (temp - 32))
    const switchToC = () => setUnits('celsius')
    const switchToF = () => setUnits('fahrenheit')

    React.useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        navigator.geolocation.getCurrentPosition(async location => {
            const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&appid=e6829eeb8d1147ded782bf69bb28c46a`)
            const info = await data.json()
            setClime(info)
        })
    }
        if (!clime.weather) {
            return <span>Loading...</span>;
        }
    
    
    
    const iconURL = `https://openweathermap.org/img/wn/${clime.weather[0].icon}@2x.png`

    const { temp, temp_min, temp_max, humidity} = clime.main

     return (
         <div className="container mobile">
             <div className="title">
             <h1>Weather App</h1>
             </div>
             <div className="description">
                 <div className="items">
                     <div className="text">
                     <h2>{clime.name} - {clime.sys.country}</h2>
                     <div className="flexbox">
                     <div className="col-1">
                     <img src={iconURL} alt="weather"/>
                     </div>
                     <div className="col-2">
                     <p>{clime.weather[0].main} - {clime.weather[0].description}</p>
                     <p>Temperature: {units === 'celsius' ? `${Math.round(temp)} °C` : `${toCelsius(temp)} °F`}</p>
                     <p>Min Temperature: {units === 'celsius' ? `${Math.round(temp_min)} °C` : `${toCelsius(temp_min)} °F`}</p>
                     <p>Max Temperature: {units === 'celsius' ? `${Math.round(temp_max)} °C` : `${toCelsius(temp_max)} °F`}</p>
                     <p>Humidity: {humidity}%</p>
                     <div>
                         <button onClick={switchToF}>°F</button>
                         <button onClick={switchToC}>°C</button>
                     </div>
                     </div>
                     </div>
                     </div>
                 </div>
             </div>
         </div>
     )   
    
}

