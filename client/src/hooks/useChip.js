import { useEffect, useState } from "react";
import { socket } from "../socket";
import useWindowSize from "./useWindowSize";

export const useChipProps = (tileRefs) => {
    const [chipProps, setChipProps] = useState([]);
    const winSize = useWindowSize();

    useEffect(() => {
      const arr = []
      for (const chipProp of [...chipProps]) {
        const coords = tileRefs.current[chipProp.position].getBoundingClientRect();
        chipProp.x = (coords.left + coords.right) / 2 + window.pageXOffset - 12.5
        chipProp.y = (coords.top + coords.bottom) / 2 + window.pageYOffset - 12.5
        arr.push(chipProp)
      }
      setChipProps(arr)
    }, [winSize]);

    useEffect(() => {
      const onGameState = (game) => {
        const arr = []
        for (let p of game.players) {
          const coords = tileRefs.current[p.position].getBoundingClientRect();
          arr.push({
            position: p.position,
            color: p.color,
            x: (coords.left + coords.right) / 2 + window.pageXOffset - 12.5,
            y: (coords.top + coords.bottom) / 2 + window.pageYOffset - 12.5
          })
        }
        setChipProps(arr)
        return () => setChipProps([]);
      };
      socket.on("game-state", onGameState);
      return () => {
        socket.off("game-state", onGameState);
      };
    }, []);

    return chipProps;
  }
;