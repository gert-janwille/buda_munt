/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {Link} from 'react-router-dom';
import token from '../../lib/auth/token';

const Navigation = () => (
  <nav className='navigation lato-bol'>

    <ul className='nav-list nav-split-left'>
      <li className='logo-container'><Link to={`/`} className='logo con-lo'><span className='hidden'>Buda Munt</span></Link></li>
      <li className={window.location.pathname !== `/overzicht` ? `item` : `item navigation-active-tab`}><Link to={`/overzicht`}>overzicht</Link></li>
      <li className={window.location.pathname !== `/inschrijven` ? `item` : `item navigation-active-tab`}><Link to={`/inschrijven`}>Schrijf je in</Link></li>
      <li className={window.location.pathname !== `/contact` ? `item` : `item navigation-active-tab`}><Link to={`/contact`}>Contact</Link></li>
    </ul>

    <ul className='nav-list nav-split-right'>
      <li className='item'><a className='grey-color' href='tel:03 828 47 73'>03 828 47 73</a></li>
      <li className='button'><Link to={(!token.isValid() && !token.content()) ? `/login` : `/dashboard`}>{(!token.isValid() && !token.content()) ? `login` : `dashboard`}</Link></li>
    </ul>

  </nav>
);

export default Navigation;
