import './DataCard.css';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function DataCard({data, onClicked}) {
    // Displays limited fields for all data
    return (
        <div className='dataCard'>
            <div className='data'>
                <h1> {data.name} </h1>
                {data.status !== "" && (
                    <h5> Status: {data.status} </h5>
                )}
            </div>
            <button className='blockButton' onClick={() => {onClicked(data._id, data.dataType)}}>
                <ExitToAppIcon />
            </button>
        </div>
    );
}

export default DataCard;