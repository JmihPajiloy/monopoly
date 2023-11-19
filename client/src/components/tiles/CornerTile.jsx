import React, { forwardRef } from "react";
import { ReactComponent as FreeParking } from "../../svg/free-parking.svg";
import { ReactComponent as GoToJail } from "../../svg/go-to-jail.svg";
import { ReactComponent as Jail } from "../../svg/jail.svg";
import { ReactComponent as Start } from "../../svg/start.svg";


const style = {
  backgroundColor: "#F5F5F5",
  borderRadius: "5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const tileTypes = new Map([
  ["free-parking", <FreeParking/>],
  ["go-to-jail", <GoToJail/>],
  ["jail", <Jail/>],
  ["start", <Start/>]
]);

const CornerTile = forwardRef(({ type }, ref) => {

  return (
    <div style={style} ref={ref}>
      {tileTypes.get(type)}
    </div>
  );
});

export default CornerTile;