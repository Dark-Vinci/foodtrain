

function Result ({ weatherIconUrl, humidity, pressure, temperature }) {
    return (
        <div>
            <img 
                src={ weatherIconUrl } 
                alt='weather' 
                style={{ width: '50px', height: '50px', backgroundSize: '100% 100%'}}
            />

            <p>Humidity: { humidity } %</p>
            <p>Pressure: { pressure } Pa</p>
            <p>Temperature: { temperature } K</p>
        </div>
    )
}

export default Result;