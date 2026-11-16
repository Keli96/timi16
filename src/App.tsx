import "./App.css";
import { ItemRow } from "./components/itemRow";
import type { Item } from "./type";
import { useState, type ChangeEvent } from "react";

const startItems: Item[] = [
  { id: 1, text: "Mjólk", done: false },
  { id: 2, text: "Brauð", done: true },
  { id: 3, text: "Epli", done: false },
];

function App() {
  const [items, setItems] = useState<Item[]>(startItems);
  const [text, setText] = useState("");

  function handleSubmit(e: ChangeEvent) {
    e.preventDefault();
    if (text.trim() === "") return;

    const newItem: Item = { id: Date.now(), text: text.trim(), done: false };
    setItems([...items, newItem]);
    setText("");
  }

  function handleDelete(id: number) {
    setItems(items.filter((item) => item.id !== id));
  }

  function handleToggle(id: number) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  }

  function handleClearDone() {
    setItems(items.filter((item) => !item.done));
  }

  const remaining = items.filter((item) => !item.done).length;
  const doneCount = items.length - remaining;

  return (
    <main>
      <div>
        <h1>Innkaupalisti</h1>
        <form onSubmit={handleSubmit}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Hvað vantar á listann?"
          />
          <button type="submit">Bæta við</button>
        </form>
        {items.length === 0 ? (
          <p className="empty">listinn er tómur</p>
        ) : (
          <ul>
            {items.map((item) => (
              <ItemRow
                item={item}
                onDelete={handleDelete}
                onToggle={handleToggle}
              />
            ))}
          </ul>
        )}
        <footer>
          <p>
            {remaining} eftir af {items.length}
          </p>
          <button onClick={handleClearDone} disabled={doneCount === 0}>
            Hreinsa
          </button>
        </footer>
      </div>
    </main>
  );
}

export default App;
