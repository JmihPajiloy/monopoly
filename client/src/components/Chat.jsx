import { useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import styled from "styled-components";

const MessageWrapper = styled.div`
  display: flex;
  width: 470px;
  height: fit-content;
  border-radius: 16px;
  background: #D9D9D9;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  transition: 0.3s;
`;
const Text = styled.div`
  font-family: "JetBrains Mono", monospace;
  font-style: normal;
  font-size: 14px;
  font-weight: 700;
  line-height: normal;
  padding-left: 15px;
  align-self: center;
`;
const Time = styled.div`
  font-family: "JetBrains Mono", monospace;
  font-style: normal;
  font-size: 14px;
  color: #696969;
  line-height: normal;
  padding-right: 10px;
  align-self: center;
`;

const ChatWrapper = styled.div`
  display: flex;
  width: 470px;
  height: 600px;
  overflow: auto;

  flex-direction: column;
  grid-column: 1;
  grid-row: 2;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Message = ({ time, text }) => {
  return (<MessageWrapper>
    <Text>{text}</Text>
    <Time>{time ? time : ""}</Time>
  </MessageWrapper>);
};

export default function Chat() {
  const [index, setIndex] = useState(0);
  const [chat, setChat] = useState([]);
  const dummy = useRef(null);
  useEffect(() => {
    if (chat.length) {
      dummy.current.scrollIntoView({
        behavior: "smooth",
        block: "end"
      });
    }
  }, [chat.length]);

  useEffect(() => {
    const onMessage = ({ msg, time }) => {
      setChat(chat.concat((<Message key={index}
                                    time={time}
                                    text={msg} />)));
      setIndex(index + 1);
    };
    const onError = err => {
      setChat(chat.concat(
        (<Message key={index} text={err} />)
      ));
      setIndex(index + 1);
    };
    socket.on("message", onMessage);
    socket.on("error", onError);
    return () => {
      socket.off("message", onMessage);
      socket.off("error", onError);
    };
  }, [chat, socket]);

  return (<ChatWrapper>
    {chat}
    <div ref={dummy}></div>
  </ChatWrapper>);
}