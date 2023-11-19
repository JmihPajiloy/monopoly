import { useEffect, useState } from "react";
import { socket } from "./socket";
import { StyledRegisterForm } from "./components/RegisterForm";
import Board from "./components/Board";
import Offer from "./components/Offer";
import Chat from "./components/Chat";
import styled from "styled-components";
import Players from "./components/Players";

const style = {
  width: "1400px",
  height: "930px",
  display: "grid",
  gridTemplateColumns: "450px 930px",
  gridTemplateRows: "300px",
  gridGap: "30px"
};

const BoardWrapper = styled.div`
  display: grid;
  background-color: #202020;
  width: 930px;
  height: 930px;
  grid-template-columns: 120px repeat(9, 70px) 120px;
  grid-template-rows: 120px repeat(9, 70px) 120px;
  grid-gap: 5px;
  justify-content: center;
  align-content: center;
  border-radius: 10px;
  grid-column: 2;
`;


function App() {

  const [isRegistered, setIsRegistered] = useState(false);
  useEffect(() => {
    const onConnect = () => {
      console.log("connected");
    };
    const onDisconnect = (reason) => {
      console.log(`disconnected because of ${reason}`);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  if (!isRegistered) return (<StyledRegisterForm setIsRegistered={setIsRegistered} />);
  return (
    <div className="App" style={style}>
      <Players/>
      <BoardWrapper>
        <Offer />
        <Board />
      </BoardWrapper>
      <Chat />
    </div>
  );
}

export default App;
