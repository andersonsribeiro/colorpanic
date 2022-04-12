import React from "react";
import UserColors from "./UserColors";

export default function User(props) {
  return (
    <div id="sidebar">
      Welcome,
      <div id="avatar">
        <UserColors userColors={props.userColors} />
        <em>{props.userID}</em>
      </div>
    </div>
  );
}
