import React, { forwardRef } from "react";
import { getRowByID } from "../../utils";
import { socket } from "../../socket";
import { ReactComponent as Planeta } from "../../svg/planeta.svg";
import { ReactComponent as Auchan } from "../../svg/auchan.svg";
import { ReactComponent as Imall } from "../../svg/imall.svg";
import { ReactComponent as Semya } from "../../svg/semya.svg";
import { Cost, SVGWrapper, Wrapper } from "../../styles";

const mallTypes = new Map([[
  "planeta", <Planeta />],
  ["auchan", <Auchan />],
  ["imall", <Imall />],
  ["semya", <Semya />]]);


const ShoppingMallTile = forwardRef(({ ownerColor, shownRent, type, id }, ref) => {
  const row = getRowByID(id);

  return (
    <Wrapper streetid={id}
             bgcolor={ownerColor}
             ref={ref}
             onClick={() => socket.emit("sell", id)}>
      {(row === "top" || row === "left") ?
        <><Cost streetid={id}>{shownRent}</Cost>
          <SVGWrapper streetid={id}>
            {mallTypes.get(type)}
          </SVGWrapper></> :
        <>
          <SVGWrapper streetid={id}>
            {mallTypes.get(type)}
          </SVGWrapper>
          <Cost streetid={id}>{shownRent}</Cost>
        </>

      }
    </Wrapper>
  );
});

export default ShoppingMallTile;