export default function UserColors(props) {
  return props.userColors.map((userColor) => {
    return (
      <span key={userColor} style={{ backgroundColor: "#" + userColor }}></span>
    );
  });
}
