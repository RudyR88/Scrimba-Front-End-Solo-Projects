import React from 'react';
import {useUID} from 'react-uid';
import {places} from '../js/data.js';
import '../scss/components/Locations.css';
import Location from './Location';

function Locations() {
    const locationEls = places.map((place, index) => 
    <>
        <Location key={useUID()} place={place} />
        {index ===  places.length - 1 ? '' : <hr />}
    </>
    )

    return (
        <main className='locations'>
            {locationEls}
        </main>
    )
}

export default Locations
