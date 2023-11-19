import { socket } from "../socket";
import { useRef } from "react";
import styled from "styled-components";

function RegisterForm({ setIsRegistered, className }) {
  const nameRef = useRef();
  const roomRef = useRef();
  const onButtonClick = () => {

    socket.emit("register", {
      nickname: nameRef.current.value,
      room: roomRef.current.value
    });
    setIsRegistered(true);
  };

  return (<div className={className}>
      <form onSubmit={onButtonClick}>
        <h1>Монополия</h1>
        <input ref={nameRef} placeholder="Никнейм..." maxLength="10"/>
        <input ref={roomRef} placeholder="Комната..." />
        <button type="submit" onClick={onButtonClick}>Играть!</button>
      </form>
    </div>
  );
}

export const StyledRegisterForm = styled(RegisterForm)`
  input:focus {
    outline: 3px solid #343434;
    outline-offset: -1px;
  }

  input {
    width: 233px;
    height: 48px;
    flex-shrink: 0;
    border-radius: 10px;
    background: #D9D9D9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #343434;
    font-family: 'Inter Medium', sans-serif;
    font-size: 20px;
    border: 0;
    grid-column: 1;
    padding-left: 20px;
  }

  button:hover {
    background: #555555;
  }

  button {
    width: 254px;
    height: 48px;
    justify-content: center;
    color: #D9D9D9;
    border-radius: 10px;
    background: #343434;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    font-family: 'Inter Medium', sans-serif;
    grid-column: 1;
    border: 0;
    transition: 0.3s;
  }

  form {
    display: grid;
    justify-content: center;
    grid-template-columns: 254px;
    grid-template-rows: 160px repeat(3, 60px);
    align-content: center;
  }

  h1 {
    display: flex;
    justify-content: center;
    color: #343434;
    font-family: 'Inter ExtraBold', sans-serif;
    font-size: 69px;
  }
`