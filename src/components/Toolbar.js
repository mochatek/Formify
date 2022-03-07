import Element from "./Element";
import { memo } from "react";

function Toolbar() {
  return (
    <div className="toolbar">
      <div>
        <h3>BLOCKS</h3>

        <ul>
          {["Label", "Input", "Button"].map((el) => (
            <Element key={el} type={el} />
          ))}
        </ul>
      </div>

      <div>
        <h3>HELP</h3>

        <p>Drag and drop elements to the grid.</p>
        <p>💡 Drag from top left corner to position elements easily.</p>
        <p>Click the element to select it.</p>
        <p>
          Press <mark>Enter</mark> to edit its attributes.
        </p>
        <p>
          Press <mark>Delete</mark> to remove from grid.
        </p>
        <p>Click on the grid to de-select.</p>
        <p>
          Click <mark>Export</mark> to download form.
        </p>
      </div>

      <p>
        Made with ❤️ by <a href="https://github.com/mochatek">MochaTek</a>{" "}
        &copy; 2022
      </p>
    </div>
  );
}

export default memo(Toolbar);
