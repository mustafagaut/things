import React from 'react'

import playstore from "../../../images/playstore.png";

import './footer.css';


const footer = () => {
  return (
    <footer>
    <div className='leftFooter'>
      <h4>Download our app</h4>
      <p>Download app for iOS and android devices</p>
      <img src={playstore} alt="playstore icon"/>

    </div> 

    
    <div className='midFooter'>
      <h1>Things.</h1>
      <p>Quality matter's the most</p>
      <p>Copyright 2022 &copy; Things</p>



    </div>  
    <div className='rightFooter'>
      <h4>Follow Us</h4>
      <a href="https/instagram.com/mustafaabdeali">Instagram</a>
      <a href="https/twitter.com/mustafaabdeali">Twitter</a>
      <a href="https/facebook.com/mustafaabdeali">Youtube</a>
      <a href="https/youtube.com/justforfun">facebook</a>


      

      
    </div>  
    </footer>

  )
}

export default footer