import { socket } from "../socket";
import { useRef } from "react";
import "../css/RegisterForm.css";

export default function RegisterForm({ setIsRegistered }) {
  const nameRef = useRef();
  const roomRef = useRef();
  const onButtonClick = () => {

    socket.emit("register", {
      nickname: nameRef.current.value,
      room: roomRef.current.value
    });
    setIsRegistered(true);
  };

  return (<div className="RegisterForm">
      <h1>Монополия</h1>
      <form onSubmit={onButtonClick}>
        <input ref={nameRef} id="nickname" placeholder="Никнейм" />
        <input ref={roomRef} id="room" placeholder="Комната..." />
        <button onClick={onButtonClick}>Играть!</button>
      </form>
    </div>
  );
}