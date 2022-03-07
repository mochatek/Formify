/**
 * Apply window to viewport transformation on the coordinates
 * @param {number} wx_max Window right
 * @param {number} wy_max Window bottom
 * @param {number} wx Element left in window
 * @param {number} wy Element top in window
 * @returns {left: string, top: string} Transformed left and top pixels values in viewport
 */
function translateXY(wx_max, wy_max, wx, wy) {
  const [vx_max, vy_max] = [1360, 660];
  const [x, y] = [
    Math.floor(wx * (vx_max / wx_max)),
    Math.floor(wy * (vy_max / wy_max)),
  ];
  return { left: `${x}px`, top: `${y}px` };
}

/**
 * Generate HTML string with all elements and its attributes from the UI list
 * @param {Array} ui Array of elements
 * @returns {string} HTML string
 */
function addElements(ui) {
  return ui.reduce((prev, el) => {
    const { left, top } = translateXY(1140, 660, el.x, el.y);
    const style = `left: ${left}; top:${top}; font-size: ${el.size}px; font-weight: ${el.weight}`;
    let element = "";

    if (el.type === "Button") {
      element = `<button style="${style}" class="element">${el.text}</button>`;
    } else if (el.type === "Input") {
      element = `<input type="text" style="${style}" class="element" value="${el.text}" />`;
    } else if (el.type === "Label") {
      element = `<label style="${style}" class="element">${el.text}</label>`;
    }

    return prev + element;
  }, "");
}

/**
 * Generate HTML page with all elements in UI and styles applied
 * @param {Array} ui Array of elements
 * @returns {string} HTML source of the page
 */
export default function generatePage(ui) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Form</title>
    <style>
        * {
            box-sizing: border-box
        }
        body {
            padding: 0;
            margin: 0;
        }
        form {
            width: 100vw;
            height: 100vh;
            position: relative;
            font-family: Tahoma;
        }
        .element {
            position: absolute;
            padding: 0.5rem;
            margin: 0;
        }
        input, button {
          outline: none;
          border: 1px solid lightgrey;
          border-radius: 4px;
        }
        button {
          color: white;
          background-color: #007BFF;
          border: none;
          box-shadow: 0px 1px 5px 1px lightgrey;
        }
        button:hover {
          background-color: #17A2B8
        }
    </style>
  </head>
  <body>
    <form>${addElements(ui)}</form>
  </body>
</html>
`;
}
