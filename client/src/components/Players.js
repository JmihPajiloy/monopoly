import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { socket } from "../socket";
import { getColor } from "../utils";

const Separator = styled.div`
  width: 470px;
  height: 5px;
  flex-shrink: 0;
  border-radius: 5px;
  background: #313131;
`;

const Circle = styled.div`
  display: flex;
  width: 55px;
  height: 55px;
  flex-shrink: 0;
  border-radius: 35px;
  outline: 5px solid #000;
  outline-offset: -5px;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${props => props.bgcolor};
`;
const Nickname = styled.div`
  display: flex;
  font-family: "JetBrains Mono", monospace;
  font-style: normal;
  font-size: 36px;
  font-weight: 600;
  line-height: normal;
  padding-left: 15px;
  align-items: center;
  width: 300px;
  height: 55px;
`;

const Balance = styled.div`
  display: flex;
  font-family: "JetBrains Mono", monospace;
  font-style: normal;
  font-size: 36px;
  font-weight: 600;
  line-height: normal;
  padding-left: 15px;
  align-items: center;
  width: 300px;
  height: 55px;
  justify-content: right;
`;

const PlayerCard = ({ name, balance, bgcolor }) => {
  const style = {
    display: "flex",
    padding: "10px"
  };

  return <div style={style}>
    <Circle bgcolor={bgcolor} />
    <Nickname>{name}</Nickname>
    <Balance>{balance}₽</Balance>
  </div>;
};


const Players = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const onGameState = (game) => {
      const arr = [];
      for (const p of game.players) {
        arr.push(<>
          <PlayerCard name={p.name} bgcolor={getColor(p.color).normal} balance={p.balance} />
          <Separator />
        </>);
      }
      setPlayers(arr);
    };

    socket.on("game-state", onGameState);
    return () => {
      socket.off("game-state", onGameState);
    };
  }, [socket]);

  const style = {
    display: "flex",
    width: "470px",
    flexDirection: "column"
  };


  return (
    <div style={style}>
      {players}
    </div>
  );
};

export default Players;