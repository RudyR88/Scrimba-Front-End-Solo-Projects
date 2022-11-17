import React from 'react';
import '../scss/components/Section.css';


function Section({title, content}) {
    return (
        <div className='section inner-container'>
            <h3>{title}</h3>
            <p>{content}</p>
        </div>
    );
}

export default Section;
