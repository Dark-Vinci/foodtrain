import { useState } from 'react';
import axios from 'axios';

import './App.css';
import Loader from './components/loader';
import History from './components/history';
import Result from './components/result';
import Graph from './components/graph';
import Search from './components/search';
import useToggle from './hooks/toggle';

import Utility from './utils/classUtils';

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  // needed state for the application
  const [ input, setInput ] = useState('');
  const [ data, setData ] = useState({});
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ history, setHistory ] = useState([]);
  const [ graphData, setGraphData ] = useState([]);

  // custom hooks state
  const [ openModal, modalOpenHandler ] = useToggle();
  const [ showGraph, graphModalHandler ] = useToggle();

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ input }&appid=${ API_KEY }`;

  const utility = new Utility(
    url, setLoading, setData,
    setError, setErrorMessage,
    graphData, axios, setGraphData,
    history, setHistory, API_KEY
  )

  // function that set the input value
  const inputChangeHandler = (event) => {
    setInput(event.target.value);
  }

  // function that is invoked when the fetch button is clicked
  const buttonClickHandler = () => {
    setHistory([ ...history, input ]);
    setInput('');

    utility.fetchData();
  }

  let toRender = null;

  // condistionally rendering the data|loading state|error message
  if (error && !loading) {
    // error occured while fteching the data
    toRender = <h3 className='error'>{ errorMessage }</h3>
  } else if (loading) {
    // the data is been fetched
    toRender = <Loader />
  } else if (!error && !loading && Object.keys(data).length <= 0) {
    toRender = <h3>Displays the weather of a city</h3>
  } else if (Object.keys(data).length >= 0) {
    // when data has been fetched
    const { weatherIconUrl, humidity, pressure, temperature } = data;

    toRender = (
      <Result 
        weatherIconUrl={ weatherIconUrl }
        humidity={ humidity }
        pressure={ pressure }
        temperature={ temperature }
      />
    )
  }

  return (
    <div className="App">
      <h2>Weather Application</h2>

      {/* the input and the search button */}
      <Search
        input={ input }
        buttonClickHandler={ buttonClickHandler }
        inputChangeHandler={ inputChangeHandler }
        getHistory={ modalOpenHandler } 
        geolocate={ () => utility.navigator() } 
        graphModalHandler={ graphModalHandler }
        graphData={ graphData }
      />

      {/* renders the fetched data or error message */}
      <div className='output'>{ toRender }</div>

      {/* history component, for rensering searched cities */}
      <History
        data={ history }
        open={ openModal }
        click={ modalOpenHandler }
      />

      {/* graph component for drawing graph od humidity and temparatre of a city */}
      <Graph 
        data={ graphData }
        click={ graphModalHandler }
        open={ showGraph }
      />
    </div>
  );
}

export default App;
