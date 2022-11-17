import React from 'react';
import LinkBtn from './LinkBtn';
import '../scss/components/Info.css';

function Info({profileImgURL, profileAlt, name, jobTitle, website, email, linkedIn}) {
    return (
        <div className='info'>
            <img src={profileImgURL} alt={profileAlt} />
            <address className='flex-column inner-container'>
                <h2>{name}</h2>
                <span className='subtitle subtitle-txt'>{jobTitle}</span>
                <a id='website-link' target="_blank" href="#">{website}</a>
                <div className="link-btns flex-between">
                    <LinkBtn 
                        icon = {<i className="fa-solid fa-envelope icon"></i>}
                        link = {email} 
                        linkText = 'Email'
                        btnClass = 'white-btn'
                    />
                    <LinkBtn 
                        icon = {<i className="fa-brands fa-linkedin icon"></i>}
                        link = {linkedIn} 
                        linkText = 'LinkedIn'
                        btnClass = 'blue-btn'
                    />
                </div>
            </address>
        </div>
    )
}

export default Info
