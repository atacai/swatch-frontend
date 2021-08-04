import { useState } from "react";
import "./App.css";

function App() {
  const [colors, setColors] = useState([]);

  const fetchHandler = async () => {
    const response = await fetch("http://localhost:8000/colors");
    const data = await response.json();
    const colorData = data.map((item, index) => {
      const colorCode = Object.entries(item)
        .filter(([key, value]) => key !== "type")
        .map((color) => color[1])
        .join(",");
      return {
        type: item.type,
        code: `${item.type}(${colorCode})`,
      };
    });
    setColors(colorData);
  };

  return (
    <div className="App">
      <button className="Button" onClick={fetchHandler}>
        Regenerate
      </button>
    </div>
  );
}

export default App;
