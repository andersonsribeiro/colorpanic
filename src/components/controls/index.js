import React from "react";

export default function Controls() {
  return (
    <session id="controls">
      <span id="left" onClick="moveLeft()">
        L
      </span>
      <span id="down" onClick="moveDown()">
        D
      </span>
      <span id="up" onClick="moveUp()">
        U
      </span>
      <span id="right" onClick="moveRight()">
        R
      </span>
      <span id="interact" onClick="interact()">
        *
      </span>
    </session>
  );
}
