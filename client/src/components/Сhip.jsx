import React from "react";
import { getColor } from "../utils";


export const Chip = ({ color, x, y }) => {
  const fill = getColor(color).normal;
  // const stroke = getColor(color).normal;
  return (
    <svg style={{
      transition: "1s",
      position: "absolute",
      top: `${y}px`,
      left: `${x}px`
    }}
         xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
      <path
        d="M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z"
        fill={fill} stroke="#202020" strokeWidth="5" />
    </svg>
  );
};