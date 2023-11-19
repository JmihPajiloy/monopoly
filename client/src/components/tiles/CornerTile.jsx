import React, { forwardRef } from "react";

const style = {
  backgroundColor: "#F5F5F5",
  borderRadius: "5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const tileTypes = new Map([["free-parking",
  <svg xmlns="http://www.w3.org/2000/svg" width="85" height="85" viewBox="0 0 85 85" fill="none">
    <path fillRule="evenodd" clipRule="evenodd"
          d="M0.732233 0.732233C1.70854 -0.244078 3.29146 -0.244078 4.26777 0.732233L84.2678 80.7322C85.2441 81.7085 85.2441 83.2915 84.2678 84.2678C83.2915 85.2441 81.7085 85.2441 80.7322 84.2678L0.732233 4.26777C-0.244078 3.29146 -0.244078 1.70854 0.732233 0.732233Z"
          fill="#202020" />
    <path fillRule="evenodd" clipRule="evenodd"
          d="M42.5 77.5C61.83 77.5 77.5 61.83 77.5 42.5C77.5 23.17 61.83 7.49999 42.5 7.49999C23.17 7.49999 7.5 23.17 7.5 42.5C7.5 61.83 23.17 77.5 42.5 77.5ZM42.5 82.5C64.5914 82.5 82.5 64.5914 82.5 42.5C82.5 20.4086 64.5914 2.49999 42.5 2.49999C20.4086 2.49999 2.5 20.4086 2.5 42.5C2.5 64.5914 20.4086 82.5 42.5 82.5Z"
          fill="#202020" />
  </svg>],
  ["go-to-jail", <svg xmlns="http://www.w3.org/2000/svg" width="69" height="75" viewBox="0 0 69 75" fill="none">
    <path d="M3 72H66M7 22H60M8 62H61M14 62L14 22M53 62V22M40 62V22M27 62L27 22M7 14L34 3L61 14"
          stroke="#202020"
          strokeWidth="5" strokeLinecap="round" />
  </svg>],
  ["jail", <svg xmlns="http://www.w3.org/2000/svg" width="86" height="83" viewBox="0 0 86 83" fill="none">
    <path fillRule="evenodd" clipRule="evenodd"
          d="M0 11.5C0 10.1193 1.11929 9 2.5 9H83.5C84.8807 9 86 10.1193 86 11.5C86 12.8807 84.8807 14 83.5 14H2.5C1.11929 14 0 12.8807 0 11.5Z"
          fill="#202020" />
    <path fillRule="evenodd" clipRule="evenodd"
          d="M0 71.5C0 70.1193 1.11929 69 2.5 69H83.5C84.8807 69 86 70.1193 86 71.5C86 72.8807 84.8807 74 83.5 74H2.5C1.11929 74 0 72.8807 0 71.5Z"
          fill="#202020" />
    <path fillRule="evenodd" clipRule="evenodd"
          d="M75.5 0C76.8807 0 78 1.11929 78 2.5V80.5C78 81.8807 76.8807 83 75.5 83C74.1193 83 73 81.8807 73 80.5V2.5C73 1.11929 74.1193 0 75.5 0Z"
          fill="#202020" />
    <path fillRule="evenodd" clipRule="evenodd"
          d="M10.5 0C11.8807 0 13 1.11929 13 2.5V80.5C13 81.8807 11.8807 83 10.5 83C9.11929 83 8 81.8807 8 80.5V2.5C8 1.11929 9.11929 0 10.5 0Z"
          fill="#202020" />
    <path fillRule="evenodd" clipRule="evenodd"
          d="M25.5 18C26.8807 18 28 19.1193 28 20.5V62.5C28 63.8807 26.8807 65 25.5 65C24.1193 65 23 63.8807 23 62.5V20.5C23 19.1193 24.1193 18 25.5 18Z"
          fill="#202020" />
    <path fillRule="evenodd" clipRule="evenodd"
          d="M42.5 18C43.8807 18 45 19.1193 45 20.5V62.5C45 63.8807 43.8807 65 42.5 65C41.1193 65 40 63.8807 40 62.5V20.5C40 19.1193 41.1193 18 42.5 18Z"
          fill="#202020" />
    <path fillRule="evenodd" clipRule="evenodd"
          d="M60.5 18C61.8807 18 63 19.1193 63 20.5V62.5C63 63.8807 61.8807 65 60.5 65C59.1193 65 58 63.8807 58 62.5V20.5C58 19.1193 59.1193 18 60.5 18Z"
          fill="#202020" />
  </svg>],
  ["start", <svg xmlns="http://www.w3.org/2000/svg" width="106" height="48" viewBox="0 0 106 48" fill="none">
    <g clipPath="url(#clip0_141_819)">
      <path
        d="M19.3633 28.8001V14.4197H6.4573V0H33.9257L27.354 11.3069C29.6919 12.3592 31.7819 13.8583 33.5127 15.6947C35.1744 6.76506 43.0668 0 52.5531 0C59.9171 0 66.3205 4.07606 69.5951 10.0774C72.8689 4.07606 79.2727 0 86.6367 0C97.3307 0 106 8.59619 106 19.1999C106 29.8036 97.3307 38.3998 86.6367 38.3998C79.2727 38.3998 72.8689 34.3238 69.5951 28.3229C66.3205 34.3238 59.9171 38.3998 52.5531 38.3998C46.9691 38.3998 41.9378 36.0551 38.4037 32.3053C36.7421 41.2349 28.8501 48 19.3633 48C8.66934 48 0 39.4038 0 28.8001H19.3633Z"
        fill="#202020" />
    </g>
    <defs>
      <clipPath id="clip0_141_819">
        <rect width="106" height="48" fill="white" />
      </clipPath>
    </defs>
  </svg>]
]);

const CornerTile = forwardRef(({ type }, ref) => {


  return (
    <div style={style} ref={ref}>
      {tileTypes.get(type)}
    </div>
  );
});

export default CornerTile;