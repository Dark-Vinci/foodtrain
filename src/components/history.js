

function History ({ data, click, open }) {
    let toRender;

    if (data.length === 0) {
        toRender = <h3 className='red'>No search history yet</h3>
    } else {
        toRender = (
            <ul>
                { data.map((value, index) => {
                    return <li key={index}>{ value }</li>
                })}
            </ul>
        )
    }

    return (
        <div
            style={{
                top: open ? '0vh': '-300vh',
                zIndex: 1000,
                position: 'fixed'
            }}
            className='modal'
            onClick={ click }
        >

            <div className="card">
                <h2>search history</h2>
                { toRender }
            </div>
        </div>
    );
}

export default History;