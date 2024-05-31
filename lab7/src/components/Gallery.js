import React from 'react';
import './Gallery.css';

const images = [
    require('../apple1.jpg'),
    require('../samsung1.jpg'),
    require('../google1.jpg'),
    require('../honor1.jpg')
];

const Gallery = () => {
    return (
        <div className="gallery">
            {images.map((image, index) => (
                <img key={index} src={image} alt="phone" />
            ))}
        </div>
    );
};

export default Gallery;
