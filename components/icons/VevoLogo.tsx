
import React from 'react';

export const VevoLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 200 50"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    fill="currentColor"
  >
    <text
      x="0"
      y="40"
      fontFamily="Arial, sans-serif"
      fontSize="50"
      fontWeight="bold"
      letterSpacing="-3"
    >
      <tspan>VE</tspan>
      <tspan fill="red">V</tspan>
      <tspan>O</tspan>
    </text>
  </svg>
);
