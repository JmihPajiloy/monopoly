import React, { forwardRef } from "react";
import { getRowByID, isVertical } from "../../utils";
import styled from "styled-components";
import { socket } from "../../socket";

const StreetWrapper = styled.div`
  display: grid;
  grid-gap: 5px;
`;
const Header = styled.div`
  width: ${props => isVertical(props.streetid) ? 25 : 70}px;
  height: ${props => isVertical(props.streetid) ? 70 : 25}px;
  border-radius: 5px;
  flex-shrink: 0;
  ${props => isVertical(props.streetid) ? "grid-row: 1;" : ""}
  background-color: ${props => props.bgcolor}
`;
const WhiteSpace = styled.div`
  display: flex;
  transition: 0.3s;
  width: ${props => isVertical(props.streetid) ? 90 : 70}px;
  height: ${props => isVertical(props.streetid) ? 70 : 90}px;
  flex-shrink: 0;
  border-radius: 5px;
  background: ${props => props.bgcolor ? props.bgcolor : "#F5F5F5"};
  justify-content: space-between;
  ${props => isVertical(props.streetid) ? "grid-row: 1;" : "flex-direction: column;"}
`;
const Title = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  color: #202020;
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  width: ${props => isVertical(props.streetid) ? 40 : 70}px;
  height: ${props => isVertical(props.streetid) ? 70 : 40}px;
  ${props => {
    switch (getRowByID(props.streetid)) {
      case "left": return "transform: rotate(90deg);"
      case "right": return "transform: rotate(-90deg);"
    default: return ""
  }
  }}
  
  
`;
export const Cost = styled.div`
  text-align: center;
  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  color: #202020;
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  width: ${props => isVertical(props.streetid) ? 20 : 70}px;
  height: ${props => isVertical(props.streetid) ? 70 : 20}px;
  
  ${props => {
    switch (getRowByID(props.streetid)) {
      case "left":
        return "transform: rotate(90deg);"
      case "right":
        return "transform: rotate(-90deg);"
      default:
        return ""
    }
  }}
`;

const StreetTile = forwardRef(({ color, ownerColor, shownRent, children, id }, ref) => {
  const row = getRowByID(id);

  const onClick = () => {
    socket.emit("sell", id)
  }

  return (
    <StreetWrapper onClick={onClick}>

      {(row === "top" || row === "left") ?
        <><WhiteSpace streetid={id} bgcolor={ownerColor} ref={ref}>
          <Cost streetid={id}>{shownRent}</Cost>
          <Title streetid={id}>{children}</Title>
        </WhiteSpace>
          <Header streetid={id} bgcolor={color} />
        </> : <>
          <Header streetid={id} bgcolor={color} />
          <WhiteSpace streetid={id} bgcolor={ownerColor} ref={ref}>
            <Title streetid={id}>{children}</Title>
            <Cost streetid={id}>{shownRent}</Cost>
          </WhiteSpace></>
      }
    </StreetWrapper>);
});

export default StreetTile;
