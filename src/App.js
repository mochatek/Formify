import Container from "./components/Container";
import Toolbar from "./components/Toolbar";
import Modal from "./components/Modal";
import { useState, useEffect, useCallback } from "react";

export default function App() {
  const [modal, setModal] = useState(null);
  const [elements, setElements] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    // Initialize UI with saved data from localStorage
    const ui = JSON.parse(localStorage.getItem("ui"));
    if (ui && ui.length) {
      setElements(ui);
    }
  }, []);

  useEffect(() => {
    // Auto-save to localStorage when elements are updated
    localStorage.setItem("ui", JSON.stringify(elements));
  }, [elements]);

  const dropHandler = useCallback((event) => {
    if (event.dataTransfer.getData("text")) {
      const { type, id } = JSON.parse(event.dataTransfer.getData("text"));

      // New element is added to container
      if (!id) {
        const defX = event.clientX;
        const defY = event.clientY;
        setModal({
          type,
          defText: type,
          defX,
          defY,
          defSize: 12,
          defWeight: 400,
        });

        // Dragging existing element in container
      } else {
        setElements((prev) =>
          prev.map((el) => {
            if (el.id === id) {
              el.x = event.clientX;
              el.y = event.clientY;
            }
            return el;
          })
        );
      }
    }
  }, []);

  const openModal = useCallback(
    (event) => {
      if (event.key === "Enter" && selected) {
        // Modify attributes of element
        const {
          id,
          type,
          text: defText,
          x: defX,
          y: defY,
          size: defSize,
          weight: defWeight,
        } = elements.find((el) => el.id === selected);

        setModal({ id, type, defText, defX, defY, defSize, defWeight });
        setSelected(null);
      } else if (event.key === "Delete" && selected) {
        // Remove element from UI
        setElements((prev) => prev.filter((el) => el.id !== selected));
        setSelected(null);
      }
    },
    [selected, elements]
  );

  return (
    <main>
      <Container
        elements={elements}
        dropHandler={dropHandler}
        selected={selected}
        select={setSelected}
        edit={openModal}
      />
      <Toolbar />
      {modal && (
        <Modal {...modal} close={() => setModal(null)} save={setElements} />
      )}
    </main>
  );
}
