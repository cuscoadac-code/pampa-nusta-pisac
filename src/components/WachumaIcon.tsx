import React from 'react';

export const WachumaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10 21V5a2 2 0 0 1 4 0v16" />
      <path d="M6 14V9a2 2 0 0 1 4 0" />
      <path d="M14 11a2 2 0 0 1 4 0v5" />
      <line x1="8" y1="21" x2="16" y2="21" />
    </svg>
  );
};
