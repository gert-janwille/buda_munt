/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () => (
  <footer className='footer lato-bol'>

    <ul className='footer-links'>
      <li className='footer-item'><Link to={`/`}>Buda-Munt</Link></li>
      <li className='footer-item'><Link to={`/overzicht`}>Overzicht</Link></li>
      <li className='footer-item'><Link to={`/inschrijven`}>Schrijf je in</Link></li>
      <li className='footer-item'><Link to={`/contact`}>Contact</Link></li>
    </ul>

    <div className='footer-contact-info'>
      <a className='light-grey-color footer-contact-item' href='tel:03 828 47 73'>03 828 47 73</a>
      <a className='light-grey-color footer-contact-item' href='mailto:info@budamunt.be'>info@budamunt.be</a>
      <a className='light-grey-color footer-contact-item' href='https://www.google.be/maps/place/Doorniksewijk+120,+8500+Kortrijk/@50.8198983,3.2670274,17z/' target='_blank' rel='noopener noreferrer'>Doorniksewijk 120</a>
    </div>

  </footer>
);

export default Footer;
