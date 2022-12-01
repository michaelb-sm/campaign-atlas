import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './DataPage.css';

function DataPage({page, refData}) {
    const [data, setData] = useState();

    useEffect(() => {
        if (page !== "main") {
            Axios.get('http://localhost:3001/' + page)
                .then(response => setData(response.data));
        }
    }, [page]);

    if (!data) {
        return <p>Loading...</p>
    }
    
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
                        <h2 key={key}> {value} </h2>
                    );
                })}
            </div>
            <hr/>
            {data.main.map( (value) => {
                return (
                    <div key={value._id}>
                        <h4> {value.heading} </h4>
                        <p> {value.body} </p>
                    </div>
                );
            })}
        </div>
    )
}

export default DataPage;