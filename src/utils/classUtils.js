

class Utility {
    constructor(
        url, setLoading, setData, setError,
        setErrorMessage, graphData, axios,
        setGraphData, history, setHistory,
        apiKey
    ) {
        this.url= url;
        this.setLoading = setLoading;
        this.setData = setData;
        this.setError = setError;
        this.setErrorMessage = setErrorMessage;
        this.graphData = graphData;
        this.setGraphData = setGraphData;
        this.history =  history;
        this.setHistory = setHistory;
        this.axios = axios;
        this.apiKey = apiKey;
    }

    async fetchData(url = this.url) {
        this.setLoading(true);

        try {
            const { data } = await this.axios.get(url);
    
          // extract the needed parameters
            const { humidity, pressure, temp: temperature } = data.main;
            const { icon, main, description } = data.weather[0];
    
            const weatherIconUrl = `https://openweathermap.org/img/w/${ icon }.png`;
    
            const { lon, lat } = data.coord
    
            const extractedData = {
                humidity, pressure, 
                temperature, main, lon, lat,
                description, weatherIconUrl
            };
    
          // set the needed state
            this.setData(extractedData);
            this.setLoading(false);
            this.setError(false);
        //   historyButtonHandler(lat, lon)
            this.fetchGraphData(lat, lon)
        } catch (error) {
            if (error.response) {
                this.setErrorMessage('city not found');
            } else if (error.request) {
                this.setErrorMessage('network error')
            } else {
                this.setErrorMessage('something went wrong')
            }
            this.setLoading(false);
            this.setError(true);
        }
    }

    async fetchGraphData(lat, lon) {
        const date = Math.floor((Date.now() - 5 * 24 * 60 * 60 * 1000)/1000);

        const url = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${ lat }&lon=${ lon }&dt=${ date }&appid=${ this.apiKey }`
        try {
            const response = await this.axios.get( url );

            const hourlyData = response.data.hourly;

            // extract on the the needed data from the response
            const extractedGraphData = hourlyData.map((hour, index) => {
                // extract the temperature and humidity;
                const { temp, humidity } = hour;
                // convert from kelvin to celcius
                const temperatureToCelcius = temp - 273.14;

                return { 
                    humidity: humidity,
                    name: index + 1,
                    temperature: temperatureToCelcius.toFixed(2)
                }
            });

            this.setGraphData(extractedGraphData);
        } catch (error) {}
    }

    navigator () {
        const urlFragment = 'https://api.openweathermap.org/data/2.5/weather?';

        if ('geolocation' in navigator) {
            // browser supports geolocation
            navigator.geolocation.getCurrentPosition((position) => {
      
                // extract the needed parameter [ lat, long ]
                const { latitude, longitude } = position.coords;
                const url = `${ urlFragment }lat=${ latitude }&lon=${ longitude }&appid=${ this.apiKey }`;
        
                this.setHistory([ ...this.history, 'current location' ]);
      
                this.fetchData(url);
            }, (error) => {
                if (error.code === 1) {
                    // permission was denied for switching on gps
                    window.alert('permission was denied to fetch position')
                } else if (error.code === 2) {
                    // error in getting the location
                    window.alert(' the network is down or your position is unavailable');
                } else if (error.code === 3) {
                    // takes too long to recieve the location information
                    window.alert('timeout');
                }
            });
        } else {
            // browswer doesnt support geolation
            window.alert('your browser doesnt support geolocation')
        }
    }
}

export default Utility;