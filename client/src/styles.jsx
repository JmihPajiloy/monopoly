import styled from "styled-components";
import { getRowByID, isVertical } from "./utils";

export const Wrapper = styled.div`
  background-color: ${props => props.bgcolor ? props.bgcolor : "#F5F5F5"};
  border-radius: 5px;
  transition: 0.3s;
  ${props => isVertical(props.streetid) ? "display: flex;" : ""}
`;

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const SVGWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => isVertical(props.streetid) ? 100 : 70}px;
  height: ${props => isVertical(props.streetid) ? 70 : 100}px;
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