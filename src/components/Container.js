import generatePage from "../lib/exportUI";
import { memo } from "react";

function Container({ elements, dropHandler, selected, select, edit }) {
  return (
    // Container where we can drop elements and create UI
    <div
      className="container"
      tabIndex={0}
      onDragOver={(event) => event.preventDefault()}
      onDrop={dropHandler}
      onClick={() => select(null)}
      onKeyDown={edit}
    >
      {/* Button to download current UI as HTML file */}
      <button
        id="export"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();

          const content = generatePage(elements);
          const download_link = document.createElement("a");
          download_link.setAttribute("download", "form.html");
          download_link.setAttribute(
            "href",
            "data:text/html;charset=utf-8," + encodeURIComponent(content)
          );
          document.body.appendChild(download_link);
          download_link.click();
          document.body.removeChild(download_link);
        }}
      >
        ➤ Export
      </button>

      {/* Display elements dropped on the container */}
      {elements.map(({ id, type, text, x, y, size, weight }) => {
        const style = {
          left: `${x}px`,
          top: `${y}px`,
          fontSize: `${size}px`,
          fontWeight: weight,
        };

        if (type === "Label") {
          return (
            <label
              key={id}
              className={`element${id === selected ? " selected" : ""}`}
              style={style}
              onClick={(e) => {
                e.stopPropagation();
                select(id);
              }}
              draggable
              onDragStart={(event) =>
                event.dataTransfer.setData("text/plain", JSON.stringify({ id }))
              }
            >
              {text}
            </label>
          );
        } else if (type === "Button") {
          return (
            <button
              key={id}
              className={`element${id === selected ? " selected" : ""}`}
              style={style}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                select(id);
              }}
              draggable
              onDragStart={(event) =>
                event.dataTransfer.setData("text/plain", JSON.stringify({ id }))
              }
            >
              {text}
            </button>
          );
        } else {
          return (
            <input
              key={id}
              className={`element${id === selected ? " selected" : ""}`}
              style={style}
              type="text"
              value={text}
              readOnly
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                select(id);
              }}
              draggable
              onDragStart={(event) =>
                event.dataTransfer.setData("text/plain", JSON.stringify({ id }))
              }
            />
          );
        }
      })}
    </div>
  );
}

export default memo(Container);
