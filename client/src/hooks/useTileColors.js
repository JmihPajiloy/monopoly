import { useEffect, useState } from "react";
import { socket } from "../socket";
import { getColor } from "../utils";

export const useTileColors = () => {
  const [colors, setColors] = useState(Array(40).fill("#f5f5f5"));

  useEffect(() => {
    const onGameState = (game) => {
      let newColors = [...colors]
      for (const p of game.players) {
        for (const prop of p.owns) {
          newColors[prop.pos] = getColor(p.color).light
        }
      }
      setColors(newColors)
    }

    socket.on("game-state", onGameState)
    return () => {
      socket.off("game-state", onGameState)
    }
  }, [socket])

  return colors
}