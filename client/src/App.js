import { useEffect, useState } from "react";
import { socket } from "./socket";
import RegisterForm from "./components/RegisterForm";
import Chat from "./components/Chat";
import Offer from "./components/Offer";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const [isRegistered, setIsRegistered] = useState(false);
  useEffect(() => {
    const onConnect = () => {
      console.log("connected");
      setIsConnected(true);
    };
    const onDisconnect = (reason) => {
      console.log(`disconnected because of ${reason}`);
      setIsConnected(false);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  if (!isRegistered) return (<RegisterForm setIsRegistered={setIsRegistered} />);
  else return (
    <div className="App">
      Connected: {isConnected.toString()}
      <Chat />
      <Offer />
    </div>
  );
}

export default App;
