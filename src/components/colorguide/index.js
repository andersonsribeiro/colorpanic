import React from "react";

export default function ColorGuide(props) {
  let colors = [];

  props.tilesTypes.map((tile) => {
    const color = tile.color;
    const tileName = tile.name.toUpperCase();

    colors.push(
      <li key={tileName}>
        <span className="color-title">{tileName}</span>
        <span className="color" style={{ backgroundColor: color }}></span>
      </li>
    );
  });

  return <ul id="colors">{colors}</ul>;
}
