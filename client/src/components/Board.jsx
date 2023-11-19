import React, { useRef } from "react";
import "../style.css";
import { useTileColors } from "../hooks/useTileColors";
import { useChipProps } from "../hooks/useChip";
import { useRents } from "../hooks/useRent";
import CornerTile from "./tiles/CornerTile";
import ChanceTile from "./tiles/ChanceTile";
import StreetTile from "./tiles/StreetTile";
import ShoppingMallTile from "./tiles/ShoppingMallTile";
import TaxTile from "./tiles/TaxTile";
import UtilityTile from "./tiles/UtilityTile";
import { Chip } from "./Сhip";

const Colors = {
  WHITE: "#E7E7E7",
  BROWN: "#955436",
  LIGHT_BLUE: "#AAE0FC",
  PINK: "#D93A96",
  ORANGE: "#F7941D",
  RED: "#ED1B24",
  YELLOW: "#FEF200",
  GREEN: "#1FB25A",
  DARK_BLUE: "#0072BB"
};


const Board = () => {
  const tileRefs = useRef(new Array(40).fill(null));
  const chipProps = useChipProps(tileRefs);
  const tileColors = useTileColors(tileRefs);
  const tileRents = useRents();

  return (
    <>
      <CornerTile type="free-parking" id="20" ref={tile => tileRefs.current[20] = tile}/>

      <StreetTile id="21"
                  shownRent={tileRents[21]}
                  color={Colors.RED}
                  ownerColor={tileColors[21]}
                  ref={tile => tileRefs.current[21] = tile}>
        Пожар-<br />
        ского
      </StreetTile>

      <ChanceTile id="22" ref={tile => tileRefs.current[22] = tile} />

      <StreetTile id="23"
                  color={Colors.RED}
                  shownRent={tileRents[23]}
                  ownerColor={tileColors[23]}
                  ref={tile => tileRefs.current[23] = tile}>
        Желябова
      </StreetTile>

      <StreetTile id="24"
                  color={Colors.RED}
                  shownRent={tileRents[24]}
                  ownerColor={tileColors[24]}
                  ref={tile => tileRefs.current[24] = tile}>
        Проспект<br />
        Парковый
      </StreetTile>

      <ShoppingMallTile
        id="25"
        type="auchan"
        shownRent={tileRents[25]}
        ownerColor={tileColors[25]}
        ref={tile => tileRefs.current[25] = tile} />

      <StreetTile id="26"
                  color={Colors.YELLOW}
                  shownRent={tileRents[26]}
                  ownerColor={tileColors[26]}
                  ref={tile => tileRefs.current[26] = tile}>
        Леонова
      </StreetTile>

      <StreetTile id="27"
                  color={Colors.YELLOW}
                  shownRent={tileRents[27]}
                  ownerColor={tileColors[27]}
                  ref={tile => tileRefs.current[27] = tile}>
        Геологов
      </StreetTile>

      <UtilityTile id="28"
                   shownRent={tileRents[28]}
                   ownerColor={tileColors[28]}
                   type="hydro-station"
                   ref={tile => tileRefs.current[28] = tile} />

      <StreetTile id="29"
                  color={Colors.YELLOW}
                  shownRent={tileRents[29]}
                  ownerColor={tileColors[29]}
                  ref={tile => tileRefs.current[29] = tile}>
        мкр. <br />
        Нагорный
      </StreetTile>

      <CornerTile type="go-to-jail" ref={tile => tileRefs.current[30] = tile}/>

      {/*Left & Right*/}

      <StreetTile id="19"
                  color={Colors.ORANGE}
                  shownRent={tileRents[19]}
                  ownerColor={tileColors[19]}
                  ref={tile => tileRefs.current[19] = tile}>
        Юрша
      </StreetTile>

      <StreetTile id="31"
                  color={Colors.GREEN}
                  shownRent={tileRents[31]}
                  ownerColor={tileColors[31]}
                  ref={tile => tileRefs.current[31] = tile}>
        ш. Кос-<br />
        монавтов
      </StreetTile>

      <StreetTile id="18"
                  color={Colors.ORANGE}
                  shownRent={tileRents[18]}
                  ownerColor={tileColors[18]}
                  ref={tile => tileRefs.current[18] = tile}>
        Уинская
      </StreetTile>

      <StreetTile id="32"
                  color={Colors.GREEN}
                  shownRent={tileRents[32]}
                  ownerColor={tileColors[32]}
                  ref={tile => tileRefs.current[32] = tile}>
        Революции
      </StreetTile>

      <ChanceTile id="17" ref={tile => tileRefs.current[17] = tile}/>

      <ChanceTile id="33" ref={tile => tileRefs.current[33] = tile}/>

      <StreetTile id="16"
                  color={Colors.ORANGE}
                  shownRent={tileRents[16]}
                  ownerColor={tileColors[16]}
                  ref={tile => tileRefs.current[16] = tile}>
        Пушкар-<br />
        ская
      </StreetTile>

      <StreetTile id="34"
                  color={Colors.GREEN}
                  shownRent={tileRents[34]}
                  ownerColor={tileColors[34]}
                  ref={tile => tileRefs.current[34] = tile}>
        Попова
      </StreetTile>

      <ShoppingMallTile
        id="15"
        type="planeta"
        shownRent={tileRents[15]}
        ownerColor={tileColors[15]}
        ref={tile => tileRefs.current[15] = tile} />

      <ShoppingMallTile
        id="35"
        type="imall"
        shownRent={tileRents[35]}
        ownerColor={tileColors[35]}
        ref={tile => tileRefs.current[35] = tile} />

      <StreetTile id="14"
                  color={Colors.PINK}
                  shownRent={tileRents[14]}
                  ownerColor={tileColors[14]}
                  ref={tile => tileRefs.current[14] = tile}>
        Светло-<br />
        горская
      </StreetTile>

      <ChanceTile id="36" ref={tile => tileRefs.current[36] = tile} />

      <StreetTile id="13"
                  color={Colors.PINK}
                  shownRent={tileRents[13]}
                  ownerColor={tileColors[13]}
                  ref={tile => tileRefs.current[13] = tile}>
        Адмирала<br />
        Ушакова
      </StreetTile>

      <StreetTile id="37"
                  color={Colors.DARK_BLUE}
                  shownRent={tileRents[37]}
                  ownerColor={tileColors[37]}
                  ref={tile => tileRefs.current[37] = tile}>
        Компрос
      </StreetTile>

      <UtilityTile
        id="12"
        shownRent={tileRents[12]}
        ownerColor={tileColors[12]}
        type="thermal-station"
        ref={tile => tileRefs.current[12] = tile} />

      <TaxTile id="38" amount="100₽" ref={tile => tileRefs.current[38] = tile} />


      <StreetTile id="11"
                  color={Colors.PINK}
                  shownRent={tileRents[11]}
                  ownerColor={tileColors[11]}
                  ref={tile => tileRefs.current[11] = tile}>
        Маршала<br />
        Рыбалко
      </StreetTile>

      <StreetTile id="39"
                  color={Colors.DARK_BLUE}
                  shownRent={tileRents[39]}
                  ownerColor={tileColors[39]}
                  ref={tile => tileRefs.current[39] = tile}>Ленина
      </StreetTile>

      <CornerTile type="jail" id="10" ref={tile => tileRefs.current[10] = tile} />

      <StreetTile id="9"
                  color={Colors.LIGHT_BLUE}
                  shownRent={tileRents[9]}
                  ownerColor={tileColors[9]}
                  ref={tile => tileRefs.current[9] = tile}>
        Зоопарк
      </StreetTile>

      <StreetTile id="8"
                  color={Colors.LIGHT_BLUE}
                  shownRent={tileRents[8]}
                  ownerColor={tileColors[8]}
                  ref={tile => tileRefs.current[8] = tile}>
        Аквапарк
      </StreetTile>

      <ChanceTile id="7" ref={tile => tileRefs.current[7] = tile} />

      <StreetTile id="6"
                  color={Colors.LIGHT_BLUE}
                  shownRent={tileRents[6]}
                  ownerColor={tileColors[6]}
                  ref={tile => tileRefs.current[6] = tile}>
        Метро
      </StreetTile>

      <ShoppingMallTile
        id="5"
        type="semya"
        shownRent={tileRents[5]}
        ownerColor={tileColors[5]}
        ref={tile => tileRefs.current[5] = tile} />

      <TaxTile id="4" amount="300₽" ref={tile => tileRefs.current[4] = tile} />

      <StreetTile id="3"
                  color={Colors.BROWN}
                  shownRent={tileRents[3]}
                  ownerColor={tileColors[3]}
                  ref={tile => tileRefs.current[3] = tile}>
        Чкалова
      </StreetTile>

      <ChanceTile id="2"
                  ref={tile => tileRefs.current[2] = tile} />

      <StreetTile id="1"
                  color={Colors.BROWN}
                  shownRent={tileRents[1]}
                  ownerColor={tileColors[1]}
                  ref={tile => tileRefs.current[1] = tile}>
        Старцева
      </StreetTile>

      <CornerTile type="start" id="0" ref={tile => tileRefs.current[0] = tile} />

      {chipProps.map((props, index) => {
        console.log(chipProps.length);
        return (<Chip key={`chip-${index}`} {...JSON.parse(JSON.stringify(props))} />);
      })}


    </>
  );
};

export default Board;