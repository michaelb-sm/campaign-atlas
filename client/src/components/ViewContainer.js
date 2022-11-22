import './ViewContainer.css';
import MapImg from '../images/Nentovarr_map.jpg'

function ViewContainer() {
    return (
        <div className='view-container'>
            <img className='background-map' src={MapImg} alt='Map of the subcontinent' useMap='map-overlay'/>
            {/* <map name='map-overlay'></map> */}
        </div>
    );
}

export default ViewContainer;