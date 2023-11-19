import React, { forwardRef } from "react";
import { SVGWrapper, Wrapper } from "./ShoppingMallTile";
import { Cost } from "./StreetTile";
import { isVertical } from "../../utils";

const style = {
  backgroundColor: "#F5F5F5",
  borderRadius: "5px"
};

const TaxTile = forwardRef(({ id, amount }, ref) => {
  return (
    <Wrapper streetid={id} ref={ref}>
      <SVGWrapper streetid={id}>
        {isVertical(id) ?
          <svg xmlns="http://www.w3.org/2000/svg" width="38" height="52" viewBox="0 0 38 52" fill="none">
            <path
              d="M6.2935 52V41.78H0.833496V35.41H6.2935V30.02H0.833496V23.58H6.2935V0.900024H21.9735C26.8268 0.900024 30.7002 2.23002 33.5935 4.89002C36.4868 7.50336 37.9335 11.0267 37.9335 15.46C37.9335 19.8934 36.4868 23.44 33.5935 26.1C30.7002 28.7134 26.8268 30.02 21.9735 30.02H13.8535V35.41H29.4635V41.78H13.8535V52H6.2935ZM13.8535 23.58H21.9735C24.4935 23.58 26.5002 22.8567 27.9935 21.41C29.4868 19.9167 30.2335 17.9334 30.2335 15.46C30.2335 12.9867 29.4868 11.0267 27.9935 9.58003C26.5002 8.08669 24.4935 7.34002 21.9735 7.34002H13.8535V23.58Z"
              fill="#202020" />
          </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="38" height="52" viewBox="0 0 38 52" fill="none">
            <path
              d="M6.29374 52V41.78H0.83374V35.41H6.29374V30.02H0.83374V23.58H6.29374V0.900024H21.9737C26.8271 0.900024 30.7004 2.23002 33.5937 4.89002C36.4871 7.50336 37.9337 11.0267 37.9337 15.46C37.9337 19.8934 36.4871 23.44 33.5937 26.1C30.7004 28.7134 26.8271 30.02 21.9737 30.02H13.8537V35.41H29.4637V41.78H13.8537V52H6.29374ZM13.8537 23.58H21.9737C24.4937 23.58 26.5004 22.8567 27.9937 21.41C29.4871 19.9167 30.2337 17.9334 30.2337 15.46C30.2337 12.9867 29.4871 11.0267 27.9937 9.58002C26.5004 8.08669 24.4937 7.34003 21.9737 7.34003H13.8537V23.58Z"
              fill="#202020" />
          </svg>}

      </SVGWrapper>
      <Cost streetid={id}>{amount}</Cost>
    </Wrapper>
  );
});

export default TaxTile;