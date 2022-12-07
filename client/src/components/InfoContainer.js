import React, { useState } from 'react';
import './InfoContainer.css';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DataCard from './infoComponents/DataCard';
import DataPage from './infoComponents/DataPage';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function InfoContainer({infoControl, curData, refData, onCreate, onRedirect, onUpdate, onDelete}) {

    // State variables for creating/deleting new data
    const [newName, setNewName] = useState('');
    const [newType, setNewType] = useState({display: 'Type', dataType: ''});

    const [confirmDelete, setConfirmDelete] = useState(false);

    return (
        <div className='info-container'>

            {/* Interaction Bar */}
            {infoControl.page === "main" ? ( 
                <div>
                    {/* Create New Data */}
                    <div className='modifyContainer'>
                        <button className='blockButton' onClick={() => {
                            console.log('Name: ' + newName + ', type: ' + newType.dataType);
                                if (newName && newName !== '' && newType.dataType !== '') {
                                    onCreate(newName, newType.dataType);
                                    setNewName('');
                                    setNewType({display: 'Type', dataType: ''})
                                }
                            }}
                        >
                            <AddIcon />
                        </button>
                        <input placeholder="Create New Entry" value={newName} onChange={(event) => {setNewName(event.target.value)}}/>
                        <Dropdown as={ButtonGroup} onSelect={(eventKey, event) => {setNewType({display: event.target.text, dataType: eventKey})}}>
                            <Dropdown.Toggle split variant='rounded-light'/>
                            <div className='filterField'> {newType.display} </div>
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
                    {/* Delete Current Entry */}
                    <div className='modifyContainer'>
                        <button className='blockButton' onClick={() => {
                                if (confirmDelete) {
                                    onDelete();
                                    setConfirmDelete(false);
                                } else {
                                    alert("Check 'Confirm Deletion' to delete entry");
                                }
                            }}
                        >
                            <DeleteForeverIcon />
                        </button>
                        <label className='deleteField' htmlFor='confirmDelete'> 
                            <input 
                                type='checkbox' 
                                id='confirmDelete' 
                                name='confirmDelete' 
                                defaultChecked={confirmDelete}
                                onChange={() => setConfirmDelete(!confirmDelete)}
                            />
                            <div>Confirm Deletion</div>
                        </label>
                    </div>
                    <hr />
                </div>
            )}

            {/* Data Fields (cards or page) */}
            {infoControl.page === "main" ? (
                refData.filter( (value) => {
                    return ((
                        (value.name).toLowerCase().includes(infoControl.search)
                        ) && (
                        infoControl.filterType === "clear" ? true : value.dataType === infoControl.filterType
                        )
                    );
                }).map((value) => {
                    return (
                        <div key={value._id}>
                            <DataCard 
                                data={value}
                                onClicked={onRedirect}
                            />
                            <hr/>
                        </div>
                    );
                })
            ) : (
                <DataPage page={infoControl.page} data={curData} refData={refData} onRedirect={onRedirect} onUpdate={onUpdate}/>
            )}
        </div>
    );
}

export default InfoContainer;