import React, { useState } from 'react';

// Helper function to generate a consistent color from a string (e.g., user's name)
const generateColor = (name) => {
  let hash = 0;
  if (!name || name.length === 0) return '#ccc';
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Ensure 32bit integer
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};

const Avatar = ({ src, name, size = 40 }) => {
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    setImgError(true);
  };

  const initial = name ? name.charAt(0).toUpperCase() : '?';
  const color = generateColor(name);

  const style = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    objectFit: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color,
    color: 'white',
    fontSize: `${size * 0.5}px`,
    fontWeight: '600',
    fontFamily: 'system-ui, sans-serif',
    border: '2px solid white',
    boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
    lineHeight: `${size}px`,
    textAlign: 'center'
  };

  // If src is provided and there's no error, try to render the image
  if (src && !imgError) {
    return (
      <img
        src={src}
        alt={name}
        style={style}
        onError={handleImageError}
      />
    );
  }

  // Otherwise, render the initial
  return (
    <div style={style}>
      {initial}
    </div>
  );
};

export default Avatar; 