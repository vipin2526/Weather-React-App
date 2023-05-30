import React, { useState } from 'react'
import axios from 'axios'
import Exdata from './Exdata'
function Weather() {

    const [place, setplace] = useState('');
    const [data, setdata] = useState(Exdata);
    const [loding,setloding]=useState(false);

    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: { q: place },
        headers: {
            'X-RapidAPI-Key': 'b3720ed360msh5dd3eae15e96347p1a7b22jsn634059971dda',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    // inside the showdata() API calling with above data
    async function showdata() {
        try {
            const response = await axios.request(options, setloding(true));
            setdata(response.data);
            console.log(response.data);
        } catch (error) {
            alert("Enter Correct City Name");
            console.error(error);
        }
         setloding(false);
    }


    return (
        <div>
            <input type='text' placeholder='Enter Place Name' onChange={(e) => setplace(e.target.value)} />
            <button onClick={() => showdata()} >Show Weather</button>
            <div className='outerBox' >
                <h1>Current Weather Information</h1>
                {(loding && <div className='loding'>loding......</div>)}
                <div className='temprature'>
                    <span>{data.location.name + ", " + data.location.country}</span>
                    <span>{data.current.temp_c} ℃ </span>
                    <img src={data.current.condition.icon} alt='not found' />
                </div>

                <div className="other_information">
                    <span>
                        <h3>Wind Speed : {data.current.wind_kph} km/h</h3>
                        <h3>Humidity : {data.current.humidity}%</h3>
                        <h3>Pressure : {data.current.pressure_mb} mb </h3>
                        <h3>Visibility : {data.current.vis_km} km</h3></span>
                    <span>
                        <h3>Feels Like : {data.current.feelslike_c}℃</h3>
                        <h3>Max UV Index: {data.current.uv}</h3>
                        <h3>Cloud : {data.current.cloud}% </h3>
                        <h3>Weather: {data.current.condition.text}</h3>
                    </span>

                </div>

            </div>
            <h3>Last Updated : {data.current.last_updated}</h3>
        </div >
    )
}

export default Weather;