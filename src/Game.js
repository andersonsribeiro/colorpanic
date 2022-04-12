import React from "react";
import { internalIpV4 } from "internal-ip";
import User from "./components/user/";
import Stats from "./components/stats";
import Board from "./components/board";
import Controls from "./components/controls";
import ColorGuide from "./components/colorguide";
import Ranking from "./components/ranking";

export default function Game() {
  function getGameDate() {
    const date = new Date();
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    const sec = date.getSeconds();
    return day + month + year + sec;
  }

  function makeColorHash(data) {
    var md5 = require("md5");
    return md5(data);
  }

  function hashToColors(colorHash) {
    let colors = [];
    let color;

    while (colorHash.length > 6) {
      color = colorHash.substring(0, 6);
      colorHash = colorHash.replace(color, "");
      colors.push(color);
    }
    return colors;
  }

  const gameDate = getGameDate();
  const userIP = internalIpV4();
  const gameColorHash = makeColorHash(gameDate);
  const userHash = makeColorHash(userIP);
  const tileColors = hashToColors(gameColorHash);

  const game = {
    tiles: {
      total: 100,
      types: [
        {
          name: "floor",
          color: "#" + tileColors[0],
        },
        {
          name: "wall",
          color: "#" + tileColors[1],
        },
        {
          name: "poison",
          color: "#" + tileColors[2],
        },
        {
          name: "loss",
          color: "#" + tileColors[3],
        },
        {
          name: "gain",
          color: "#" + tileColors[4],
        },
      ],
    },
    tileColors,
    userColors: hashToColors(userHash),
    userID: userHash.substring(30),
    health: 3,
    bombs: 3,
    coins: 0,
  };

  return (
    <>
      <div id="msg"></div>
      <User userID={game.userID} userColors={game.userColors} />
      <Stats health={game.health} bombs={game.bombs} coins={game.coins} />
      <Board
        tilesTypes={game.tiles.types}
        tilesTotal={game.tiles.total}
        tilesColors={game.tileColors}
      />
      <Controls />
      <ColorGuide tilesTypes={game.tiles.types} tilesColors={game.tileColors} />
    </>
  );
}
