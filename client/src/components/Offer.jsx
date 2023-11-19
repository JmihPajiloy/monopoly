import React, { useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import "../style.css";
import styled from "styled-components";

const OfferWrapper = styled.div`
display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    grid-column: 2 / 11;
    grid-row: 2 / 11;
    background-color: #F5F5F5;
    border-radius: 5px;
`

const Title = styled.div`
  width: 500px;
    height: fit-content;
    flex-shrink: 0;
    color: #202020;
    text-align: center;
    font-family: "JetBrains Mono", monospace;
    font-size: 30px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    padding: 13px;
    margin: 20px;
`
const Button = styled.button`
  &:hover {
    background: #464646;
    color: #e7e7e7;
  }

  display: flex;
  width: 230px;
  height: fit-content;
  border-radius: 10px;
  background: #313131;
  border: 0;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  color: #F5F5F5;
  font-family: "JetBrains Mono", monospace;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding: 13px;
  margin: 10px;
`

const Offer = () => {
  const [buttons, setButtons] = useState([]);
  const [msg, setMsg] = useState("");
  let buttonEvents = [];
  const btnRefs = useRef([]);
  const onButtonClick = idx => e => {
    const i = e.target.getAttribute("index");
    setMsg("Ждем следующий ход...");
    socket.emit(buttonEvents[i]);
  };

  useEffect(() => {
    const onOffer = ({ options, events, msg }) => {
      setMsg(msg);
      buttonEvents = [...events];
      setButtons(options.map((_, i) => (
        <Button className="one-button button-msg-text"
                ref={btn => btnRefs.current[i] = btn}
                key={i}
                index={i}
                onClick={onButtonClick(i)}>
          {options[i]}
        </Button>)));
    };
    const onOk = () => {
      setButtons([]);
    };
    socket.on("suggest", onOffer);
    socket.on("ok", onOk);
    return () => {
      socket.off("suggest", onOffer);
      socket.off("ok", onOk);
    };
  });
  return (
    <OfferWrapper>
      <Title>
        {msg ? msg : "Тут будут отображаться ивенты"}
      </Title>
        {buttons}
    </OfferWrapper>);
};

export default Offer;