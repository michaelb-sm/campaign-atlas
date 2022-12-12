import React, { useState, useEffect } from 'react';
import './DataPage.css';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function DataPage({page, data, refData, onRedirect, onUpdate}) {

    // State variables for editiing data
    const [localData, setLocalData] = useState({});
    const [editKey, setEditKey] = useState('');

    useEffect(() => {
        setLocalData(data);
    }, [data, editKey]);

    // Change current field to edit
    function handleEdit(key) {
        if (key !== editKey) {
            setEditKey(key);
        } else {
            // Only update while exiting on current field
            onUpdate(localData);
            setEditKey('');
        }
    }

    // Keep track of status edits
    function handleStatusChange(event) {
        const newStatus = event.target.value;
        setLocalData( (prevValue) => {
            return {
                ...prevValue,
                status: newStatus
            };
        });
    }

    // Keep track of paragraph heading edits
    function handleParagraphHeadingChange(event, index) {
        const newHeading = event.target.value;
        setLocalData( (prevValue) => {
            const newMain = prevValue.main;
            newMain[index].heading = newHeading;
            return {
                ...prevValue,
                main: newMain
            };
        });
    }

    // Keep track of paragraph body edits
    function handleParagraphBodyChange(event, index) {
        const newBody = event.target.value;
        setLocalData( (prevValue) => {
            const newMain = prevValue.main;
            newMain[index].body = newBody;
            return {
                ...prevValue,
                main: newMain
            };
        });
    }

    // Create new paragraph
    function handleNewParagraph() {
        const newData = data;
        newData.main.push({heading: '', body: ''});
        onUpdate(newData);
        setEditKey('main' + String(newData.main.length - 1));
    }

    // Create new 
    function handleParagraphDeletion(index) {
        const newData = data;
        newData.main.splice(index, 1);
        onUpdate(newData);
        setEditKey('');
    }

    if (!data) {
        return <p>Loading...</p>
    }

    return (
        <div className='dataPage'>
            {/* Name and Status */}
            <h1> {data.name} </h1>
            <div data-testid='status' className='status'>
                <button className='blockButton' onClick={() => handleEdit('status')}>
                    {editKey === 'status' ? <SaveIcon fontSize='small' /> : <EditIcon fontSize='small'/>}
                </button>
                {editKey === 'status' ? (
                    <h4>Status: <input className='outline' onChange={(event) => handleStatusChange(event)} value={localData.status} /></h4>
                ) : (
                    <h4>Status: {data.status}</h4>
                )}
            </div>
            <hr/>
            {/* Infolinks */}
            <div data-testid='infoLinks' className='infoLinks'>
                {Object.keys(data.infoLinks).map( (value) => {
                    return (
                        <Dropdown key={value} as={ButtonGroup}>
                            <Dropdown.Toggle split variant='rounded-light'/>
                            <div className='filterField'> {value} </div>
                            <Dropdown.Menu variant='rounded-light'>
                                <input className='addLinks' placeholder='Add Reference' />
                                <Dropdown.Divider />
                                {data.infoLinks[value].map( (item, index) => {
                                    const refItem = refData.find(element => element.name === item);
                                    const refId = (refItem ? refItem._id : index.toString());
                                    return <Dropdown.Item key={refId} eventKey={refId}>{item}</Dropdown.Item>
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                        
                    );
                })}
            </div>
            <hr/>
            {/* Information Paragraphs */}
            {data.main.map( (value, index) => {
                return (
                    <div data-testid={'main' + String(index)} key={value._id ? value._id : index}>
                        <div className='heading'>
                            <button className='blockButton' onClick={() => handleEdit('main' + String(index))}>
                                {editKey === 'main' + String(index) ? <SaveIcon fontSize='small' /> : <EditIcon fontSize='small'/>}
                            </button>
                            {editKey === 'main' + String(index) && 
                                <button className='blockButton' onClick={() => handleParagraphDeletion(index)}>
                                    <DeleteForeverIcon fontSize='small'/>
                                </button>
                            }
                            {editKey === 'main' + String(index) ? (
                                <input className='outline' onChange={(event) => handleParagraphHeadingChange(event, index)} value={localData.main[index].heading} />
                            ) : (
                                <h4> {value.heading} </h4>
                            )}
                        </div>
                        {editKey === 'main' + String(index) ? (
                            <textarea onChange={(event) => handleParagraphBodyChange(event, index)} value={localData.main[index].body} />
                        ) : (
                            <p> {value.body} </p>
                        )}
                    </div>
                );
            })}
            <button data-testid='addButton' className='blockButton' onClick={() => handleNewParagraph()}><AddIcon /></button>
        </div>
    )
}

export default DataPage;