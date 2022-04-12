import React from "react";

export default function Stats(props) {
  return (
    <div id="stats">
      <span id="health">†{props.health}</span>
      <span id="coins">{props.coins}¢</span>
      <span id="bombs">*{props.bombs}</span>
      <span id="timer">0</span>
    </div>
  );
}
