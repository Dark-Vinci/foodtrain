

function Search ({ 
    input, buttonClickHandler, 
    inputChangeHandler, getHistory, 
    geolocate, graphData,
    graphModalHandler
}) {
    return (
        <div className="main">
            <div className="search">
                <input 
                    type="text" 
                    placeholder='city/location'
                    onChange={ inputChangeHandler }
                    value={ input }
                />

                <button
                    onClick={ buttonClickHandler }
                    disabled={ input.trim().length <= 0 ? true: false}
                >search</button>
            </div>

            <button
                onClick={ getHistory }
            >get history</button>

            <button
                onClick={ geolocate }
            >use location</button>

            <button
                onClick={ graphModalHandler }
                disabled={ graphData.length <= 0 ? true: false }
            >see graph</button>
        </div>
    )
}

export default Search;