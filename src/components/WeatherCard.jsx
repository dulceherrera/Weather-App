import React from 'react'
import {useState} from 'react'
import Loader from './Loader'
import './styles/weatherCard.css'

const WeatherCard = ({weather, temp, isLoading}) => {

  const [isCelcius, setisCelcius] = useState(false)

  const today = new Date().toLocaleDateString("en-us", {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleChangeTemp = () => {
    setisCelcius(!isCelcius)
  }

  return (
    <>
    {isLoading ? (
      <Loader />
    ) : (
      <>
        <section className='weather'>
          <div className='weather_header'>
            <div>
            <h2 className='weather_city'>{weather?.name}, {weather?.sys.country}</h2>
            <p className='weather_day'>{today}</p>
            <p className='weather_clouds'>{weather?.weather[0].description}</p>
          </div>
            <img
              className='weather_img'
              src={weather && `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt='weather icon'></img>
          </div>
          <div className='weather_container1'>
            <p className='weather_temp'>{isCelcius?`${temp?.celcius} °C`:`${temp?.farenh}°F`}</p>
              <div className='weather_details'>
                <ul className='weather_info'>
                  <li><span>Wind Speed: </span><span>{weather?.wind.speed}m/s</span></li>
                  <li><span>Clouds: </span><span>{weather?.clouds.all}%</span></li>
                  <li><span>Pressure: </span><span>{weather?.main.pressure}hPa</span></li>
                </ul>
              </div>
          </div>
        </section>
        <div className='weather_container2'>
          <button className='weather_btn' onClick={handleChangeTemp}>{isCelcius?'Change to °F':'Change to °C'}</button>
        </div>
    </>
    )}
    </>
  )
}

export default WeatherCard
