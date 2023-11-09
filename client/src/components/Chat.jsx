import { useEffect, useState } from "react";
import { socket } from "../socket";

export default function Chat() {
  const [chat, setChat] = useState([]);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const onMessage = ({msg, time}) => {
      setChat(chat.concat(
        ( <li key={index}>{time} {msg}</li> )
      ));
      setIndex(index + 1)
    };
    const onError = err => {
      setChat(chat.concat(
        ( <li key={index} color="red">{err}</li> )
      ));
      setIndex(index + 1)
    }
    socket.on("message", onMessage);
    return () => socket.off("message", onMessage);
  }, [chat]);

  return (<div>
    <ul>
      {chat}
    </ul>
  </div>);
}