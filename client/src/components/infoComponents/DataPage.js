import './DataPage.css';

function DataPage({refData, data}) {
    return (
        <div className='dataPage'>
            <h1> {data.name} </h1>
            {data.status !== "" && (
                <h4> {data.status} </h4>
            )}
            <hr/>
            <div className='infoLinks'>
                {Object.keys(data.infoLinks).map( (value, key) => {
                    return (
                        <h2> {value} </h2>
                    );
                })}
            </div>
            <hr/>
            {data.main.map( (value, key) => {
                return (
                    <div>
                        <h4> {value.heading} </h4>
                        <p> {value.body} </p>
                    </div>
                );
            })}
        </div>
    )
}

export default DataPage;