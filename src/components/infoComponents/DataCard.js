import './DataCard.css';

function DataCard({name, status, body}) {
    return (
        <div className='dataCard'>
            <div className='data'>
                <h1> {name} </h1>
                {status !== "" && (
                    <h5> {status} </h5>
                )}
                <p> {body} </p>
            </div>
            <button>click me</button>
        </div>
    );
}

export default DataCard;