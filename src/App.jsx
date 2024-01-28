import { useState, useEffect } from 'react'
import axios from 'axios'
import WeatherCard from './components/WeatherCard';
import './App.css'

function App() {

  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [isLoading, setIsLoading] = useState(true)
  const [location, setLocation] = useState("")
  const [hasError, setHasError] = useState(false)

    const searchLocation = (e) => {
      if (e.key === 'Enter'){
        e.preventDefault();
        setLocation(e.target.value);
        e.target.value= ""
      }
    }

    const success = position => {
    const obj = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }
    setCoords(obj)
  }

  useEffect(() => {
    if(coords){
      const apiKey = 'cf151a21b327871f33543eed1193e0c0'
      const urlByCity = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
      const urlByCoords = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`

      const url = location !== "" ? urlByCity : urlByCoords;
      setIsLoading(true);
      axios.get(url)
        .then(res => {
          setWeather(res.data)
          const obj = {
            celcius: (res.data.main.temp-273.15).toFixed(1),
            farenh: ((res.data.main.temp-273.15) * 9/5 + 32).toFixed(1)
          }
          setTemp(obj)
        })
        .catch(err=> {
          setHasError(true)
          console.log(err)
        })
        .finally(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 200)
        )
    }
  }, [location, coords])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  return (
    <div className='app'>
      <div className='app_header'>
        <h1 className='app_title'>Weather App</h1>
        <div className='app_searchLoc'>
          <input
            onKeyUp={searchLocation}
            placeholder='Enter Location'
            type='text'
            className='search_input'
          />
          <div className='search_btn'>
            <i
            className="fa fa-search"
            />
          </div>
        </div>
      </div>
      {
        hasError ?
        <>
        <div className='container_err'>
          <h2 className='title_error_city'>That city was not found</h2>
          <h3 className='title_try'>Please, try again</h3>
        </div>
        </>
        :
        <>
      <WeatherCard
        weather = {weather}
        temp = {temp}
        isLoading = {isLoading}
      />
        </>
      }
    </div>
  )
}

export default App
