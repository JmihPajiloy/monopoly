import React, { forwardRef } from "react";
import { socket } from "../../socket";
import { ReactComponent as ThermalStation } from "../../svg/thermal-station.svg";
import { ReactComponent as HydroStation } from "../../svg/hydro-station.svg";
import { Cost, SVGWrapper, Wrapper } from "../../styles";

const utilTypes = new Map([
  ["thermal-station", <ThermalStation />],
  ["hydro-station", <HydroStation />]
]);

const UtilityTile = forwardRef(({ ownerColor, shownRent, type, id }, ref) => {

  return (
    <Wrapper streetid={id}
             ref={ref}
             bgcolor={ownerColor}
             onClick={() => socket.emit("sell", id)}>
      <Cost streetid={id}>{shownRent}</Cost>
      <SVGWrapper streetid={id}>
        {utilTypes.get(type)}
      </SVGWrapper>
    </Wrapper>
  );
});

export default UtilityTile;