import React from 'react';
import '../scss/components/LinkBtn.css';

function LinkBtn({icon, link, linkText, btnClass}) {
    return (
        <a href={link} className = {`link-btn link-btn-txt ${btnClass}`} target='_blank'>{icon}{linkText}</a>
    );
}

export default LinkBtn;
