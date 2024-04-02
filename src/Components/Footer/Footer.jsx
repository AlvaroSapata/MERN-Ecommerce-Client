import React from 'react'
import './Footer.css'

import footer_logo from '../Assets/nav-logo-Image.svg'
import instagram_icon from '../Assets/instagram.svg'
import pintrest_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>LA.GRIMA</p>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-copyright">
     
        <hr />
        <div className="footer-content">
        <p>© 2024 LA.GRIMA Taller </p>
        <a href="https://www.instagram.com/la__grima__taller/" target="_blank" rel="noreferrer">
          <img src={instagram_icon} alt="Insta" />
        </a>
        <p> All rights reserved</p>
      </div>
      </div>
    </div>
  )
}

export default Footer
