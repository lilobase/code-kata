import React from "react";
import Chat from "./Chat/Chat";
import Container from "./Common/Container";
import Messages from "./Chat/Messages";

const App = () => (
    <Container>
        <h1 id="title">Chat</h1>
        <Messages/>
        <Chat/>
    </Container>
);
export default App;