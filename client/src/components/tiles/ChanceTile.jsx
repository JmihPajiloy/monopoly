import React, { forwardRef } from "react";
import { isVertical } from "../../utils";
import { ReactComponent as ChanceHorizontal } from "../../svg/chance-horizontal.svg";
import { ReactComponent as ChanceVertical } from "../../svg/chance-vertical.svg";

const style = {
  backgroundColor: "#F5F5F5",
  borderRadius: "5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const ChanceTile = forwardRef(({ id }, ref) => {
  return (
    <div style={style} ref={ref}>
      {
        isVertical(id) ?
          <ChanceHorizontal />
          :
          <ChanceVertical />
      }
    </div>
  );
});

export default ChanceTile;