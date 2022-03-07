export default function Element({ type }) {
  return (
    <li
      draggable={true}
      onDragStart={(event) =>
        event.dataTransfer.setData("text/plain", JSON.stringify({ type }))
      }
    >
      ▣ {type}
    </li>
  );
}
