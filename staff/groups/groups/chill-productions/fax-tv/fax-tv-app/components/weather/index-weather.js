function Weather(weather){
    
    return <>
        <div className="nav__weather">
            {weather.weather === "clear-day" && <i className="far fa-sun"></i>}
            {weather.weather === "rain" && <i className="fas fa-cloud-showers-heavy"></i>}
            {weather.weather === "cloudy" && <i className="fas fa-cloud"></i>}
            {weather.weather === "partly-cloudy-day" && <i className="fas fa-cloud-sun"></i>}
        </div>
    </>
}