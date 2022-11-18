import React from 'react';
import '../scss/components/Location.css';

export default function Location({place}) {
    const {img, country, mapLink, location, date, summary} = place;
  return (
    <div className='place flex-between'>
        <img src={img} alt={`image of ${location} in ${country}`}/>
        <div className='location-info'>
            <div className="location-info__location flex">
                <i className="fa-solid fa-location-dot"></i>
                <span className='country'>{location}</span>
                <a href={mapLink} target='_blank'>View on Google Maps</a>
            </div>
            <h2>{location}</h2>
            <span className='date'>{date}</span>
            <p>{summary}</p>
        </div>
    </div>
  )
}
