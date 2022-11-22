import './InfoContainer.css';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DataCard from './infoComponents/DataCard';
import DataPage from './infoComponents/DataPage';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function InfoContainer({infoControl, refData, data, onRedirect}) {
    return (
        <div className='info-container'>
            {infoControl.page === "main" ? ( 
                <div>
                    <div className='modifyContainer'>
                        <button className='blockButton'>
                            <AddIcon />
                        </button>
                        <input placeholder="Create New Entry" />
                        <Dropdown as={ButtonGroup}>
                            <Dropdown.Toggle split variant='rounded-light'/>
                            <div className='filterField'> Type </div>
                            <Dropdown.Menu variant='rounded-light'>
                                <Dropdown.Item eventKey="person">Person</Dropdown.Item>
                                <Dropdown.Item eventKey="faction">Faction</Dropdown.Item>
                                <Dropdown.Item eventKey="place">Place/Location</Dropdown.Item>
                                <Dropdown.Item eventKey="event">Event</Dropdown.Item>
                                <Dropdown.Item eventKey="thing">Item/Material</Dropdown.Item>
                                <Dropdown.Item eventKey="entity">God/Entity</Dropdown.Item>
                                <Dropdown.Item eventKey="creature">Creature</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <hr />
                </div>
            ) : (
                <div>
                    <div className='modifyContainer'>
                        <button className='blockButton'>
                            <DeleteForeverIcon />
                        </button>
                        <label className='deleteField' for='confirmDelete'> 
                            <input type='checkbox' id='confirmDelete' name='confirmDelete' />
                            <div>Confirm Deletion</div>
                        </label>
                    </div>
                    <hr />
                </div>
            )}
            {infoControl.page === "main" ? (
                refData.filter( (value) => {
                    return ((
                        (value.name).toLowerCase().includes(infoControl.search)
                        ) && (
                        infoControl.filterType === "clear" ? true : value.type === infoControl.filterType
                        )
                    );
                }).map((value, key) => {
                    return (
                        <div>
                            <DataCard 
                                name={value.name} 
                                status={value.status} 
                                body={value.main[0].body}
                                onClicked={onRedirect}
                            />
                            <hr/>
                        </div>
                    );
                })
            ) : (
                <DataPage refData={refData} data={data}/>
            )}
        </div>
    );
}

export default InfoContainer;