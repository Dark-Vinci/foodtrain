import { LineChart, Legend, XAxis, YAxis, Tooltip,Line, CartesianGrid } from 'recharts';

function Graph ({ data, open, click }) {
    let toRender;

    if (data.length === 0) {
        // error occured when fetching city the history weather
        toRender = <h3 className="red">something went wrong</h3>
    } else {
        // success in fetching the sity history data
        toRender = (
            <LineChart
                data={ data }
                height={ 250 }
                width={ 300 }
                
            >
                <XAxis dataKey='name'/>
                <CartesianGrid strokeDasharray='3 3' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type='monotone' stroke='blue' dataKey='temperature'/>
                <Line type='monotone' stroke='green' dataKey='humidity'/>
            </LineChart>
        )
    }

    return (
        <div 
            className="graph"
            style={{
                top: open ? '0vh': '300vh',
                zIndex: 1000,
                position: 'fixed'
            }}
            onClick={ click }
        >
            <div className='main-graph'>
                <h3>Graph of temperature and humidity</h3>
                { toRender }
            </div>
        </div>
    )
}

export default Graph;