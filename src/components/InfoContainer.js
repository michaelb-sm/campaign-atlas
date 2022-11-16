import './InfoContainer.css';
import DataCard from './infoComponents/DataCard';
import DataPage from './infoComponents/DataPage';

function InfoContainer({data}) {
    return (
        <div className='info-container'>
            {data.map((value, key) => {
                return (
                    <div>
                        <DataCard name={value.name} status={value.status} body={value.main[0].body}/>
                        <hr/>
                    </div>
                );
            })}
            {/* <DataPage data={data[0]}/> */}
        </div>
    );
}

export default InfoContainer;