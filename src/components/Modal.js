import { useState } from "react";
import { v4 } from "uuid";

export default function Modal({
  id = null,
  type,
  defText,
  defX,
  defY,
  defSize,
  defWeight,
  close,
  save,
}) {
  const [text, setText] = useState(defText);
  const [x, setX] = useState(defX);
  const [y, setY] = useState(defY);
  const [size, setSize] = useState(defSize);
  const [weight, setWeight] = useState(defWeight);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-head">
          <span id="label">Edit {type}</span>
          <span id="close" onClick={close}>
            ✖
          </span>
        </div>

        <form>
          <div>
            <label htmlFor="text">Text</label>
            <input
              type="text"
              name="text"
              value={text}
              onChange={(e) => setText(e.target.value.trim() || defText)}
            />
          </div>
          <div>
            <label htmlFor="x">X (px)</label>
            <input
              type="number"
              name="x"
              value={x}
              min={0}
              onChange={(e) => setX(+e.target.value || defX)}
            />
          </div>
          <div>
            <label htmlFor="y">Y (px)</label>
            <input
              type="number"
              name="y"
              value={y}
              min={0}
              onChange={(e) => setY(+e.target.value || defY)}
            />
          </div>
          <div>
            <label htmlFor="size">Font Size (px)</label>
            <input
              type="number"
              name="size"
              value={size}
              min={1}
              onChange={(e) => setSize(+e.target.value || defSize)}
            />
          </div>
          <div>
            <label htmlFor="weight">Font Weight</label>
            <input
              type="number"
              value={weight}
              min={400}
              max={700}
              onChange={(e) => setWeight(+e.target.value || defWeight)}
            />
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();

              if (!id) {
                // Add new element if id is not present
                save((prev) => [
                  ...prev,
                  { id: v4(), type, text, x, y, size, weight },
                ]);
              } else {
                // Update existing element if id is present
                save((prev) =>
                  prev.map((el) => {
                    if (el.id === id) {
                      el = { id, type, text, x, y, size, weight };
                    }
                    return el;
                  })
                );
              }
              close();
            }}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
