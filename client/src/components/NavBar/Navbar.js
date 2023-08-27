import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import {useCookies} from 'react-cookie';
import { useGetUserID } from '../hooks/useGetUserID';

function Navbar() {
  const [click, setClick] = useState(false);
  const [cookie, SetCookie] = useCookies(["access_token"]);
  const userID = useGetUserID()
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  // const PageNo = () => localStorage.setItem('pageNo',1)

  const logout = () => {
    closeMobileMenu();
    SetCookie("access_token","");
    window.localStorage.removeItem('userID');
  }

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          <span style={{color: '#A2FF00'}}>Read</span>
          <span style={{color: '#00FFD4'}}>Write</span>
          <span style={{color: '#FF0062'}}>Review</span>
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>

          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu} style={{fontSize:'18px',fontWeight:'590'}}>
              Home
            </Link>
          </li>

          {cookie.access_token ? (<>
          <li className='nav-item'>
            <Link
              to='/add-book'
              className='nav-links'
              onClick={closeMobileMenu}
              style={{fontSize:'18px',fontWeight:'590'}}
            >
              Add Book
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/saved-books'
              className='nav-links'
              onClick={closeMobileMenu}
              style={{fontSize:'18px',fontWeight:'590'}}
            >
              Saved Books
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/login'
              className='nav-links'
              onClick={logout} 
              style={{fontSize:'18px',fontWeight:'590'}}
            >
              Logout
            </Link>
          </li>
           </>) :(<><li className='nav-item'>
            <Link
              to='/login'
              className='nav-links'
              onClick={closeMobileMenu}
              style={{fontSize:'18px',fontWeight:'590'}}
            >
              Login
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/register'
              className='nav-links'
              onClick={closeMobileMenu}
              style={{fontSize:'18px',fontWeight:'590'}}
            >
              Register
            </Link>
          </li></>)}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;