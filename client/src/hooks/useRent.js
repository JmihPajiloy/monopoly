import { useEffect, useState } from "react";
import { socket } from "../socket";

export const useRents = () => {
  const [rents, setRents] = useState(
    [null, "60₽", null, "60₽", null, "200₽", "100₽", null, "100₽", "120₽", null,
      "140₽", "150₽", "140₽", "160₽", "200₽", "180₽", null, "180₽", "200₽", null,
      "220₽", null, "220₽", "240₽", "200₽", "260₽", "260₽", "150₽", "280₽", null,
      "300₽", "300₽", null, "320₽", "200₽", null, "350₽", null, "400₽"]
  );

  useEffect(() => {
    const onGameState = (game) => {
      let newRents = [...rents];
      for (const p of game.players) {
        for (const prop of p.owns) {
          newRents[prop.pos] = prop.rent;
        }
      }
      setRents(newRents);
    };

    socket.on("game-state", onGameState);
    return () => {
      socket.off("game-state", onGameState);
    };
  }, [socket]);

  return rents;
};