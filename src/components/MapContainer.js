import './MapContainer.css';
import MapImg from '../images/Nentovarr_map.jpg'

function MapContainer() {
    return (
        <div className='map-container'>
            <img className='background-map' src={MapImg} alt='Map of the subcontinent' useMap='map-overlay'/>
            {/* <map name='map-overlay'></map> */}
        </div>
    );
}

export default MapContainer;