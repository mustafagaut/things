import React from 'react';
import Profile from '../../images/profile.png'
import Rating from '@material-ui/lab/Rating'

const reviewcard = ({review}) => {
    
  const options={
        
    value:review.rating,
    readOnly:true,
    precision:0.5

}
  return (
    <div className='reviewCard'>
        <img src={Profile} alt="user"/>
        <p>{review.name}</p>
        <Rating  {...options}/>
        <span className='reviewCardComment'>{review.comment}</span>


    </div>

  )
}

export default reviewcard