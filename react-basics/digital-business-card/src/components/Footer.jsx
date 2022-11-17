import React from 'react';
import '../scss/components/Footer.css';

function Footer() {
    return (
        <footer className='flex-center'>
            <a href='#'><i className='fa-brands fa-square-twitter'></i></a>
            <a href='#'><i className='fa-brands fa-square-facebook'></i></a>
            <a href='#'><i className='fa-brands fa-square-instagram'></i></a>
            <a href='https://github.com/RudyR88' target='_blank'><i className='fa-brands fa-square-github'></i></a>
        </footer>
    )
}

export default Footer
