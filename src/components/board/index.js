import React from "react";

export default function Board(props) {
  let tiles = [];

  for (let i = 1; i <= props.tilesTotal; i++) {
    const randomTileId = Math.floor(Math.random() * props.tilesColors.length);
    const randomTileColor = "#" + props.tilesColors[randomTileId];
    const type = props.tilesTypes[randomTileId].name;

    tiles.push(
      <span
        key={i}
        className="field"
        type={type}
        style={{ backgroundColor: randomTileColor }}
      ></span>
    );
  }

  return (
    <div id="board">
      <span id="player" user="user"></span>
      <span id="prism"></span>
      {tiles}
    </div>
  );
}
