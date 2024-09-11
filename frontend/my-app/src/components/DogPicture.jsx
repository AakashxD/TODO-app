import React, { useEffect, useState } from 'react';
// import dog from './assets/dog.jpg'
const DogPicture = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((res) => res.json())
      .then((data) => {
        setImageUrl(data.message);
      });
  }, []);
  

  return (
    <div >
      <img src={imageUrl} alt='a dog' />
    </div>
  );
};

export default DogPicture;