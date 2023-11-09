import React, { useEffect, useRef, useState } from "react";
import { socket } from "../socket";

const Offer = () => {
  const [buttons, setButtons] = useState([]);
  const [msg, setMsg] = useState("");
  const btnRefs = useRef([]);
  let buttonEvents;
  const onButtonClick = (idx) => e => {
    const i = e.target.getAttribute("index");
    console.log(e.target);
    console.log(i);
    socket.emit(buttonEvents[i]);
    console.log(buttonEvents[i]);
  };

  useEffect(() => {
    const onOffer = ({ options, events, msg }) => {
      setMsg(msg);
      const btns = [];
      buttonEvents = events;
      options.map((x, i) => {
        btns.push((
          <button ref={btn => btnRefs.current[i] = btn}
                  key={i}
                  index={i}
                  onClick={onButtonClick(i)}>
            {options[i]}
          </button>));
      });
      setButtons(btns);
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
  if (buttons.length === 0) return (<>Здесь должны быть ивенты</>);
  else return (
    <div style={{ outlineWidth: 1 }}>
      <div>{msg}</div>
      {buttons}
    </div>
  );
};

export default Offer;