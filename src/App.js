import { useEffect, useState } from "react";
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

  useEffect(() => {
    fetchHandler();
  }, []);

  const swatchColor = colors.map((item, index) => (
    <li key={index}>
      <div
        className="SwatcherBlock"
        style={{ backgroundColor: item.code }}
      ></div>
      {item.code}
    </li>
  ));

  return (
    <div className="App">
      <ul className="SwatcherColors">{swatchColor}</ul>
      <div className="ButtonContainer">
        <button className="Button" onClick={fetchHandler}>
          Regenerate
        </button>
      </div>
    </div>
  );
}

export default App;
