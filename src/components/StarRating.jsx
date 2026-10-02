import React from 'react';

// Single Star Component utilizing an SVG mask/gradient
const Star = ({ fillPercentage }) => {
  // Unique ID for the SVG gradient to prevent collision if multiple star bars exist
  const gradientId = React.useId(); 

  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      style={{ marginRight: '2px', display: 'inline-block' }}
    >
      <defs>
        {/* Dynamic gradient mapping the exact decimal fill percentage */}
        <linearGradient id={gradientId}>
          <stop offset={`${fillPercentage}%`} stopColor="#FBBF24" /> {/* Tailwinds amber-400 color */}
          <stop offset={`${fillPercentage}%`} stopColor="#E5E7EB" /> {/* Tailwinds gray-200 color */}
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientId})`}
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
  );
};

// Main Rating Display Wrapper
export const StarRating = ({ rating = 4.2, maxStars = 5 }) => {
  // Generate an array representing each star (e.g., [1, 2, 3, 4, 5])
  const starsArray = Array.from({ length: maxStars }, (_, index) => index + 1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'sans-serif' }}>
      {/* Label Text */}
      <span style={{ fontSize: '10px', color:'#395774' }}>
        Rating
      </span>
      
      {/* Row containing stars and numeric indicator */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <div style={{ display: 'flex' }}>
          {starsArray.map((starIndex) => {
            // Determine how much of this specific star should be colored in
            let fillPercentage = 0;
            if (rating >= starIndex) {
              fillPercentage = 100; // Completely solid star
            } else if (rating > starIndex - 1) {
              fillPercentage = (rating - (starIndex - 1)) * 100; // Partial star (e.g., 0.2 * 100 = 20%)
            }

            return <Star key={starIndex} fillPercentage={fillPercentage} />;
          })}
        </div>

        {/* Text presentation matching your format */}
        <span style={{ fontSize: '16px', color: '#353a40', justifyContent:'center', alignItems:'center',display:'flex' }}>
          {rating.toFixed(1)}/{maxStars}
        </span>
      </div>
    </div>
  );
};

export default StarRating;
