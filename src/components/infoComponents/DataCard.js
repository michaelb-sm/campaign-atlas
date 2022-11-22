import './DataCard.css';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function DataCard({name, status, body, onClicked}) {
    return (
        <div className='dataCard'>
            <div className='data'>
                <h1> {name} </h1>
                {status !== "" && (
                    <h5> {status} </h5>
                )}
                <p> {body} </p>
            </div>
            <button className='blockButton' onClick={() => {onClicked(name)}}>
                <ExitToAppIcon />
            </button>
        </div>
    );
}

export default DataCard;