import React from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000/");

function chatRoom() {
  return (
    <div>
      <h1>await</h1>
    </div>
  );
}

export default chatRoom;
