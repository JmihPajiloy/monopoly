import React, { forwardRef } from "react";
import { Cost } from "./StreetTile";
import { SVGWrapper, Wrapper } from "./ShoppingMallTile";
import { socket } from "../../socket";

const utilTypes = new Map([["thermal-station", <svg xmlns="http://www.w3.org/2000/svg" width="75" height="25" viewBox="0 0 75 25" fill="none">
            <path d="M0 24.6667V0.333333H14.9541V4.83333H5.04071V24.6667H0Z" fill="#202020" />
            <path
              d="M18.5031 24.6667V0.333333H26.8707C28.5957 0.333333 30.0967 0.655555 31.3737 1.3C32.6731 1.94444 33.67 2.84444 34.3645 4C35.0814 5.15556 35.4399 6.51111 35.4399 8.06667C35.4399 9.6 35.0814 10.9556 34.3645 12.1333C33.6476 13.2889 32.6507 14.1889 31.3737 14.8333C30.0967 15.4778 28.5957 15.8 26.8707 15.8H23.5438V24.6667H18.5031ZM23.5438 11.4667H26.8707C27.946 11.4667 28.7973 11.1444 29.4246 10.5C30.0743 9.85556 30.3992 9.04444 30.3992 8.06667C30.3992 7.08889 30.0743 6.27778 29.4246 5.63333C28.7973 4.98889 27.946 4.66667 26.8707 4.66667H23.5438V11.4667Z"
              fill="#202020" />
            <path
              d="M46.3819 25C44.7465 25 43.3127 24.7 42.0805 24.1C40.8483 23.4778 39.885 22.6222 39.1905 21.5333C38.5184 20.4222 38.1823 19.1333 38.1823 17.6667H43.223C43.223 18.6222 43.4919 19.3667 44.0296 19.9C44.5896 20.4111 45.3737 20.6667 46.3819 20.6667C47.39 20.6667 48.1629 20.4111 48.7006 19.9C49.2607 19.3667 49.5407 18.6222 49.5407 17.6667V14.6667H42.6518V10.1667H49.5407V7.33333C49.5407 6.35556 49.2607 5.61111 48.7006 5.1C48.1629 4.58889 47.39 4.33333 46.3819 4.33333C45.3737 4.33333 44.5896 4.58889 44.0296 5.1C43.4919 5.61111 43.223 6.35556 43.223 7.33333H38.1823C38.1823 5.84444 38.5184 4.55556 39.1905 3.46667C39.885 2.37778 40.8483 1.53333 42.0805 0.933333C43.3127 0.311111 44.7465 0 46.3819 0C48.0397 0 49.4735 0.311111 50.6833 0.933333C51.9155 1.53333 52.8676 2.37778 53.5397 3.46667C54.2342 4.55556 54.5814 5.84444 54.5814 7.33333V17.6667C54.5814 19.1333 54.2342 20.4222 53.5397 21.5333C52.8676 22.6222 51.9155 23.4778 50.6833 24.1C49.4735 24.7 48.0397 25 46.3819 25Z"
              fill="#202020" />
            <path
              d="M66.8004 25C65.165 25 63.7312 24.7 62.499 24.1C61.2669 23.4778 60.3035 22.6222 59.609 21.5333C58.9369 20.4222 58.6009 19.1333 58.6009 17.6667V7.33333C58.6009 5.84444 58.9369 4.55556 59.609 3.46667C60.3035 2.37778 61.2669 1.53333 62.499 0.933333C63.7312 0.311111 65.165 0 66.8004 0C68.4583 0 69.8921 0.311111 71.1019 0.933333C72.334 1.53333 73.2862 2.37778 73.9583 3.46667C74.6527 4.55556 75 5.84444 75 7.33333H69.9593C69.9593 6.35556 69.6793 5.61111 69.1192 5.1C68.5815 4.58889 67.8086 4.33333 66.8004 4.33333C65.7923 4.33333 65.0082 4.58889 64.4481 5.1C63.9104 5.61111 63.6416 6.35556 63.6416 7.33333V17.6667C63.6416 18.6222 63.9104 19.3667 64.4481 19.9C65.0082 20.4111 65.7923 20.6667 66.8004 20.6667C67.8086 20.6667 68.5815 20.4111 69.1192 19.9C69.6793 19.3667 69.9593 18.6222 69.9593 17.6667H75C75 19.1333 74.6527 20.4222 73.9583 21.5333C73.2862 22.6222 72.334 23.4778 71.1019 24.1C69.8921 24.7 68.4583 25 66.8004 25Z"
              fill="#202020" /></svg>],
["hydro-station", <svg xmlns="http://www.w3.org/2000/svg" width="24" height="53" viewBox="0 0 24 53" fill="none">
            <path d="M0.320002 0L23.68 1.03613e-06V14.4497L19.36 14.4497L19.36 4.87067L0.320002 4.87067L0.320002 0Z"
                  fill="#202020" />
            <path
              d="M8.49902e-07 25.3473C9.17975e-07 23.767 0.288001 22.3816 0.864001 21.191C1.46133 20.0004 2.28267 19.0695 3.328 18.3985C4.39467 17.749 5.632 17.4243 7.04 17.4243V22.295C6.12267 22.295 5.408 22.5548 4.896 23.0743C4.40533 23.6155 4.16 24.3731 4.16 25.3473C4.16 26.3214 4.40533 27.0682 4.896 27.5878C5.408 28.129 6.12267 28.3996 7.04 28.3996H9.92V21.743H14.24L14.24 28.3996H16.96C17.8987 28.3996 18.6133 28.129 19.104 27.5878C19.5947 27.0682 19.84 26.3214 19.84 25.3473C19.84 24.3731 19.5947 23.6155 19.104 23.0743C18.6133 22.5548 17.8987 22.295 16.96 22.295V17.4243C18.3893 17.4243 19.6267 17.749 20.672 18.3985C21.7173 19.0695 22.528 20.0004 23.104 21.191C23.7013 22.3816 24 23.767 24 25.3473C24 26.9492 23.7013 28.3346 23.104 29.5036C22.528 30.6942 21.7173 31.6142 20.672 32.2636C19.6267 32.9347 18.3893 33.2702 16.96 33.2702H7.04C5.632 33.2702 4.39467 32.9347 3.328 32.2636C2.28267 31.6142 1.46133 30.6942 0.864001 29.5036C0.288001 28.3346 7.80896e-07 26.9492 8.49902e-07 25.3473Z"
              fill="#202020" />
            <path
              d="M0 45.077C6.80732e-08 43.4968 0.288 42.1113 0.864 40.9207C1.46133 39.7301 2.28267 38.7993 3.328 38.1282C4.39467 37.4788 5.632 37.1541 7.04 37.1541L16.96 37.1541C18.3893 37.1541 19.6267 37.4788 20.672 38.1282C21.7173 38.7993 22.528 39.7301 23.104 40.9207C23.7013 42.1113 24 43.4968 24 45.077C24 46.679 23.7013 48.0644 23.104 49.2333C22.528 50.424 21.7173 51.344 20.672 51.9934C19.6267 52.6645 18.3893 53 16.96 53L16.96 48.1293C17.8987 48.1293 18.6133 47.8587 19.104 47.3176C19.5947 46.798 19.84 46.0512 19.84 45.077C19.84 44.1029 19.5947 43.3452 19.104 42.8041C18.6133 42.2845 17.8987 42.0248 16.96 42.0248H7.04C6.12267 42.0248 5.408 42.2845 4.896 42.8041C4.40533 43.3452 4.16 44.1029 4.16 45.077C4.16 46.0512 4.40533 46.798 4.896 47.3176C5.408 47.8587 6.12267 48.1293 7.04 48.1293L7.04 53C5.632 53 4.39467 52.6645 3.328 51.9934C2.28267 51.344 1.46133 50.424 0.864 49.2333C0.288 48.0644 -6.90057e-08 46.679 0 45.077Z"
              fill="#202020" />
          </svg>]])

const UtilityTile = forwardRef(({ ownerColor, shownRent, type, id }, ref) => {

  const onClick = () => {
    socket.emit("sell", id)
  }

  return (
    <Wrapper streetid={id} ref={ref} bgcolor={ownerColor} onClick={onClick}>
        <Cost streetid={id}>{shownRent}</Cost>
        <SVGWrapper streetid={id}>
          {utilTypes.get(type)}
        </SVGWrapper>
      </Wrapper>
  );
});

export default UtilityTile;